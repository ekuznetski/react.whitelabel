import React, { memo, SVGProps, useMemo } from 'react';
import { useDomainFolder } from '@utils/hooks';
const path = require('path');

export const Svg = memo(function Svg(props: { isIcon?: boolean; _label?: boolean } & SVGProps<SVGSVGElement>) {
	if (!props.href) return null;
	const labelFolder = props._label !== undefined && props._label !== null ? useDomainFolder() : '';

	const innerProps = { ...props };
	if (innerProps.isIcon) {
		innerProps.width = innerProps.width || '19px';
		innerProps.height = innerProps.height || '19px';
	}
	delete innerProps.isIcon;
	delete innerProps._label;

	return useMemo(() => {
		const SvgComponent = require(`../../../assets${labelFolder}/svg/${path.basename(props.href)}`);

		return <SvgComponent.ReactComponent {...innerProps} />;
	}, [labelFolder, props]);
});
