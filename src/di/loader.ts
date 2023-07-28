import { container } from "tsyringe";

import { DecoderProviderAdapter } from "../domain/providers/decoder/decoder.provider.adapter";
import { GeneratorProviderAdapter } from "../domain/providers/generator/generator.provider.adapter";
import { MapperProviderAdapter } from "../domain/providers/mapper/mapper.provider.adapter";
import { ProcessorProviderAdapter } from "../domain/providers/processor/processor.provider.adapter";
import { RunnerApp } from "../runner/app";

const loadDI = () => {
  container.register("DecoderProvider", {
    useClass: DecoderProviderAdapter
  });

  container.register("GeneratorProvider", {
    useClass: GeneratorProviderAdapter
  });

  container.register("MapperProvider", {
    useClass: MapperProviderAdapter
  });

  container.register("ProcessorProvider", {
    useClass: ProcessorProviderAdapter
  });

  container.register("RunnerApp", {
    useClass: RunnerApp
  });
};

export { loadDI };
