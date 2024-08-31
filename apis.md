# Azarfood Apis

## User

- POST `/user/login`

```ts
// request body
type LoginDto = {
  username: string;
  password: string;
};

type LoginResponseDto = MeDto;
```

- POST `/user/change-password`

```ts
// request body
type ChangePasswordDto = {
  old_password: string;
  new_password: string;
};
```

- GET `/user/me`

```ts
type MeDto = {
  first_name: string;
  last_name: string;
  national_code: string;
  student_id: string;

  id: string; // hala age dashte bashim
};
```

- GET `/user/order-history`

```ts
type OrderHistoryDto = {
  id: string;
  order_date: string;
  total_price: string;
  status: string;

  orders: {
    name: string;
    count: number;
    price: string;
  }[];
}[];
```

- GET `/user/order-list`

```ts
type OrderListDto = {
  id: string;
  order_date: string;
  total_price: string;
  status: string;

  orders: {
    name: string;
    count: number;
    price: string;
  }[];
}[];
```

- GET `/user/transaction-history`

```ts
type TransactionHistoryParams = {
  date: string;
};

type TransactionHistoryDto = {
  id: string;
  type: 'credit' | 'debit';
  date: string;
  value: string;
  balance: string;
};
```

- GET `/user/balance`

```ts
type UserBalanceDto = {
  balance: string;
};
```

- POST `/user/add-to-cart`

```ts
type AddToCartDto = {
  food_id: string;
};
```

- GET `/user/cart`

```ts
type CartDto = {
  id: string;
  food: FoodDto;
  count: number;
}[];
```

- PUT `/user/cart`

```ts
// request body
type CartDto = {
  id: string;
  food_id: string;
  count: number;
}[];
```

- GET `/user/current-order`

```ts
type CurrentOrderDto = {
  receipts: {
    restaurant: RestaurantDto;
    cart: CartDto;
    total_price: string;
  };
};
```

- POST `/user/place-order`

```ts
// request body
type PlaceOrderDto = {
  restaurant_id: string | null;
  discount_code: string;
};
```

- POST `/user/check-discount-code`

```ts
// request body
type DiscountCodeDto = {
  discount_code: string;
};

type DiscountCodeResponse = {
  is_valid: boolean;
  error_message: string | null;
};
```

## Food

- GET `/foods/categories`

```ts
type FoodCategoriesDto = {
  name: string;
  id: string;
  image_url: string;
}[];
```

- GET `/foods/collections`

  > baraye mesal `daraye takhfif`, `behtarin ha` va...

```ts
type FoodCollectionsDto = {
  label: string; // example: "دارای تخفیف"
  filter: string; // example: "?discount=true&tab=restaurant"
  restaurants: RestaurantDto[] | null;
  foods: FoodDto[] | null;
  id: string;
};
```

- GET `/foods/search/restaurant`

```ts
type FoodSearchParams = {
  q: string; // search text
  category: string;
};

type RestaurantSearchResultDto = RestaurantDto[];
```

- GET `/foods/search/food`

```ts
type FoodSearchParams = {
  q: string; // search text
  category: string;
};

type FoodSearchResultDto = FoodDto[];
```

- GET `/foods/restaurant/:id`

```ts
type RestaurantDto = {
  name: string;
  rating: number;
  image_url: string;
  banner_url: string;
  address: string;

  foods: FoodDto[];
};
```

- GET `/foods/food/:id`

```ts
type FoodDto = {
  id: string;
  image_url: string;
  name: string;
  rating: number;
  restaurant: RestaurantDto;
  discount: DiscountDto;
  ingredients: string;
};
```
