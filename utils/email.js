const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'garth.bahringer@ethereal.email',
        pass: '4Bng7eW9mSjDwNR6Et'
    }
});

  // 2) Define the email options
  const mailOptions = {
    from: options.sen,
    to: options.rec,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;