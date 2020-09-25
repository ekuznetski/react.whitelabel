import { ClientStatus, ClientStatusCode } from '@domain/enums';

export const getClientStatusPair = (status: keyof typeof ClientStatus) => ({
	code: ClientStatusCode[status],
	message: ClientStatus[status],
});
