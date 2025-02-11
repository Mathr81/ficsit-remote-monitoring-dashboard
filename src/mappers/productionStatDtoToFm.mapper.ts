import { gameItemsDictionary } from "../dictionaries/gameItems.dictionary";
import { GameClassNamesEnum } from "../enums/gameClassNames.enum";
import type { ProdStatsDto } from "../types/apis/dataTransferObject/prodStatsDto";
import type { ProductionStatFm } from "../types/apis/frontModel/productionStatFm";
import { enumDtoToFmMapper } from "./enumDtoToFm.mapper";

export const productionStatDtoToFMapper = (
  dto: ProdStatsDto[],
): ProductionStatFm[] => {
  return dto.map((prodStatDto) => {
    const className = enumDtoToFmMapper(
      prodStatDto.ClassName,
      GameClassNamesEnum,
      "GameClassNamesEnum",
    );

    const [prodPerMin, consumptionPerMin] = prodStatDto.ProdPerMin.match(/P: ([\d.]+).*C: ([\d.]+)/)?.slice(1, 3) ?? ['0', '0']
    const prodMessagePerMinute = `P: ${parseFloat(prodPerMin).toFixed(2)} / min - C: ${parseFloat(consumptionPerMin).toFixed(2)} / min`;

    return {
      name: gameItemsDictionary[className].name,
      className,
      currentProduction: prodStatDto.CurrentProd,
      currentConsumption: prodStatDto.CurrentConsumed,
      percentProduction: prodStatDto.ProdPercent,
      percentConsumption: prodStatDto.ConsPercent,
      maxProduction: prodStatDto.MaxProd,
      maxConsumption: prodStatDto.MaxConsumed,
      productionPerMinute: prodMessagePerMinute,
    };
  });
};
