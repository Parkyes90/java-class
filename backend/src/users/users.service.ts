import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { TokensService } from '../tokens/tokens.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly config: ConfigService,
    private readonly tokensService: TokensService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const existUser = await this.users.findOne({ email });
      if (existUser) {
        return {
          ok: false,
          error: '이미 이 이메일을 사용하고 있는 사용자가 있습니다.',
        };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );
      await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });
      const notValidOutput = {
        ok: false,
        error: '사용자 ID 혹은 비밀번호가 잘못됐습니다.',
      };

      if (!user) {
        return notValidOutput;
      }

      const isCorrectPassword = await user.checkPassword(password);

      if (!isCorrectPassword) {
        return notValidOutput;
      }
      const token = this.tokensService.sign({ id: user.id });

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.users.findOne({ id });
    if (!user) {
      throw new NotFoundException('error');
    }
    return user;
  }

  async editProfile(userId: number, editProfileInput: EditProfileInput) {
    const user = await this.users.findOne(userId);
    if (editProfileInput.email) {
      user.email = editProfileInput.email;
      user.verified = false;
      await this.verifications.save(this.verifications.create({ user }));
    }
    if (editProfileInput.password) {
      user.password = editProfileInput.password;
    }
    return this.users.save(user);
  }
}
