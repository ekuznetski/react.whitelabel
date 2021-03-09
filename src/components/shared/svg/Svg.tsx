import { ELabels } from '@domain/enums';
import { useCheckLabel, useLabelFolder } from '@utils/hooks';
import React, { SVGProps, memo, useMemo } from 'react';

const path = require('path');

export const Svg = memo((props: { isIcon?: boolean; _label?: ELabels | boolean } & SVGProps<SVGSVGElement>) => {
  if (!props.href || !useCheckLabel(props._label)) return null;
  const labelFolder = useLabelFolder();

  const innerProps = { ...props };
  if (innerProps.isIcon) {
    innerProps.width = innerProps.width || '19px';
    innerProps.height = innerProps.height || '19px';
  }
  delete innerProps.isIcon;
  delete innerProps._label;

  return useMemo(() => {
    try {
      const LabelSvgComponent = require(`../../../assets${labelFolder}/svg/${path
        .join(path.dirname(props.href), path.basename(props.href))
        .replace('.svg', '')}.svg`);

      return <LabelSvgComponent.ReactComponent {...innerProps} />;
    } catch (e) {
      const SvgComponent = require(`../../../assets/svg/${path
        .join(path.dirname(props.href), path.basename(props.href))
        .replace('.svg', '')}.svg`);

      return <SvgComponent.ReactComponent {...innerProps} />;
    }
  }, [labelFolder, props]);
});
