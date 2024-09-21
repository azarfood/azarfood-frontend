import Burger from '@/assets/images/food-categories/burger.png'
import FriedFood from '@/assets/images/food-categories/fried-food.png'
import Iranian from '@/assets/images/food-categories/iranian.png'
import Pizza from '@/assets/images/food-categories/pizza.png'
import Salad from '@/assets/images/food-categories/salad.png'
import Sandwich from '@/assets/images/food-categories/sandwich.png'

export enum FoodCategory {
    Pizza = 'pizza',
    Burger = 'burger',
    Iranian = 'iranian',
    FriedFood = 'fried-food',
    Sandwich = 'sandwich',
    Salad = 'salad'
}

export const foodCategories = [
  {
    category: FoodCategory.Pizza,
    image: Pizza,
  },
  {
    category: FoodCategory.Burger,
    image: Burger,
  },
  {
    category: FoodCategory.Iranian,
    image: Iranian,
  },
  {
    category: FoodCategory.FriedFood,
    image: FriedFood,
  },
  {
    category: FoodCategory.Sandwich,
    image: Sandwich,
  },
  {
    category: FoodCategory.Salad,
    image: Salad,
  },
];
