import type { StorageSlot } from './entities/storage-slot';

export class RuntimeStorageSlot<T> implements StorageSlot<T> {
  private value: T;
  constructor(private initialValue: T) {
    this.value = initialValue;
  }
  get(): T {
    return this.value;
  }
  set(arg: T): void {
    this.value = arg;
  }
  init(): StorageSlot<T> {
    this.value = this.initialValue;
    return this;
  }
}
