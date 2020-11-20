import { Button, Img, LocaleLink, LocaleNavLink, Svg } from '@components/shared';
import { routesNavConfig } from '@domain';
import { EAppSection, ELabels } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLockScroll } from 'utils/hooks/useLockScroll';
import './HeaderMain.scss';

export function HeaderMain(props: IHeaderDefaultProps) {
  const _mainRoutesConfig = routesNavConfig.filter((route) => route.menuItem && route.appSection === EAppSection.main);
  const [isBurgerMenuOpen, setOpenBurgerMenu] = useState(false);
  const responsive = useResponsive();
  const { t } = useTranslation();

  useEffect(() => {
    if (isBurgerMenuOpen && responsive.lg) setOpenBurgerMenu(false);
  }, [responsive]);

  useEffect(() => {
    useLockScroll(isBurgerMenuOpen);
  }, [isBurgerMenuOpen]);

  return (
    <>
      <div className={classNames('panel-menu', (props.fixed || isBurgerMenuOpen) && 'fixed')}>
        <Container className="py-3 py-lg-0">
          <div className="logo">
            <Svg href="logo" className="mr-9" _label height={!responsive.md ? 28 : 37} />
            <Svg href="logo" className="mr-9" _label={ELabels.arofx} height={!responsive.md ? 28 : 37} />
            <Svg href="logo" className="mr-1" _label={ELabels.bsfx} height={!responsive.md ? 48 : 60} />
          </div>
          <div className="menu">
            {_mainRoutesConfig.map((route) => (
              <div key={route.path} className="menu__item">
                <LocaleNavLink exact to={route.path}>
                  {route.meta?.title}
                </LocaleNavLink>
              </div>
            ))}
          </div>
          <Button className="ml-auto d-none d-md-block">
            <LocaleLink to="/registration">{t('Open An Account')}</LocaleLink>
          </Button>
          <div className="ml-auto ml-md-0 burger-toggle">
            {!responsive.lg &&
              (isBurgerMenuOpen ? (
                <Svg
                  href="close"
                  className="close-icon ml-9"
                  height={!responsive.md ? 18 : 21}
                  onClick={() => setOpenBurgerMenu(false)}
                />
              ) : (
                <Svg
                  href="burger_menu"
                  className="burger-icon ml-9"
                  height={!responsive.md ? 18 : 21}
                  onClick={() => setOpenBurgerMenu(true)}
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
                    {route.meta?.title}
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
