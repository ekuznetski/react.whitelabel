import { Button, LocaleLink, Svg } from '@components/shared';
import { EAppSection, ELabels, EPagePath } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import { getAppSectionMenu } from '@utils/fn/getAppSectionMenu';
import { useDebounceFn, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BurgerMenu, PanelMenu, ProfileMenu } from './components';
import './HeaderPortal.scss';

export function HeaderPortal(props: IHeaderDefaultProps) {
  const _portalMenuConfig = useMemo(() => getAppSectionMenu(EAppSection.portal), []);
  const [isBurgerMenuOpen, setOpenBurgerMenu] = useState(false);
  const responsive = useResponsive();
  const { t } = useTranslation();

  const { run: debounceOpenBurger } = useDebounceFn((value) => setOpenBurgerMenu(value), {
    wait: isBurgerMenuOpen ? 0 : 150,
  });

  return (
    <>
      <div className={classNames('panel', isBurgerMenuOpen && 'fixed')}>
        <Container className="py-3 py-lg-0">
          <LocaleLink to={EPagePath.Home} className="logo">
            <Svg href="logo" className="mr-xl-9" _label height={!responsive.md ? 28 : 37} />
            <Svg href="logo" className="mr-xl-9" _label={ELabels.arofx} height={!responsive.md ? 28 : 37} />
            <Svg href="logo" className="mr-xl-1" _label={ELabels.bsfx} height={!responsive.lg ? 48 : 60} />
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
      </div>
      <BurgerMenu
        menuConfig={_portalMenuConfig}
        closeBurgerMenu={() => setOpenBurgerMenu(false)}
        className={isBurgerMenuOpen ? 'visible' : ''}
      />
    </>
  );
}
