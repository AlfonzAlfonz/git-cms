export const trace = <T>(x: T, ...args: any[]) => {
  console.info(x, ...args);
  return x;
};
