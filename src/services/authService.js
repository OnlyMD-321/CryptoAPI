const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DBFactory = require('../factories/crudFactory');
const sendEmail = require('../utils/mailer');
const crypto = require('crypto'); 

class AuthService {
    
  static async registerUser(email, password) {
    // Check if the user exists
    const userExists = await DBFactory.findOne('SELECT * FROM Users WHERE email = $1', [email]);
    if (userExists) {
      throw new Error('Email already registered');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();  // Generate a 6-digit code as a string
  
    // Send the verification code email
    await sendEmail({
      to: email,
      subject: 'Vérification de votre Email',
      template: 'verificationForEmail',
      context: { code: verificationCode },  // Send the code to the template
    });
    
    // Insert new user into the database
    return await DBFactory.insert(
      'INSERT INTO Users (email, password, otp) VALUES ($1, $2, $3) RETURNING id, email, otp, created_at',
      [email, hashedPassword, verificationCode]
    );
  }

  static async verifyUser(email, verificationCode) {
    try {
      // Find the user by email
      const user = await DBFactory.findOne('SELECT * FROM Users WHERE email = $1', [email]);
      if (!user) {
        throw new Error('Invalid email');
      }

      // Check if the verification code matches
      if (user.otp !== verificationCode) {
        throw new Error('Invalid verification code');
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Update the user's status to verified and set otp empty
      await DBFactory.update('UPDATE Users SET isverified = true, otp = null, token = $1 WHERE email = $2', [token, email]);
      
      return token;

    } catch (error) {
      console.log('Error verifying user:', error);
      throw error;
    }
  }

  static async authenticateUser(email, password) {
    // Find the user by email
    const user = await DBFactory.findOne('SELECT * FROM Users WHERE email = $1', [email]);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

module.exports = AuthService;
