interface DecoderProviderPort {
  decodeLines(encodedBatches: string[][]): Promise<string[]>;
  decodeHomeworldName(url: string): Promise<string | undefined>;
}

export { DecoderProviderPort };
