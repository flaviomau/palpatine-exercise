import { createWriteStream } from "fs";
import { Homeworld } from "../../entities/homeWorld";
import { GeneratorProviderPort } from "./generator.provider.port";
import { OUTPUT_FILE_NAME } from "../../../config/config.json";

class GeneratorProviderAdapter implements GeneratorProviderPort {
  async generateCitizensSuperSecretInfo(
    homeWorlds: Map<string, Homeworld>
  ): Promise<void> {
    const writeStream = createWriteStream(OUTPUT_FILE_NAME);

    console.log("\n");
    homeWorlds.forEach(world => {
      writeStream.write(`${world.name || world.url}\n`);
      console.log(
        `Saving planet ${world.name || world.url} data - ${world.citizens
          .size} citizen(s) found`
      );
      world.citizens.forEach(citizen => {
        writeStream.write(`- ${citizen.name}\n`);
      });
      writeStream.write("\n");
    });

    console.log("Secret file successfuly generated!");
  }
}

export { GeneratorProviderAdapter };
