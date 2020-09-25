import { memo } from 'react';
import classNames from 'classnames';
import React from 'react';

export const HeaderTableTemplate = memo(function ({ preview }: { preview: boolean }) {
	const tdClass = classNames('td', !preview && 'full');
	const fullViewParamClass = classNames(tdClass, 'fullViewParam');

	return (
		<div className="thead">
			<div className="tr">
				<div className={tdClass}>Instruments</div>
				<div className={`${tdClass} grouped`}>
					Account Types <br />
					Min Spread
					<div className="sub-row">
						{['Fixed', 'Classic', 'Raw'].map((item, i) => (
							<span key={item} className={`col${i}`}>
								{item}
							</span>
						))}
					</div>
				</div>
				<div className={fullViewParamClass}>Swap Long</div>
				<div className={fullViewParamClass}>Swap Short</div>
				<div className={fullViewParamClass}>Lot Size</div>
				<div className={fullViewParamClass}>Min Trade</div>
				<div className={fullViewParamClass}>Value Per Tick</div>
				<div className={fullViewParamClass}>Leverage Info</div>
				<div className={tdClass}>Platform</div>
			</div>
		</div>
	);
});
