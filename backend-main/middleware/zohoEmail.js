const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
        user: 'hirwa_landry@zohomail.com',
        pass: 'bdx5xt3sfMA4',
    },
});

const sendVerificationEmail = (email, otp) => {
    const mailOptions = {
        from: 'hirwa_landry@zohomail.com',
        to: email,
        subject: 'Verify Your Email',
        text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
};


module.exports = { transporter, sendVerificationEmail };