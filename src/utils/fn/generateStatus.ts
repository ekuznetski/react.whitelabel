import { ClientStatusCodeNotificationType, EClientStatus, EClientStatusCode } from '@domain/enums';
import { camel } from 'case';
import i18n from '@i18next';
import { TClientStatus } from '@domain/interfaces';

const t = i18n.getLazyT;

export function generateStatus(status?: keyof typeof EClientStatus): TClientStatus {
  status = status && (camel(status) as keyof typeof EClientStatus);

  return status
    ? {
        code: EClientStatusCode[status],
        status: status,
        statusMessage: t(`Client Status:${EClientStatus[status]}`) as EClientStatus,
        notificationType: ClientStatusCodeNotificationType[EClientStatusCode[status]],
      }
    : {
        code: EClientStatusCode[EClientStatus.notApplicable],
        status: '',
        statusMessage: EClientStatus.unknown,
        notificationType: ClientStatusCodeNotificationType[EClientStatusCode.notApplicable],
      };
}
