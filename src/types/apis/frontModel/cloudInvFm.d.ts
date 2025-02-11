import type { GameClassNamesEnum } from '../../../enums/gameClassNames.enum';
import type { GameItemsEnum } from '../../../enums/gameItems.enum';

export type CloudInvFm = {
    name: GameItemsEnum;
    className: GameClassNamesEnum;
    amount: number;
    direction?: 'up' | 'down' | 'equal';
};
