var nodemailer = require("nodemailer");
const SERVER_URL = process.env.NEXT_PUBLIC_FIREBASE_SERVER || "http://localhost:3000";

export async function sendMail(subject:string, toEmail:string, otpText:string, html?:string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });
  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
    html: html,
  }
  transporter.sendMail(mailOptions, function (error: string | undefined, info: any) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent", info);
      return true;
    }
  });
}
