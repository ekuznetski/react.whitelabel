import { Button, Col, Container, LocaleLink, LocaleNavLink, Row } from '@components/shared';
import { EPagePath } from '@domain/enums';
import { IRouteNavConfig } from '@domain/interfaces';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './BurgerMenu.scss';

export const BurgerMenu = memo(function BurgerMenu(props: {
  isBurgerMenuOpen: boolean;
  routes: IRouteNavConfig[];
  toggleBurgerMenu: (state: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className={classNames('header-panel-burger-menu', props.isBurgerMenuOpen && 'open')}>
      <Container className="pt-16 h-100">
        <Row className="h-100">
          <Col xs={12}>
            {props.routes.map((route) => (
              <div key={route.path} className="menu__item">
                <LocaleNavLink exact to={route.path} onClick={() => props.toggleBurgerMenu(false)}>
                  {route.menuItem?.label}
                </LocaleNavLink>
              </div>
            ))}
          </Col>
          <Button className="mt-auto">
            <LocaleLink to={EPagePath.Registration}>{t('Open An Account')}</LocaleLink>
          </Button>
        </Row>
      </Container>
    </div>
  );
});
