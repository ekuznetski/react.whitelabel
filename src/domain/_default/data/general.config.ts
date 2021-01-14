import { ETradingAccountType } from '@domain/enums';
import { IClientSettings } from '@domain/interfaces';
import { MClientSettings } from '@domain/models';

export const initialClientSettings = new MClientSettings({
  allowed_account_types: [ETradingAccountType.fixed, ETradingAccountType.classic, ETradingAccountType.raw],
} as IClientSettings);
