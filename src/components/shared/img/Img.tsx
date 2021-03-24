import { ELabels } from '@domain/enums';
import { useCheckLabel } from '@utils/hooks';
import classNames from 'classnames';
import React, { ImgHTMLAttributes, memo } from 'react';
const path = require('path');

export const Img = memo(function Img(props: { _label?: ELabels | boolean } & ImgHTMLAttributes<HTMLImageElement>) {
  if (!props.src || !useCheckLabel(props._label)) return null;

  const innerProps = { ...props };
  delete innerProps._label;
  delete innerProps.className;

  return (
    <div className={classNames('common-img', props.className)}>
      <img height="100%" {...innerProps} src={`assets/${path.join(path.dirname(props.src), path.basename(props.src))}`} />
    </div>
  );
});
