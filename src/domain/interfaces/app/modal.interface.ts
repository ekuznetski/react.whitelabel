import { ExtractComponentProps } from '../general.interface';

export interface IModalState<T = React.NamedExoticComponent> {
  visible: boolean;
  component: T;
  props?: ExtractComponentProps<T>;
  modalWrapperClassName?: string;
}
