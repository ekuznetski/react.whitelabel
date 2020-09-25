import { useDebounceEffect } from 'ahooks';
import classNames from 'classnames';
import React from 'react';
import './PageLoader.scss';

export function PageLoader({ isLoading }: any) {
	const elemRef = React.createRef<HTMLDivElement>();

	useDebounceEffect(
		() => {
			if (elemRef.current) {
				elemRef.current.style.display = isLoading ? 'flex' : 'none';
			}
		},
		[isLoading],
		{ wait: isLoading ? 350 : 0 },
	);

	return (
		<div className={classNames('page-loader', !isLoading && 'hide')} ref={elemRef}>
			Page loading...
		</div>
	);
}
