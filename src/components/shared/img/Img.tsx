import { ELabels } from '@domain/enums';
import { useCheckLabel } from '@utils/hooks';
import React, { ImgHTMLAttributes, memo } from 'react';
const path = require('path');

export const Img = memo(function Img(props: { _label?: ELabels | boolean } & ImgHTMLAttributes<HTMLImageElement>) {
  if (!props.src || !useCheckLabel(props._label)) return null;

  const innerProps = { ...props };
  delete innerProps._label;

  return <img {...innerProps} src={`assets/${path.join(path.dirname(props.src), path.basename(props.src))}`} />;
});
