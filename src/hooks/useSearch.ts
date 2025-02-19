import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function useSearch<P extends Record<string, S>, S>(params: P) {
  const parsed = Object.entries(params).map((value) => {
    const [key, val] = value;
    if (typeof val !== "string") return [key, JSON.stringify(val)];
    else return [key, val];
  });

  const parsedParams: { [p: string]: string } = Object.fromEntries(parsed);

  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Set the parameters from the default value. Must be done
   * in a useEffect.
   */
  useEffect(() => {
    setSearchParams((prev) => {
      const curr = [...prev.entries()];

      const newer = Object.entries(parsedParams).filter(
        ([key]) => !curr.map(([k]) => k).includes(key),
      );

      return curr.concat(newer);
    });
  }, []);

  const currentParams = [...searchParams.entries()];

  const newParams: P = Object.fromEntries(
    Object.entries(parsedParams).map((value) => {
      const key = value[0];
      let item = value[1];

      const index = currentParams.map(([k]) => k).indexOf(key);
      if (index !== -1) item = currentParams[index][1];

      if (typeof params[key] === "string") return [key, item];
      else return [key, JSON.parse(item) as S];
    }),
  );

  return {
    params: newParams,
    getParams: function <K extends keyof P & string>(key: K): P[K] {
      const param = searchParams.get(key);
      if (param === null) {
        return params[key];
      }

      if (typeof params[key] === "string") {
        return param as P[K];
      } else {
        return JSON.parse(param) as P[K];
      }
    },
    setParams: function <K extends keyof P>(key: K, value: P[K]): void {
      let newValue;
      if (typeof params[key] === "string") newValue = value as string;
      else newValue = JSON.stringify(value);

      setSearchParams((prev) => ({
        ...[...prev.entries()].reduce((p: { [k: string]: string }, n) => {
          p[n[0]] = n[1];
          return p;
        }, {}),
        [key]: newValue,
      }));
    },
  };
}
