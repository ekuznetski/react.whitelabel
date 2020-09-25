import React from 'react';
import './TabLabelDepositMethod.scss';
import { Svg } from '@components/shared';

export function TabLabelDepositMethod({ title, subTitle, icon }: { title: string; subTitle: string; icon: string }) {
	return (
		<div className="d-flex tabLabel">
			<div className="text">
				<div className="title">{title}</div>
				<div className="subtitle">{subTitle}</div>
			</div>
			<Svg className="icon" href={icon + '.svg'} width={40} height={24} />
		</div>
	);
}
