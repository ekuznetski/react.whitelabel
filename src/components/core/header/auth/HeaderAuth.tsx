import { Svg } from '@components/shared';
import React from 'react';
import './HeaderAuth.scss';
import { Container } from 'react-bootstrap';
import { IHeaderDefaultProps } from '@domain/interfaces';
import classNames from 'classnames';

export function HeaderAuth(props: IHeaderDefaultProps) {
	return (
		<div className={classNames('panel-menu', props.fixed && 'fixed')}>
			<Container>
				<div className="logo">
					<Svg className="m-auto" href="logo.svg" _label />
				</div>
			</Container>
		</div>
	);
}
