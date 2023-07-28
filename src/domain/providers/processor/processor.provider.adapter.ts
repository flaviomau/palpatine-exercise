import { createReadStream } from "fs";
import { createInterface } from "readline";

import { ProcessorProviderPort } from "./processor.provider.port";
import {
  MAX_LINES_PER_BATCH,
  INPUT_FILE_NAME
} from "../../../config/config.json";

class ProcessorProviderAdapter implements ProcessorProviderPort {
  async processSuperSecretData(): Promise<string[][]> {
    const fileStream = createReadStream(INPUT_FILE_NAME);
    const encodedBatches: string[][] = [];
    let batchCounter = 0;
    encodedBatches[batchCounter] = [];

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      encodedBatches[batchCounter].push(line);

      if (encodedBatches[batchCounter].length === MAX_LINES_PER_BATCH) {
        console.log(
          `Batch ${++batchCounter} of ${MAX_LINES_PER_BATCH} lines read from file`
        );
        encodedBatches[batchCounter] = [];
      }
    }
    console.log(
      `Batch ${batchCounter + 1} of ${encodedBatches[batchCounter]
        .length} lines read from file\n`
    );

    return encodedBatches;
  }
}

export { ProcessorProviderAdapter };
