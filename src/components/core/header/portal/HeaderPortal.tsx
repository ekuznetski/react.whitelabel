import { Button, Container, LocaleLink, Svg } from '@components/shared';
import { EAppSection, ELabels, EPagePath } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import { env } from '@env';
import { getAppSectionMenu } from '@utils/fn/getAppSectionMenu';
import { useLockScroll } from '@utils/hooks';
import { useDebounceFn, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntercom } from 'react-use-intercom';
import { BurgerMenu, PanelMenu, ProfileMenu } from './components';
import './HeaderPortal.scss';

export function HeaderPortal(props: IHeaderDefaultProps) {
  const _portalMenuConfig = useMemo(() => getAppSectionMenu(EAppSection.portal), []);
  const [isBurgerMenuOpen, setOpenBurgerMenu] = useState(false);
  const { setScrollLock } = useLockScroll();
  const { shutdown, boot } = useIntercom();
  const responsive = useResponsive();
  const { t } = useTranslation();

  const { run: debounceOpenBurger } = useDebounceFn((value) => setOpenBurgerMenu(value), {
    wait: isBurgerMenuOpen ? 0 : 150,
  });

  useEffect(() => {
    if (isBurgerMenuOpen && responsive.lg) setOpenBurgerMenu(false);
  }, [responsive]);

  useEffect(() => {
    setScrollLock(isBurgerMenuOpen, 300);
    if (env.PRODUCTION) {
      isBurgerMenuOpen ? shutdown() : boot();
    }
  }, [isBurgerMenuOpen]);

  return (
    <>
      <div className={classNames('panel', isBurgerMenuOpen ? 'fixed' : 'h-100')}>
        <Container className="py-3 py-lg-0 h-100" fluid={!responsive.lg}>
          <LocaleLink to={EPagePath.Home} className="logo">
            <Svg href="logo" className="mr-xl-9" _label height={!responsive.md ? 28 : 37} />
            <Svg href="logo" className="mr-xl-9" _label={ELabels.arofx} height={!responsive.md ? 28 : 37} />
            <Svg href="logo" className="mr-xl-1" _label={ELabels.bsfx} height={!responsive.lg ? 48 : 60} />
            <Svg href="logo" className="mr-xl-1" _label={ELabels.uinvex} height={32} />
          </LocaleLink>
          <PanelMenu menuConfig={_portalMenuConfig} />
          <Button className="ml-auto d-none d-md-block">
            <LocaleLink to={EPagePath.Deposit} className="px-5">
              {t('Deposit')}
              <Svg href="coins" className="ml-auto" />
            </LocaleLink>
          </Button>
          <ProfileMenu />
          <div className="burger-toggle ml-auto ml-md-0">
            {!responsive.lg &&
              (isBurgerMenuOpen ? (
                <Svg
                  href="close"
                  className="close-icon ml-9"
                  height={!responsive.md ? 18 : 21}
                  onClick={() => debounceOpenBurger(false)}
                />
              ) : (
                <Svg
                  href="burger_menu"
                  className="burger-icon ml-9"
                  height={!responsive.md ? 18 : 21}
                  onClick={() => debounceOpenBurger(true)}
                />
              ))}
          </div>
        </Container>
        <BurgerMenu
          menuConfig={_portalMenuConfig}
          closeBurgerMenu={() => setOpenBurgerMenu(false)}
          className={isBurgerMenuOpen ? 'open' : ''}
        />
      </div>
    </>
  );
}
