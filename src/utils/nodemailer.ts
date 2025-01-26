import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const mailOptionsConfirmation = {
  from: process.env.GMAIL_USERNAME,
};
export const mailOptionsAdminConfirm = {
  from: process.env.GMAIL_USERNAME,
  to: process.env.GMAIL_USERNAME,
};
