# Azarfood Apis

```ts
type ResponseDto<T> = {
  success: true;
  message: string;
  result: T;
};
type ErrorDto<T> = {
  success: false;
  message?: string;
};
type PaginationParams = {
  perPage: number;
  page: number;
};
```

## User

- POST `/user/login`

```ts
// request body
type LoginDto = {
  username: string;
  password: string;
};

type LoginResponseDto = {
  token: string;
};
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
type UserDto = {
  first_name: string;
  last_name: string;
  national_code: string;
  student_code: string;
  type: 'student' | 'proffesor' | 'teacher';
  avatar: string;
};
```

- GET `/user/order-history`

```ts
type OrderHistoryDto = {
  id: string;
  date: string;
  total_cost: string;
  status: 'delivered' | 'pending';
  meal: 'lunch' | 'dinner';

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
  date: string;
  total_cost: string;
  status: 'pending';
  meal: 'lunch' | 'dinner';

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
  dateFrom?: string;
  dateTo?: string;
} & PaginationParams;

type TransactionHistoryDto = {
  id: string;
  type: 'positive' | 'negative';
  date: string;
  amount: string;
};
```

- GET `/user/balance`

```ts
type UserBalanceDto = {
  balance: string;
};
```

- POST `/user/place-order`

```ts
// request body
type PlaceOrderDto = {
  carts: {
    order_date: string;
    meal: 'dinner' | 'lunch';

    orders: {
      id: string;
      count: number;
    }[];
  }[];
};
```

- POST `/user/charge`

```ts
// request body
type UserChargeDto = {
  amount: number;
};
```

<!---->
<!-- - POST `/user/check-discount-code` -->
<!---->
<!-- ```ts -->
<!-- // request body -->
<!-- type DiscountCodeDto = { -->
<!--   discount_code: string; -->
<!-- }; -->
<!---->
<!-- type DiscountCodeResponse = { -->
<!--   is_valid: boolean; -->
<!--   error_message: string | null; -->
<!-- }; -->
<!-- ``` -->

## Food

<!---->
<!-- - GET `/foods/collections` -->
<!---->
<!--   > baraye mesal `daraye takhfif`, `behtarin ha` va... -->
<!---->
<!-- ```ts -->
<!-- type FoodCollectionsDto = { -->
<!--   label: string; // example: "دارای تخفیف" -->
<!--   filter: string; // example: "?discount=true&tab=restaurant" -->
<!--   restaurants: RestaurantDto[] | null; -->
<!--   foods: FoodDto[] | null; -->
<!--   id: string; -->
<!-- }; -->
<!-- ``` -->

- GET `/foods/search/restaurant`

```ts
type FoodSearchParams = {
  q: string; // search text
  category: string;
  collection?: string; // mathalan "takhfhif", "behtrain-ha", ...
} & PaginationParams;

type RestaurantSearchResultDto = RestaurantDto[];
```

- GET `/foods/search/food`

```ts
type FoodSearchParams = {
  q: string; // search text
  category: string;
  collection?: string; // mathalan "takhfhif", "behtrain-ha", ...
} & PaginationParams;

type FoodSearchResultDto = FoodDto[];
```

- GET `/foods/restaurant/:id`

```ts
type RestaurantDto = {
  name: string;
  rating: number;
  image_url: string;
  banner_url?: string;
  address: string;
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
  ingredients: string;
  // discount: DiscountDto;
};
```
