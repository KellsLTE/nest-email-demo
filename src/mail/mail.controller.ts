import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Post, Query } from '@nestjs/common';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailerService) {}
  @Post('plain-text')
  async sendPlainTextMail(@Query('email') email) {
    await this.mailService.sendMail({
      to: email,
      from: process.env.MAIL_FROM_ADDRESS,
      subject: "Hello and welcome to Kell's Nest",
      text: 'This is just a regular mail to test how responsive our service is. It is just like an anybody home message - so Anybody home?',
    });
    return 'success';
  }
}
