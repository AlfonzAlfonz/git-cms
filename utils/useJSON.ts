import { Dispatch, useMemo, useRef, useEffect, SetStateAction } from "react";

export const useJSON = <T>(value: string, set: Dispatch<string>) => {
  const json = useMemo<T>(() => JSON.parse(value), [value]);
  const callable = useRef(true);

  useEffect(() => {
    const id = setInterval(() => set(JSON.stringify(json)), 1000);

    return () => {
      clearInterval(id);
    };
  });

  return [
    json,
    (v: SetStateAction<T>) => {
      callable.current && set(JSON.stringify(typeof v === "function" ? (v as any)(json) : v));
      // callable.current = false;
      // setTimeout(() => {
      //   callable.current = true;
      // }, 200);
    }
  ] as const;
};
