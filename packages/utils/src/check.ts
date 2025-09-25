export const isNode = (): boolean =>
  typeof process !== "undefined" && !!process.versions?.node;

export const isBrowser = (): boolean =>
  typeof window !== "undefined" && typeof document !== "undefined";

export const assertNode = (errorMessage?: string): void => {
  if (!isNode()) throw new Error(errorMessage ?? "requires node.js");
};

export const assertBrowser = (errorMessage?: string): void => {
  if (!isBrowser()) throw new Error(errorMessage ?? "requires browser");
};
