export interface StorageSlot<T> {
  get(): T;
  set(arg: T): void;
  init(arg: T): StorageSlot<T>;
}
