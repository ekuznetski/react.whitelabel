import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, ColProps } from 'react-bootstrap';
import { Svg } from '..';
import './Alert.scss';

type IAlert = {
	viewType?: 'message' | 'block';
	type: 'success' | 'warning' | 'error' | 'info';
	children: React.ReactNode;
	className?: string;
	sizes: ColProps;
};

export const Alert = memo(
	forwardRef<HTMLDivElement, IAlert>(function Alert({ viewType = 'block', ...props }, ref) {
		return (
			<Col {...props.sizes} className={classNames('common-alert p-2', props.className, viewType, props.type)} ref={ref}>
				<Svg href="warning" width={16} className="mr-2" />
				<div className="alert-context">{props.children}</div>
			</Col>
		);
	}),
);
