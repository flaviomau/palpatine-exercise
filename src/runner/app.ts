import { inject, singleton } from "tsyringe";
import { ProcessorProviderPort } from "../domain/providers/processor/processor.provider.port";
import { DecoderProviderPort } from "../domain/providers/decoder/decoder.provider.port";
import { MapperProviderPort } from "../domain/providers/mapper/mapper.provider.port";
import { GeneratorProviderPort } from "../domain/providers/generator/generator.provider.port";
import { API_KEY } from "../config/config.json";

@singleton()
class RunnerApp {
  constructor(
    @inject("ProcessorProvider")
    private processorProvider: ProcessorProviderPort,
    @inject("DecoderProvider") private decoderProvider: DecoderProviderPort,
    @inject("MapperProvider") private mapperProvider: MapperProviderPort,
    @inject("GeneratorProvider")
    private generatorProvider: GeneratorProviderPort
  ) {}

  async run() {
    if (!API_KEY || API_KEY === "") {
      console.log(
        "The key to access the Chancellor super advanced computer was not found, we need to abort the mission!"
      );
      return;
    }
    const encodedBatches = await this.processorProvider.processSuperSecretData();

    const decodedLines = await this.decoderProvider.decodeLines(encodedBatches);

    const homeWorlds = await this.mapperProvider.mapHomeworlds(decodedLines);

    await this.generatorProvider.generateCitizensSuperSecretInfo(homeWorlds);
  }
}

export { RunnerApp };
