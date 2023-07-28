interface ProcessorProviderPort {
  processSuperSecretData(): Promise<string[][]>;
}

export { ProcessorProviderPort };
