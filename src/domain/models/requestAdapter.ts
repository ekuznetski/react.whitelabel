import { EActionTypes } from '@store';

export class MRequestAdapter {
  constructor(actionType: EActionTypes, props: any) {
    if (props.leverage) {
      props.leverage = props.leverage.slice(2);
    }
    if (props.country && typeof props.country === 'object') {
      props.country = props.country.name;
    }
    if (props.phone_prefix && typeof props.phone_prefix === 'object') {
      props.phone_prefix = parseInt(props.phone_prefix.phoneCode);
    }
    Object.assign(this, props);
  }
}
