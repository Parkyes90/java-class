import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../core/entities/core.entity';

export const enum USER_ROLE {
  CLIENT = 'client',
  OWNER = 'owner',
  DELIVERY = 'delivery',
}

@Entity()
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: USER_ROLE;
}
