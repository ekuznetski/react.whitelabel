import { env } from '@domain';
import { ELabels } from '@domain/enums';
import React from 'react';

interface IDomainView {
  children: React.ReactFragment | { [k: any]: React.ReactFragment };
  label?: ELabels;
}

export function LabelView({ children, label = ELabels.default }: IDomainView) {
  let _childer;

  if (Object.prototype.toString.call(children) === '[object Object]') {
    // @ts-ignore
    let tempContent: React.ReactFragment = children?.['*'];
    let key = Object.keys(children).filter(
      (key) => key != '*' && key.toLowerCase().split(',').includes(env.LABEL?.toLowerCase()),
    );

    if (key.length) {
      // @ts-ignore
      tempContent = children[key[0]];
    }

    _childer = tempContent;
  } else {
    _childer = label.toLowerCase() === env.LABEL?.toLowerCase() && children;
  }

  return _childer ? <>{_childer}</> : null;
}
