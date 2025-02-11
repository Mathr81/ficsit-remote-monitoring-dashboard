import { CloudInvDto } from "../types/apis/dataTransferObject/cloudInvDto";
import { gameItemsDictionary } from "../dictionaries/gameItems.dictionary";
import { GameClassNamesEnum } from "../enums/gameClassNames.enum";
import { enumDtoToFmMapper } from "./enumDtoToFm.mapper";
import { CloudInvFm } from "../types/apis/frontModel/cloudInvFm";

export const cloudInvDtoToFmMapper = (dto: CloudInvDto[]): CloudInvFm[] => {
  return dto.map((cloudInvDto) => {
    const className = enumDtoToFmMapper(
      cloudInvDto.ClassName,
      GameClassNamesEnum,
      "GameClassNamesEnum",
    );

    return {
      name: gameItemsDictionary[className].name,
      className,
      amount: cloudInvDto.Amount,
    };
  });
};
