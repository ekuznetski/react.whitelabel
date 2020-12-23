import { ClientStatusCodeNotificationType, EClientStatus, EClientStatusCode, ENotificationType } from '@domain/enums';

export const ClientStatusPair = (status: keyof typeof EClientStatus) => ({
  code: EClientStatusCode[status],
  message: EClientStatus[status],
  notificationType: ClientStatusCodeNotificationType[EClientStatusCode[status]],
});

export type _statusPair<T extends keyof typeof EClientStatus> = {
  code: typeof EClientStatusCode[T];
  message: typeof EClientStatus[T];
  notificationType: ENotificationType;
};
