import * as FormData from 'form-data';
import got from 'got';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/core/core.constant';
import { EmailVariables, MailsModuleOptions } from './mails.interfaces';

@Injectable()
export class MailsService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailsModuleOptions,
  ) {}

  private async sendMail(
    subject: string,
    template: string,
    emailVariables: EmailVariables[],
  ) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `parkyes90@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    emailVariables.forEach((emailVariable) =>
      form.append(emailVariable.key, emailVariable.value),
    );

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        method: 'POST',
        body: form,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async sendVerificationEmail(email: string, code: string) {
    await this.sendMail('Verify Your Email', 'confirm_mail', [
      { key: 'username', value: email },
      { key: 'code', value: code },
    ]);
  }
}
