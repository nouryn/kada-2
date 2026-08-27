import { useEffect, useState } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Remove the previous timer before starting a new one
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
