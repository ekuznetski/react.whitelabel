import { ENotificationType } from '@domain/enums';

export interface INotificationState {
	visible: boolean;
	type: ENotificationType;
	timeout?: number;
	context: React.ReactNode;
}
