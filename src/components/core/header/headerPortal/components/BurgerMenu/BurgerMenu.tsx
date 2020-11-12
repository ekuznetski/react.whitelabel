import { LocaleLink, LocaleNavLink, Svg } from '@components/shared';
import { IMenuConfig } from '@domain/interfaces';
import classNames from 'classnames';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './BurgerMenu.scss';

type IBurgerMenu = {
  menuConfig: IMenuConfig;
  closeBurgerMenu: () => void;
  className: string;
};

export function BurgerMenu({ menuConfig, closeBurgerMenu, className }: IBurgerMenu) {
  const { t } = useTranslation();

  return (
    <div className={classNames('header-burger-menu', className)}>
      <Container className="pt-16 h-100">
        <Row className="h-100">
          <Col xs={12}>
            {menuConfig.map((menuItem, index) => (
              <div key={index} className="menu__item">
                {menuItem.path ? (
                  <LocaleNavLink exact to={menuItem.path} onClick={closeBurgerMenu}>
                    {menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
                    {menuItem.title}
                  </LocaleNavLink>
                ) : (
                  <a onClick={closeBurgerMenu}>
                    {menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
                    {menuItem.title}
                  </a>
                )}
              </div>
            ))}
          </Col>
          <Button className="mt-auto">
            <LocaleLink to="/deposit" className="px-5">
              {t('Deposit')}
              <Svg href="coins" className="ml-auto" />
            </LocaleLink>
          </Button>
        </Row>
      </Container>
    </div>
  );
}
