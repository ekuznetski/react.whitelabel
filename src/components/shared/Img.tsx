import React, { ImgHTMLAttributes, memo } from 'react';
const path = require('path');

export const Img = memo(function Img(props: { _label?: boolean } & ImgHTMLAttributes<HTMLImageElement>) {
	if (!props.src) return null;
	const innerProps = { ...props };
	delete innerProps._label;

	return <img {...innerProps} src={`assets/${path.basename(props.src)}`} />;
});
