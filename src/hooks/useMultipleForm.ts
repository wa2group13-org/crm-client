import { useEffect, useState } from "react";

export default function useMultipleForm<T>(elements: T[]) {
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState(elements[0]);

  useEffect(() => {
    setCurrent(elements[index]);
  }, [index]);

  function nextStep() {
    setIndex((n) => {
      if (n >= elements.length - 1) return n;
      return n + 1;
    });
  }

  function prevStep() {
    setIndex((n) => {
      if (n <= 0) return 0;
      return n - 1;
    });
  }

  return {
    current,
    nextStep,
    prevStep,
  };
}
