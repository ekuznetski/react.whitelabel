import { EClientStatus, EClientStatusCode } from '@domain/enums';

export function getClientStatusPair(status: keyof typeof EClientStatus) {
  return {
    code: EClientStatusCode[status],
    message: EClientStatus[status],
  };
}
