import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './tokens.constants';
import { TokenModuleOptions } from './tokens.interfaces';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokensService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: TokenModuleOptions,
  ) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.options.privateKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
