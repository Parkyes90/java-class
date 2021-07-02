import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../core/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({
    enum: UserRole,
    default: UserRole.Client,
    type: 'enum',
  })
  @Field(() => UserRole)
  role: UserRole;
}
