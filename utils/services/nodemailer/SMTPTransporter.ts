import { createTransport, type Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const createSMTPTransporter =
  (): Transporter<SMTPTransport.SentMessageInfo> => {
    const runtimeConfig = useRuntimeConfig();

    const host: string = runtimeConfig.smtpHost;
    const port: number = runtimeConfig.smtpPort;
    const user: string = runtimeConfig.smtpUser;
    const password: string = runtimeConfig.smtpPassword;

    const transporter: Transporter<SMTPTransport.SentMessageInfo> =
      createTransport({
        host,
        port,
        secure: true,
        auth: {
          user,
          pass: password,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });

    return transporter;
  };

export const SMTPTransporter: Transporter<SMTPTransport.SentMessageInfo> =
  createSMTPTransporter();
