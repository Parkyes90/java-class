import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { User } from './users/entities/user.entity';
import { TokensModule } from './tokens/tokens.module';
import { TokensMiddleware } from './tokens/tokens.middleware';
import { AuthModule } from './auth/auth.module';
import { Verification } from './users/entities/verification.entity';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev' ? 'envs/.dev.env' : 'envs/.spec.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.string().required(),
        PG_USER: Joi.string().required(),
        PG_DATABASE: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      logging: true,
      synchronize: process.env.NODE_ENV !== 'prod',
      entities: [User, Verification],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    UsersModule,
    CoreModule,
    TokensModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailsModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      fromEmail: process.env.MAILGUN_DOMAIN_NAME,
      domain: process.env.MAILGUN_FROM_EMAIL,
    }),
    AuthModule,
    MailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokensMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
