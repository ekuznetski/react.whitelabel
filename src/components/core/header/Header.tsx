import { routesConfig } from '@domain';
import { EAppSection } from '@domain/enums';
import { useScroll } from '@utils/hooks';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderAuth } from './auth/HeaderAuth';
import { HeaderMain } from './main/HeaderMain';
import { HeaderPortal } from './portal/HeaderPortal';
import { Notification } from '..';

export const Header = memo(function Header() {
	const _scroll = useScroll(document);
	const location = useLocation();
	const section = routesConfig.find((route) => route.path == location.pathname)?.appSection as EAppSection;
	const fixHeader = _scroll.top > (section === EAppSection.portal ? 110 : 40);

	return useMemo(() => {
		const header_class = classNames('header', section);

		return (
			<>
				<header className={header_class}>
					<div className="header-wrapper">
						{section === EAppSection.auth && <HeaderAuth fixed={fixHeader} />}
						{section === EAppSection.main && <HeaderMain fixed={fixHeader} />}
						{section === EAppSection.portal && <HeaderPortal fixed={fixHeader} />}
					</div>
				</header>
				<Notification fixed={fixHeader} />
			</>
		);
	}, [section, fixHeader]);
});
