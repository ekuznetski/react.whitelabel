import { ClientStatus, ClientStatusCode } from '@domain/enums';

export const ClientStatusPair = (status: keyof typeof ClientStatus) => ({
	code: ClientStatusCode[status],
	message: ClientStatus[status],
});

export type _statusPair<T extends keyof typeof ClientStatus> = {
	code: typeof ClientStatusCode[T];
	message: typeof ClientStatus[T];
};
