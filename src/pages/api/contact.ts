import { transporter } from "@/utils/nodemailer";
import { mailOptionsConfirmation } from "@/utils/nodemailer";
import { mailOptionsAdminConfirm } from "@/utils/nodemailer";
import { FormData } from "@/pages/contact";
import fs from "fs";
import handelbars from "handlebars";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data: FormData = req.body;
    const html = fs.readFileSync("src/htmlTemplate/emailTemplate.html", "utf8");
    const emailTemplate = handelbars.compile(html);
    try {
      await transporter.sendMail({
        ...mailOptionsConfirmation,
        to: data.email,
        subject: "New contact form submission",
        text: "Backup Test",
        html: emailTemplate(data),
      });
      await transporter.sendMail({
        ...mailOptionsAdminConfirm,
        subject: "New contact form submission",
        text: "Backup Test",
        html: emailTemplate(data),
      });
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      const typedError = error as Error;
      return res.status(500).json({
        message: "Internal server error" + "\n" + typedError.message,
        req: req.body,
      });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};

export default handler;
