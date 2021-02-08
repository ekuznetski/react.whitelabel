import { Button, LocaleLink, LocaleNavLink, Svg } from '@components/shared';
import { EAppSection, ELabels } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import { env } from '@env';
import { routesNavConfig } from '@routers';
import { IDataStore, IStore } from '@store';
import { useLockScroll } from '@utils/hooks';
import { useDebounceFn, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useIntercom } from 'react-use-intercom';
import { ProfileMenu } from './components';
import './HeaderMain.scss';

export function HeaderMain(props: IHeaderDefaultProps) {
  const { clientProfile } = useSelector<IStore, { clientProfile: IDataStore['client']['profile'] }>((state) => ({
    clientProfile: state.data.client.profile,
  }));
  const _mainRoutesConfig = routesNavConfig.filter((route) => route.menuItem && route.appSection === EAppSection.main);
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
      <div className={classNames('panel-menu', (props.fixed || isBurgerMenuOpen) && 'fixed')}>
        <Container className="py-3 py-lg-0">
          <LocaleLink to="" className="logo">
            <Svg href="logo" className="mr-xl-9" _label height={!responsive.md ? 28 : 37} />
            <Svg href="logo" className="mr-xl-9" _label={ELabels.arofx} height={!responsive.md ? 28 : 37} />
            <Svg href="logo" className="mr-xl-1" _label={ELabels.bsfx} height={!responsive.md ? 48 : 60} />
          </LocaleLink>
          <div className="menu">
            {_mainRoutesConfig.map((route) => (
              <div key={route.path} className="menu__item">
                <LocaleNavLink exact to={route.path}>
                  {route.menuItem?.label}
                </LocaleNavLink>
              </div>
            ))}
          </div>
          {!clientProfile ? (
            <>
              <LocaleLink to="/login" className="sign-in-btn ml-auto">
                {t('Sign In')}
              </LocaleLink>
              <Button className="open-account-btn ml-9 d-none d-md-block">
                <LocaleLink to="/registration">{t('Open An Account')}</LocaleLink>
              </Button>
            </>
          ) : (
            <ProfileMenu className="ml-auto" />
          )}
          <div className="burger-toggle">
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
      <div className={classNames('burger-menu', isBurgerMenuOpen && 'visible')}>
        <Container className="pt-16 h-100">
          <Row className="h-100">
            <Col xs={12}>
              {_mainRoutesConfig.map((route) => (
                <div key={route.path} className="menu__item">
                  <LocaleNavLink exact to={route.path} onClick={() => setOpenBurgerMenu(false)}>
                    {route.menuItem?.label}
                  </LocaleNavLink>
                </div>
              ))}
            </Col>
            <Button className="mt-auto">
              <LocaleLink to="/registration">{t('Open An Account')}</LocaleLink>
            </Button>
          </Row>
        </Container>
      </div>
    </>
  );
}
