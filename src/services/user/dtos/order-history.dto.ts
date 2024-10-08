export interface OrderHistoryDto {
  id: string;
  date: string;
  total_cost: string;
  status: 'delivered' | 'canceled' | 'reserved';
  meal: 'lunch' | 'dinner';

  orderProducts: {
    name: string;
    count: number;
    cost: string;
  }[];
}
