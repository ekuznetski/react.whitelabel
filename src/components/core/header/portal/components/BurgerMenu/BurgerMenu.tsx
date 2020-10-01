import { Svg } from '@components/shared';
import { IMenuConfig } from '@domain/interfaces';
import { usePathLocale } from '@utils/hooks';
import classNames from 'classnames';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import './BurgerMenu.scss';

type IBurgerMenu = {
  menuConfig: IMenuConfig;
  closeBurgerMenu: () => void;
  className: string;
};

export function BurgerMenu({ menuConfig, closeBurgerMenu, className }: IBurgerMenu) {
  const { localizePath } = usePathLocale();
  const { t } = useTranslation();

  return (
    <div className={classNames('header-burger-menu', className)}>
      <Container className="pt-16 h-100">
        <Row className="h-100">
          <Col xs={12}>
            {menuConfig.map((menuItem, index) => (
              <div key={index} className="menu__item">
                {menuItem.path ? (
                  <NavLink exact to={localizePath(menuItem.path)} onClick={closeBurgerMenu}>
                    {menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
                    {menuItem.title}
                  </NavLink>
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
            <Link to={localizePath('/deposit')} className="px-5">
              {t('Deposit')}
              <Svg href="coins.svg" className="ml-auto" />
            </Link>
          </Button>
        </Row>
      </Container>
    </div>
  );
}
