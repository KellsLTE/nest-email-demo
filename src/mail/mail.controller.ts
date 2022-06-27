import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { join } from 'path';

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
  @Post('welcome')
  async sendWelcomeMail(@Body() payload) {
    await this.mailService.sendMail({
      to: payload.email,
      from: process.env.MAIL_FROM_ADDRESS,
      subject: "Welcome to Kell's Nest",
      template: 'welcome',
    });
    return 'success';
  }
  @Post('attach')
  async sendAttachmentWithMail(@Query('email') email) {
    await this.mailService.sendMail({
      to: email,
      from: process.env.MAIL_FROM_ADDRESS,
      html: '<h1>File Attachment</h1>',
      attachments: [
        {
          path: join(__dirname, '../email/attachments', 'file.pdf'),
          filename: 'Offer Letter.pdf',
          contentDisposition: 'attachment'
        },
      ],
    });
    return 'success';
  }
}
