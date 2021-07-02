import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../core/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum USER_ROLE {
  CLIENT = 'client',
  OWNER = 'owner',
  DELIVERY = 'delivery',
}

registerEnumType(USER_ROLE, { name: 'USER_ROLE' });

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
    enum: USER_ROLE,
    default: USER_ROLE.CLIENT,
    type: 'enum',
  })
  @Field(() => USER_ROLE)
  role: USER_ROLE;
}
