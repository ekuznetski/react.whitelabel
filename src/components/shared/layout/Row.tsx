import classNames from 'classnames';
import React from 'react';
import { RowProps } from './helpers';

const DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];

export const Row = React.forwardRef<HTMLDivElement, RowProps>(function Row(
  { className, noGutters = false, ...props },
  ref,
) {
  const classes: string[] = [];

  DEVICE_SIZES.forEach((brkPoint) => {
    const propValue = (props as any)[brkPoint];
    delete (props as any)[brkPoint];

    let cols;
    if (propValue != null && typeof propValue === 'object') {
      ({ cols } = propValue);
    } else {
      cols = propValue;
    }

    const infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

    if (cols != null) classes.push(`row-cols${infix}-${cols}`);
  });

  return (
    <div ref={ref} {...props} className={classNames(className, 'row', noGutters && 'no-gutters', ...classes)}>
      {props.children}
    </div>
  );
});
