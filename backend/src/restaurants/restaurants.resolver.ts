import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantsService) {}
  @Query(() => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    try {
      return await this.restaurantService.createRestaurant(createRestaurantDto);
    } catch (e) {
      throw e;
    }
  }
}
