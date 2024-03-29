import nodemailer from "nodemailer";

const sendEmail = async (option) => {
  // Transportor service to send email
  const transportor = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const emailOptions = {
    from: '"ROMS" <service@roms.com>',
    ...option,
  };

  await transportor.sendMail(emailOptions);
};

export default sendEmail;
