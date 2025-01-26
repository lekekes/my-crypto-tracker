import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { generateEmailHTML } from '@/utils/emailTemplate';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { to, subject, firstName, lastName, message } = req.body;

    if (!to || !subject || !firstName || !lastName || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const html = generateEmailHTML(firstName, lastName, message);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      html: html,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
}
