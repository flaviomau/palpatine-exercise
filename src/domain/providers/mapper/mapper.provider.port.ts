import { Homeworld } from "../../entities/homeWorld";

interface MapperProviderPort {
  mapHomeworlds(citizens: string[]): Promise<Map<string, Homeworld>>;
}

export { MapperProviderPort };
