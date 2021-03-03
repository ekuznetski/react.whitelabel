import classNames from 'classnames';
import React from 'react';
import { ContainerProps } from './helpers';

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { fluid = false, className, ...props },
  ref,
) {
  const prefix = 'container';
  const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
  return (
    <div ref={ref} {...props} className={classNames(className, fluid ? `${prefix}${suffix}` : prefix)}>
      {props.children}
    </div>
  );
});
