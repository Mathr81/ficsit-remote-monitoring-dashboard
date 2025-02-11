import type { Location } from '../../../types/location';
import type { Features } from '../../../types/features';

export type DropPodFm = {
    id: number;
    name: string;
    className: string;
    location: Location;
    features: Features;
};
