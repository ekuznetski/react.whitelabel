import { ECountryCode } from '@domain/enums';
import classNames from 'classnames';
import React, { memo } from 'react';
import './Flags.scss';

export const IconFlag = memo(function IconFlag(props: {
	flag: ECountryCode[keyof ECountryCode] | string;
	className?: string;
}) {
	return <span className={classNames(`flag flag-${props.flag}`, props.className)}> </span>;
});
