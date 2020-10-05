import { env } from '@domain';
import { ELabels } from '@domain/enums';
import React from 'react';

interface IDomainView {
  children: React.ReactNode;
  label?: ELabels;
}

export function LabelView({ children, label = ELabels.default }: IDomainView) {
  return label === env.LABEL?.toLowerCase() && children ? <>{children}</> : null;
}
