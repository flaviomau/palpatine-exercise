import { Citizen } from "./citizen";

interface Homeworld {
  name?: string;
  url: string;
  citizens: Map<string, Citizen>;
}

export { Homeworld };
