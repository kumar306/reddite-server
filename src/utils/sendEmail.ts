import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
 service: "Gmail",
 auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
 }
});

export const sendMail = async(to: string, html: string) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'test.adiku@gmail.com', // acc from which all admin emails sent
    to,
    subject: "Password reset test email", 
    html, 
  });

  console.log("Message sent: %s", info.messageId);

}