import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T, dependencies?: unknown[]) {
  const valueRef = useRef(value);
  const prevValue = valueRef.current;
  useEffect(() => {
    valueRef.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  return prevValue;
}
