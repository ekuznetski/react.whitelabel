import { Button, LocaleLink, LocaleNavLink, Svg } from '@components/shared';
import { EPagePath } from '@domain/enums';
import { IMenuConfig } from '@domain/interfaces';
import { IAppStore, IStore } from '@store';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BurgerProfile } from '..';
import './BurgerMenu.scss';

type IBurgerMenu = {
  menuConfig: IMenuConfig;
  closeBurgerMenu: () => void;
  className: string;
};

export function BurgerMenu({ menuConfig, closeBurgerMenu, className }: IBurgerMenu) {
  const { route } = useSelector<IStore, { route: IAppStore['route'] }>((state) => ({
    route: state.app.route,
  }));
  const [activeSubMenu, setActiveSubMenu] = useState(-1);
  const { t } = useTranslation();

  useEffect(() => {
    const activeMenu = menuConfig.find((item) =>
      item.path
        ? item.path === route.path
        : item.children
        ? item.children.some((child) => child.path === route.path)
        : false,
    );

    if (activeMenu) {
      setActiveSubMenu(menuConfig.indexOf(activeMenu));
    }
  }, [route.path]);

  function toggleDropdownMenu(subMenuIdx: number) {
    if (activeSubMenu != subMenuIdx) {
      setActiveSubMenu(subMenuIdx);
    } else {
      setActiveSubMenu(-1);
    }
  }

  function onClose() {
    setActiveSubMenu(-1);
    closeBurgerMenu();
  }

  return (
    <div className={classNames('header-burger-menu', className)}>
      <div className="header-burger-menu__wrapper d-flex flex-column h-100 w-100">
        <BurgerProfile activeSubMenu={activeSubMenu} closeSubMenu={() => toggleDropdownMenu(-1)} />
        <div className="h-100 px-6">
          {menuConfig.map((menuItem, index) => (
            <div key={index} className={classNames('menu__item', activeSubMenu != index && 'closed')}>
              {menuItem.path ? (
                <LocaleNavLink exact to={menuItem.path} onClick={onClose}>
                  {menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
                  {menuItem.label}
                </LocaleNavLink>
              ) : menuItem.children ? (
                <>
                  <a onClick={() => toggleDropdownMenu(index)}>
                    {menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
                    {menuItem.label}
                    <Svg href="chevron" width={13} className="menu__item__chevron ml-auto" />
                  </a>
                  <div key={index} className="sub-menu" style={{ height: menuItem.children.length * 50 }}>
                    {menuItem.children.map((child, c_idx) => (
                      <div key={c_idx} className="sub-menu__item ml-3">
                        <LocaleNavLink exact to={child.path} onClick={onClose}>
                          {child.icon?.length && <Svg href={child.icon} height={20} className="mr-4" />}
                          {child.label}
                        </LocaleNavLink>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <a onClick={onClose}>
                  {menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
                  {menuItem.label}
                </a>
              )}
            </div>
          ))}
        </div>
        <Button className="col mt-auto w-100">
          <LocaleLink to={EPagePath.Deposit} className="px-5">
            {t('Deposit')}
            <Svg href="coins" className="ml-5" />
          </LocaleLink>
        </Button>
      </div>
    </div>
  );
}
