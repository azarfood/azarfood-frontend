import type { StorageSlot } from './entities/storage-slot';

export class LocalStorageSlot<T> implements StorageSlot<T> {
  constructor(
    private key: string,
    private initialValue: T,
  ) {}
  get(): T {
    try {
      return JSON.parse(localStorage.getItem(this.key)!);
    } catch {
      return this.initialValue;
    }
  }
  set(arg: T): void {
    localStorage.setItem(this.key, JSON.stringify(arg));
  }
  init(): StorageSlot<T> {
    localStorage.setItem(this.key, JSON.stringify(this.initialValue));
    return this;
  }
}
