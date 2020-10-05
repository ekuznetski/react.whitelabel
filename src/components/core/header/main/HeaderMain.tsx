import { Button, Img, LabelView, LocaleLink, LocaleNavLink, Svg } from '@components/shared';
import { routesNavConfig } from '@domain';
import { EAppSection, ELabels } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './HeaderMain.scss';

export function HeaderMain(props: IHeaderDefaultProps) {
  const _mainRoutesConfig = routesNavConfig.filter((route) => route.menuItem && route.appSection === EAppSection.main);
  const [isBurgerMenuOpen, setOpenBurgerMenu] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const responsive = useResponsive();
  const { t } = useTranslation();

  useEffect(() => {
    const _scrollbarWidth = isBurgerMenuOpen ? window.innerWidth - document.body.clientWidth : 0;
    document.body.style.paddingRight = _scrollbarWidth + 'px';
    document.body.classList.toggle('lock', isBurgerMenuOpen);
    setScrollbarWidth(_scrollbarWidth);
  }, [isBurgerMenuOpen]);

  return (
    <div style={{ width: `calc(100% - ${scrollbarWidth}px)` }}>
      <div className={classNames('panel-menu', (props.fixed || isBurgerMenuOpen) && 'fixed')}>
        <Container className="py-3 py-lg-0">
          <div className="logo mr-9">
            <LabelView>
              <Svg href="logo.svg" _label height={!responsive.md ? 28 : 37} />
            </LabelView>
            <LabelView label={ELabels.bsfx}>
              <Img src="logo.png" height={!responsive.md ? 48 : 87} _label />
            </LabelView>
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
                  href="close.svg"
                  className="close-icon ml-9"
                  height={!responsive.md ? 18 : 21}
                  onClick={() => setOpenBurgerMenu(false)}
                />
              ) : (
                <Svg
                  href="burger_menu.svg"
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
    </div>
  );
}
