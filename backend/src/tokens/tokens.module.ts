import { DynamicModule, Global, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokenModuleOptions } from './tokens.interfaces';
import { CONFIG_OPTIONS } from './tokens.constants';

@Module({})
@Global()
export class TokensModule {
  static forRoot(options: TokenModuleOptions): DynamicModule {
    return {
      module: TokensModule,
      exports: [TokensService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        TokensService,
      ],
    };
  }
}
