import { ClientStatusCodeNotificationType, EClientStatus, EClientStatusCode } from '@domain/enums';
import { camel } from 'case';
import i18n from '@i18next';
import { TClientStatus } from '@domain/interfaces';

const t = i18n.getLazyT;

export function generateStatus(statusCode?: typeof EClientStatusCode[keyof typeof EClientStatusCode]): TClientStatus {
  if (statusCode) {
    const _status = statusCode && (camel(EClientStatusCode[statusCode]) as keyof typeof EClientStatus);

    return {
      code: EClientStatusCode[_status],
      status: _status,
      statusMessage: t(`Client Status:${EClientStatus[_status]}`) as EClientStatus,
      notificationType: ClientStatusCodeNotificationType[EClientStatusCode[_status]],
    };
  } else
    return {
      code: EClientStatusCode[EClientStatus.notApplicable],
      status: '',
      statusMessage: EClientStatus.unknown,
      notificationType: ClientStatusCodeNotificationType[EClientStatusCode.notApplicable],
    };
}
