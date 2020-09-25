import { routesConfig } from '@domain';
import { EAppSection } from '@domain/enums';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import FooterAuth from './auth/FooterAuth';
import FooterMain from './main/FooterMain';
import FooterPortal from './portal/FooterPortal';
import { useLocation } from 'react-router-dom';

export function Footer() {
	const location = useLocation();
	let appSection = routesConfig.find(route => route.path == location.pathname)?.appSection as EAppSection;

	return useMemo(() => {
		let footer_class = classNames('footer', appSection);

		return (
			<footer className={footer_class}>
				{appSection === EAppSection.auth && <FooterAuth />}
				{appSection === EAppSection.main && <FooterMain />}
				{appSection === EAppSection.portal && <FooterPortal />}
			</footer>
		);
	}, [appSection]);
}

export default Footer;
