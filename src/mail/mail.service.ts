import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../../generated/prisma";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.api_url}/api/user/activate/${user.activation_link}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${user.resetPasswordToken}`;

    console.log(url);
    
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Welcome to FOTTBALLACCADEMY!`,
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
