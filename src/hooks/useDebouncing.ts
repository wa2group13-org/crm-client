import { useEffect, useState } from "react";

export function useDebouncing<T>(state: T, debounceMs: number) {
  const [internalState, setInternalState] = useState<T>(state);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInternalState(state);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [state]);

  return internalState;
}
