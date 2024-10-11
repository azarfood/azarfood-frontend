import { createContext } from 'react';

import type { FoodDto } from '@/services/food/dtos/food.dto';

import type { CartItem, ReceiptItem } from './cart-provider.types';

export interface CartContextData {
  cart: CartItem[];
  receipts: ReceiptItem[];

  cartAddItem(food: FoodDto): void;
  cartDeleteItem(id: string, withHistor?: boolean): void;
  cartUndoDeleteItem(): void;
  cartCleareDeleteHistory(): void;
  cartCanUndoDeleteItem: boolean;
  cartChangeFoodCount(id: string, count: number): void;
  cartMoveToReceipt(info: Exclude<ReceiptItem, 'products'>): void;

  receiptDeleteAll(): void;
  receiptDeleteItem(id: string): void;
  receiptUpdateItem(id: string, patch: Partial<ReceiptItem>): void;
}

export const CartContext = createContext<CartContextData | null>(null);
