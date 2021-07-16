import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/core/core.constant';
import { MailsModuleOptions } from './mails.interfaces';
import { MailsService } from './mails.service';

@Module({})
@Global()
export class MailsModule {
  static forRoot(options: MailsModuleOptions): DynamicModule {
    return {
      module: MailsModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailsService,
      ],
      exports: [MailsService],
    };
  }
}
