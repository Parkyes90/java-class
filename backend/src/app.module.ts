import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Restaurant } from './restaurants/entities/restaurant.entity';

@Module({
  imports: [
    RestaurantsModule,
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
      entities: [Restaurant],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
