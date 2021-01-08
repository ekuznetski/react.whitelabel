import { ClientStatusCodeNotificationType, EClientStatus, EClientStatusCode } from '@domain/enums';
import { camel } from 'case';
import i18n from '@i18next';

const t = i18n.getLazyT;

export function generateStatus(status?: keyof typeof EClientStatus) {
  status = status && (camel(status) as keyof typeof EClientStatus);

  return status
    ? {
        code: EClientStatusCode[status],
        message: t(`Client Status:${EClientStatus[status]}`),
        notificationType: ClientStatusCodeNotificationType[EClientStatusCode[status]],
      }
    : {
        code: EClientStatusCode[EClientStatus.notApplicable],
        message: '',
        notificationType: ClientStatusCodeNotificationType[EClientStatusCode.notApplicable],
      };
}
