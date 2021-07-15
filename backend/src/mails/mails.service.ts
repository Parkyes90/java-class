import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/core/core.constant';
import { MailsModuleOptions } from './mails.interfaces';

@Injectable()
export class MailsService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailsModuleOptions,
  ) {
    console.log(options);
  }
}
