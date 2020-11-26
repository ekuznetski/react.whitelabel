import { ENotificationType } from '@domain/enums';

export interface INotificationState {
  visible: boolean;
  type: ENotificationType;
  timeout?: number | null;
  context: React.ReactNode;
}
