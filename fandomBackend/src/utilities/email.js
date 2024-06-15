const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD 
            }
        });

        const info = await transporter.sendMail(option);

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log("Error sending email ", error);
    }
};

module.exports = sendEmail;


