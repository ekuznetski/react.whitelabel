import { EActionTypes } from '@store';

export class MRequestAdapter {
  constructor(actionType: EActionTypes, props: any) {
    if (props.leverage) {
      props.leverage = props.leverage.slice(2);
    }
    Object.assign(this, props);
  }
}
