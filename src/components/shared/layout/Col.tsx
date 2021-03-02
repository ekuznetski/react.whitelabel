import classNames from 'classnames';
import React from 'react';
import { ColOrder, ColProps, ColSize, NumberAttr } from './helpers';

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];

export const Col = React.forwardRef<HTMLDivElement, ColProps>(function Col({ className, ...props }, ref) {
  const prefix = 'col';
  const spans: string[] = [];
  const classes: string[] = [];

  DEVICE_SIZES.forEach((brkPoint) => {
    const propValue = (props as any)[brkPoint];
    delete (props as any)[brkPoint];

    let span: ColSize | undefined;
    let offset: NumberAttr | undefined;
    let order: ColOrder | undefined;

    if (typeof propValue === 'object' && propValue != null) {
      ({ span = true, offset, order } = propValue);
    } else {
      span = propValue;
    }

    const infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

    if (span) spans.push(span === true ? `${prefix}${infix}` : `${prefix}${infix}-${span}`);

    if (order != null) classes.push(`order${infix}-${order}`);
    if (offset != null) classes.push(`offset${infix}-${offset}`);
  });

  if (!spans.length) {
    spans.push(prefix); // plain 'col'
  }

  return (
    <div {...props} ref={ref} className={classNames(className, ...spans, ...classes)}>
      {props.children}
    </div>
  );
});
