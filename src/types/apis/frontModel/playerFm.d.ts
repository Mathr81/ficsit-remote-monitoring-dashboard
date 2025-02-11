import type { Location } from "../../../types/location";
import type { Features } from "../../../types/features";

export type PlayerFm = {
  id: number;
  name: string;
  className: string;
  location: Location;
  online: boolean;
  playerHP: number;
  dead: boolean;
  inventory?: InventoryEntity[] | null;
  features: Features;
};
