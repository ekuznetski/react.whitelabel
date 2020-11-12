import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, ColProps } from 'react-bootstrap';
import { Svg } from '..';
import './Alert.scss';

type IAlert = {
  viewType?: 'message' | 'block';
  type: 'success' | 'warning' | 'error' | 'info' | 'text';
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  sizes?: ColProps;
};

export const Alert = memo(
  forwardRef<HTMLDivElement, IAlert>(function Alert(
    { viewType = 'block', sizes = {}, showIcon = true, ...props },
    ref,
  ) {
    return (
      <Col {...sizes} className={classNames('common-alert py-3 px-5', props.className, viewType, props.type)} ref={ref}>
        {showIcon && <Svg href="warning" width={16} className="mr-2" />}
        <div className="alert-context">{props.children}</div>
      </Col>
    );
  }),
);
