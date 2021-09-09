export {};

declare global {
  namespace NodeJS {
    interface Global {
      gBaseUrl: string;
    }
  }
}
