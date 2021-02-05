import { EClientStatus, EClientStatusCode, ENotificationType } from '@domain/enums';

export type TClientStatus = {
  code: EClientStatusCode;
  status: string;
  statusMessage: EClientStatus;
  notificationType: ENotificationType;
};

export type _statusPair<T extends keyof typeof EClientStatus> = {
  code: typeof EClientStatusCode[T];
  message: typeof EClientStatus[T];
  notificationType: ENotificationType;
};
