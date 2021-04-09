import { LocaleLink, Svg } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import { useResponsive } from 'ahooks';
import React, { memo } from 'react';
import './Logo.scss';

export const Logo = memo(function Logo() {
  const responsive = useResponsive();

  return (
    <LocaleLink to={EPagePath.Home} className="header-panel-logo">
      <Svg href="logo" className="mr-xl-9" _label height={!responsive.md ? 28 : 37} />
      <Svg href="logo" className="mr-xl-9" _label={ELabels.arofx} height={!responsive.md ? 28 : 37} />
      <Svg href="logo" className="mr-xl-1" _label={ELabels.bsfx} height={!responsive.lg ? 48 : 60} />
      <Svg href="logo" className="mr-xl-1" _label={ELabels.uinvex} height={32} />
    </LocaleLink>
  );
});
