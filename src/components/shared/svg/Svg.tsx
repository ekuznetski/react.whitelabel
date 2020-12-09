import { ELabels } from '@domain/enums';
import { useCheckLabel, useLabelFolder } from '@utils/hooks';
import React, { memo, SVGProps, useMemo } from 'react';

const path = require('path');

export const Svg = memo((props: { isIcon?: boolean; _label?: ELabels | boolean } & SVGProps<SVGSVGElement>) => {
  if (!props.href || !useCheckLabel(props._label)) return null;
  const labelFolder =
    props._label !== undefined && props._label !== null && useCheckLabel(props._label)
      ? useLabelFolder()
      : '';

  const innerProps = { ...props };
  if (innerProps.isIcon) {
    innerProps.width = innerProps.width || '19px';
    innerProps.height = innerProps.height || '19px';
  }
  delete innerProps.isIcon;
  delete innerProps._label;

  return useMemo(() => {
    try {
      const SvgComponent = require(`../../../assets${labelFolder}/svg/${path
        .basename(props.href)
        .replace('.svg', '')}.svg`);
      return <SvgComponent.ReactComponent {...innerProps} />;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [labelFolder, props]);
});
