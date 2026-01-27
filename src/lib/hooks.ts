import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...(args as Parameters<T>));
      }, delay);
    },
    [callback, delay],
  ) as T;

  return debouncedCallback;
}
