import axios from "axios";
import { DecoderProviderPort } from "./decoder.provider.port";
import { DECRYPT_URL, API_KEY } from "../../../config/config.json";

class DecoderProviderAdapter implements DecoderProviderPort {
  async decodeLines(encodedBatches: string[][]): Promise<string[]> {
    const decodedLines: string[] = [];
    let batchCounter = 0;
    console.log(
      "Starting decrypt process - accesssing Chancellor super advanced computer"
    );
    for await (const encodedBatch of encodedBatches) {
      try {
        console.log(
          `=> Starting decrypting batch ${++batchCounter} of encrypted lines`
        );
        const response = await axios.post(DECRYPT_URL, encodedBatch, {
          headers: {
            "x-api-key": API_KEY,
            "content-type": "application/json"
          }
        });

        decodedLines.push(...response.data);
        console.log(`<= Batch ${batchCounter} successfully decrypted`);
      } catch (error) {
        console.error("Error to decode the citizen data, ignoring it", error);
      }
    }

    console.log(
      "Finishing decrypt process - starting data filtering and grouping\n"
    );

    return decodedLines;
  }

  async decodeHomeworldName(url: string): Promise<string | undefined> {
    try {
      const response = await axios.get(this.fixUrlDomain(url));

      return response.data.name;
    } catch (error) {
      console.error(
        "Error trying to retrieve the planet name - Lets use only the url to identify it",
        error
      );
    }

    return;
  }

  private fixUrlDomain(oldUrl: string): string {
    return oldUrl.replace("https://swapi.co/", "https://swapi.dev/");
  }
}

export { DecoderProviderAdapter };
