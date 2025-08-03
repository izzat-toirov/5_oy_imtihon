import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../../generated/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.API_URL}/api/user/activate/${user.activation_link}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Welcome to FOOTBALL ACADEMY!`,
      template: 'confirmation',
      context: {
        username: user.full_name,
        url,
      },
    });
  }

  async sendResetPasswordEmail(user: User, resetPasswordUrl: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Parolni tiklash',
      template: 'reset-password',
      context: {
        username: user.full_name,
        resetPasswordUrl,
      },
    });
  }
}
