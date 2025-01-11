const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Transporter verification failed:', error);
    } else {
        console.log('Transporter is ready:', success);
    }
});

async function sendEmail({ to, subject, template, context }) {
    const templatePath = path.join(__dirname, `../view/${template}.ejs`);
    const html = await ejs.renderFile(templatePath, context);

    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html,
    });
}

module.exports = sendEmail;
