import Mail from "nodemailer/lib/mailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { SMTPTransporter } from "./SMTPTransporter";

const sendEmail = (payload: {
  from: string;
  to: string;
  subject: string;
  body: string;
  attachments?: Mail.Attachment[] | undefined;
}): Promise<SMTPTransport.SentMessageInfo> =>
  SMTPTransporter.sendMail({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    text: payload.body,
    attachments: payload.attachments,
  });

export { sendEmail };
