import { ClientStatus, ClientStatusCode } from '@domain/enums';

export function getClientStatusPair(status: keyof typeof ClientStatus) {
  return {
    code: ClientStatusCode[status],
    message: ClientStatus[status],
  };
}
