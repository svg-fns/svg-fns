export const isServer = (): boolean =>
  typeof process !== "undefined" && !!process.versions?.node;

export const isClient = (): boolean =>
  typeof window !== "undefined" && typeof document !== "undefined";

export const assertServer = (errorMessage?: string): void => {
  if (!isServer()) throw new Error(errorMessage ?? "requires server");
};

export const assertClient = (errorMessage?: string): void => {
  if (!isClient()) throw new Error(errorMessage ?? "requires client");
};
