export const capitalize = (s: string) => s.split("-").map(_cap).join(" ");

const _cap = (s: string) => s[0].toLocaleUpperCase() + s.slice(1);
