import { ITable } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import './MobileDepositTable.scss';

export const MobileDepositTable = memo(
	forwardRef<HTMLDivElement, ITable>(function MobileDepositTable(props, ref) {
		return (
			<div className={classNames('mobile-deposit-table', props.className)}>
				{props.rows.map((item, idx) => (
					<div key={idx} className="mobile-deposit-table__item px-3 py-5">
						<div className="item__line method">{item[0]}</div>
						<div className="item__line">
							<div className="item__cell px-3">
								<div className="item__label">{props.headers[1]}</div>
								<div className="item__context">{item[1]}</div>
							</div>
							<div className="item__cell px-3">
								<div className="item__label">{props.headers[2]}</div>
								<div className="item__context">{item[2]}</div>
							</div>
						</div>
						<div className="item__line">
							<div className="item__cell px-3">
								<div className="item__label">{props.headers[3]}</div>
								<div className="item__context">{item[3]}</div>
							</div>
							<div className="item__cell px-3">
								<div className="item__label">{props.headers[4]}</div>
								<div className="item__context">{item[4]}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}),
);
