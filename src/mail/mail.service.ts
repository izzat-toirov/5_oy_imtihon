// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { transporter } from './transporter';

@Injectable()
export class EmailService {
  async sendMail(to: string, subject: string, html: string) {
    const info = await transporter.sendMail({
      from: `"My App" <${process.env.SMTP_USER}>`, // ko‘rinadigan nom
      to,
      subject,
      html,
    });

    console.log('📧 Email yuborildi: %s', info.messageId);
    return info;
  }
}
