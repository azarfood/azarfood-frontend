import type {
  CartItem,
  ReceiptItem,
} from '@/stores/providers/cart-provider/cart-provider.types';

import { LocalStorageSlot } from './local-storage-slot';

export class StorageService {
  public static user_token = new LocalStorageSlot<string | null>(
    'user_token',
    null,
  );

  public static cart = new LocalStorageSlot<CartItem[] | null>(
    'user_cart',
    null,
  );
  public static receipts = new LocalStorageSlot<ReceiptItem[] | null>(
    'user_receipts',
    null,
  );

  public static reset() {
    Object.entries(StorageService).forEach(([, value]) => {
      value.init();
    });
  }
}
