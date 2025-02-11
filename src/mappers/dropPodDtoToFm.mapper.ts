import { DropPodDto } from '../types/apis/dataTransferObject/dropPodDto';
import { DropPodFm } from '../types/apis/frontModel/dropPodFm';
export const dropPodDtoToFmMapper = (dto: DropPodDto[]): DropPodFm[] => {
    return dto.map((dropPodDto) => ({
        id: Number(dropPodDto.ID),
        name: dropPodDto.features.properties.name,
        className: dropPodDto.features.properties.type,
        location: dropPodDto.location,
        features: dropPodDto.features
    }));
};
