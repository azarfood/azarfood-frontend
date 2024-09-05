import { LocalStorageSlot } from './local-storage-slot';

export class StorageService {
  public static user_token = new LocalStorageSlot<string | null>(
    'user_token',
    null,
  );

  public static reset() {
    Object.entries(StorageService).forEach(([, value]) => {
      value.init();
    });
  }
}
