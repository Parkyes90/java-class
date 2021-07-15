import * as FormData from 'form-data';
import got from 'got';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/core/core.constant';
import { MailsModuleOptions } from './mails.interfaces';

@Injectable()
export class MailsService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailsModuleOptions,
  ) {}

  private async sendMail(subject: string, content: string) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `parkyes90@gmail.com`);
    form.append('subject', subject);
    form.append('template', 'confirm_mail');
    form.append('v:code', 'test');
    form.append('v:username', 'test123');

    return got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `api:${this.options.apiKey}`,
        ).toString('base64')}`,
      },
      method: 'POST',
      body: form,
    });
  }
}
