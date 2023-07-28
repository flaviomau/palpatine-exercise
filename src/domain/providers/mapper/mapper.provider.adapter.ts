import { inject, singleton } from "tsyringe";
import { Citizen } from "../../entities/citizen";
import { Homeworld } from "../../entities/homeWorld";
import { MapperProviderPort } from "./mapper.provider.port";
import { DecoderProviderPort } from "../decoder/decoder.provider.port";

@singleton()
class MapperProviderAdapter implements MapperProviderPort {
  constructor(
    @inject("DecoderProvider") private decoderProvider: DecoderProviderPort
  ) {}

  async mapHomeworlds(citizens: string[]): Promise<Map<string, Homeworld>> {
    const homeWorlds: Map<string, Homeworld> = new Map();

    for (const stringCitizen of citizens) {
      const citizen: Citizen = JSON.parse(stringCitizen);
      const homeWorld = homeWorlds.get(citizen.homeworld);

      if (homeWorld) {
        homeWorld.citizens.set(citizen.name, citizen);
      } else {
        console.log(
          `==> Accessing interstelar database, trying to retrieve the name of the planet accessing: ${citizen.homeworld}`
        );
        const name = await this.decoderProvider.decodeHomeworldName(
          citizen.homeworld
        );
        console.log(
          "==> Operation finished ->",
          name ? `name ${name} found` : "name not found"
        );
        homeWorlds.set(citizen.homeworld, {
          url: citizen.homeworld,
          name,
          citizens: new Map()
        });
      }
    }

    return homeWorlds;
  }
}

export { MapperProviderAdapter };
