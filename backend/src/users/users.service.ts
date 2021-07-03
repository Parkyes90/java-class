import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<[boolean, string?]> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return [false, '이미 이 이메일을 사용하고 있는 사용자가 있습니다.'];
      }
      await this.users.save(this.users.create({ email, password, role }));
      return [true];
    } catch (e) {
      return [false, e.message];
    }
  }
}
