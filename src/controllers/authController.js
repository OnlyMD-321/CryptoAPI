const AuthService = require('../services/authService');

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await AuthService.registerUser(email, password);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await AuthService.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await AuthService.verifyUser(email, otp);
    res.status(200).json({ "message" : 'User verified successfully' , "token" : user});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { signup, login, verifyEmail };
