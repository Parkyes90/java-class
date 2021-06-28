import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateRestaurantDto {
  @Field(() => String)
  name: string;
  @Field(() => Boolean)
  isVegan: string;
  @Field(() => String)
  address: string;
  @Field(() => String)
  ownerName: string;
}
