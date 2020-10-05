import { ELabels } from '@domain/enums';
import { useCheckLabel, useLabelFolder } from '@utils/hooks';
import React, { ImgHTMLAttributes, memo } from 'react';
const path = require('path');

export const Img = memo(function Img(props: { _label?: ELabels | boolean } & ImgHTMLAttributes<HTMLImageElement>) {
  if (!props.src || !useCheckLabel(props._label)) return null;
  const labelFolder =
    props._label !== undefined && props._label !== null && useCheckLabel(props._label) ? useLabelFolder() : '';

  const innerProps = { ...props };
  delete innerProps._label;

  return <img {...innerProps} src={`assets${labelFolder}/${path.basename(props.src)}`} />;
});
