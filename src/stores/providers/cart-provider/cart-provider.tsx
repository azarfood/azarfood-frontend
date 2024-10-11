import {
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { FoodDto } from '@/services/food/dtos/food.dto';
import { StorageService } from '@/services/storage/storage.service';

import { CartContext } from './cart-context';
import type { CartItem, ReceiptItem } from './cart-provider.types';

export function CartProvider(props: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>(StorageService.cart.get() ?? []);
  const [deletedCartItems, setDeletedCartItems] = useState<CartItem[]>([]);
  const [receipts, setReceipts] = useState<ReceiptItem[]>(
    StorageService.receipts.get() ?? [],
  );
  const cartCanUndoDeleteItem = deletedCartItems.length !== 0;

  const cartAddItem = useCallback(function (food: FoodDto) {
    setCart((prev) =>
      prev
        .filter((item) => item.food.id !== food.id)
        .concat([{ count: 1, food }]),
    );
  }, []);
  const cartDeleteItem = useCallback(
    function (id: string, withHistory: boolean = true) {
      const item = cart.find((item) => item.food.id === id);
      if (!item) {
        return;
      }
      setCart((prev) => prev.filter((item) => item.food.id !== id));
      if (withHistory) {
        setDeletedCartItems((prev) => prev.concat([item]));
      }
    },
    [cart],
  );
  const cartCleareDeleteHistory = useCallback(function () {
    setDeletedCartItems([]);
  }, []);
  const cartUndoDeleteItem = useCallback(
    function cartDeleteItem() {
      const lastDeletedItem = deletedCartItems.at(-1);
      if (!cartCanUndoDeleteItem || !lastDeletedItem) {
        return;
      }

      setDeletedCartItems((prev) =>
        prev.filter((item) => item.food.id !== lastDeletedItem.food.id),
      );
      setCart((prev) => prev.concat([lastDeletedItem]));
    },
    [cartCanUndoDeleteItem, deletedCartItems],
  );
  const cartChangeFoodCount = useCallback(function (id: string, count: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.food.id !== id ? item : { ...item, count: Math.max(count, 1) },
      ),
    );
  }, []);
  const cartMoveToReceipt = useCallback(
    function (info: Exclude<ReceiptItem, 'products'>) {
      setReceipts((prev) => prev.concat([{ ...info, products: cart }]));
      setCart([]);
      cartCleareDeleteHistory();
    },
    [cart, cartCleareDeleteHistory],
  );
  const receiptDeleteAll = useCallback(function () {
    setReceipts([]);
  }, []);
  const receiptDeleteItem = useCallback(
    function (id: string) {
      const item = receipts.find((item) => item.id === id);
      if (!item) {
        return;
      }
      setReceipts((prev) => prev.filter((item) => item.id !== id));
    },
    [receipts],
  );
  const receiptUpdateItem = useCallback(function (
    id: string,
    patch: Partial<ReceiptItem>,
  ) {
    setReceipts((prev) =>
      prev.map((item) => (item.id !== id ? item : { ...item, ...patch })),
    );
  }, []);

  useEffect(() => {
    if (cart.length) {
      StorageService.cart.set(cart);
    }
  }, [cart]);
  useEffect(() => {
    if (receipts.length) {
      StorageService.receipts.set(receipts);
    }
  }, [receipts]);

  return (
    <CartContext.Provider
      value={{
        receipts,
        cart,
        cartAddItem,
        cartDeleteItem,
        cartUndoDeleteItem,
        cartCleareDeleteHistory,
        cartCanUndoDeleteItem,
        cartChangeFoodCount,
        cartMoveToReceipt,
        receiptDeleteAll,
        receiptDeleteItem,
        receiptUpdateItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context == null) {
    throw new Error('Error: you need to register CartProvider in your layout');
  }

  return context;
}
