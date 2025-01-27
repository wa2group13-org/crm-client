import { useEffect, useState } from "react";

export default function useMultipleForm<T>({
  elements,
  firstState,
  onStateChange,
}: {
  elements: T[];
  firstState?: number | T;
  onStateChange?: (index: number, element: T) => "block" | "continue";
}) {
  if (typeof firstState !== "undefined" && typeof firstState !== "number")
    firstState = elements.indexOf(firstState);

  const [index, setIndex] = useState(firstState ?? 0);
  const [current, setCurrent] = useState(elements[index]);

  useEffect(() => {
    setCurrent(elements[index]);
  }, [index]);

  function nextStep() {
    setIndex((n) => {
      const newIndex = n >= elements.length - 1 ? n : n + 1;

      const state = onStateChange?.(newIndex, elements[newIndex]) ?? "continue";
      if (state === "block") return n;

      return newIndex;
    });
  }

  function prevStep() {
    setIndex((n) => {
      const newIndex = n <= 0 ? 0 : n - 1;

      const state = onStateChange?.(newIndex, elements[newIndex]) ?? "continue";
      if (state === "block") return n;

      return newIndex;
    });
  }

  return {
    current,
    index,
    nextStep,
    prevStep,
  };
}
