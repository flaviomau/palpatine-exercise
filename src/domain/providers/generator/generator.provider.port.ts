import { Homeworld } from "../../entities/homeWorld";

interface GeneratorProviderPort {
  generateCitizensSuperSecretInfo(
    homeWorlds: Map<string, Homeworld>
  ): Promise<void>;
}

export { GeneratorProviderPort };
