import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { TokensService } from '../tokens/tokens.service';
import { MailsService } from '../mails/mails.service';

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockTokensService = {
  sign: jest.fn(),
  verify: jest.fn(),
};
const mockMailsService = {
  sendVerificationEmail: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository,
        },
        {
          provide: TokensService,
          useValue: mockTokensService,
        },
        {
          provide: MailsService,
          useValue: mockMailsService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });
  it('be defined', () => {
    expect(service).toBeDefined();
  });
  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
