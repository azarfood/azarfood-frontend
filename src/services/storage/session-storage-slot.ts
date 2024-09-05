import type { StorageSlot } from './entities/storage-slot';

export class SessionStorageSlot<T> implements StorageSlot<T> {
  constructor(
    private key: string,
    private initialValue: T,
  ) {}
  get(): T {
    try {
      return JSON.parse(sessionStorage.getItem(this.key)!);
    } catch {
      return this.initialValue;
    }
  }
  set(arg: T): void {
    sessionStorage.setItem(this.key, JSON.stringify(arg));
  }
  init(): StorageSlot<T> {
    sessionStorage.setItem(this.key, JSON.stringify(this.initialValue));
    return this;
  }
}
