import { ETradingAccountType } from '@domain/enums';
import { MClientSettings } from '@domain/models';

export const initialClientSettings: Partial<MClientSettings> = {
  allowed_account_types: [ETradingAccountType.fixed, ETradingAccountType.classic, ETradingAccountType.raw],
};
