import { ETradingAccountType } from '@domain/enums';
import { IDefaultClientSettings } from '@domain/interfaces';

export const initialClientSettings: IDefaultClientSettings = {
  allowed_account_types: [ETradingAccountType.fixed, ETradingAccountType.variable],
};
