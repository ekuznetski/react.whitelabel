import { Img, LocaleNavLink, Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import { IChildrenMenuConfig, IMenuConfig } from '@domain/interfaces';
import { useDebounceEffect } from 'ahooks';
import classNames from 'classnames';
import React, { createRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './PanelMenu.scss';

const DROPDOWN_MENU_ELEMENTS_HEIGHT = { item: 50, footer: 28, padding: 16 };
type IDropdownMenuConfig = { items: IChildrenMenuConfig; visible: boolean; posY: number };

export function PanelMenu({ menuConfig }: { menuConfig: IMenuConfig }) {
  const [menuDropdownOptions, setMenuDropdownOptions] = useState<IDropdownMenuConfig>({
    items: [],
    visible: false,
    posY: 0,
  });
  const dropdownRef = createRef<HTMLDivElement>();
  const { t } = useTranslation();

  useDebounceEffect(
    () => {
      if (!menuDropdownOptions.visible) setMenuDropdownOptions(Object.assign({}, menuDropdownOptions, { items: [] }));
    },
    [menuDropdownOptions.visible],
    { wait: 150 },
  );

  function generateDropdownMenu(items: IChildrenMenuConfig, parent: HTMLDivElement) {
    const posY = parent.offsetLeft + (parent.clientWidth - (dropdownRef.current?.clientWidth || 0)) / 2;
    setMenuDropdownOptions(Object.assign({}, menuDropdownOptions, { items: items, visible: true, posY }));
  }

  function tryCloseDropdownMenu(event: any) {
    if (
      (event.relatedTarget instanceof Element || event.relatedTarget instanceof HTMLDocument) &&
      (event.relatedTarget == dropdownRef.current || dropdownRef.current?.contains(event.relatedTarget))
    )
      return;
    setMenuDropdownOptions(Object.assign({}, menuDropdownOptions, { visible: false }));
  }

  return (
    <div className="header-panel-menu">
      {menuConfig.map((menuItem, index) => (
        <div key={index} className="header-panel-menu__item">
          <div
            className="header-panel-menu__item-link"
            onMouseEnter={(e) => generateDropdownMenu(menuItem.children, e.currentTarget)}
            onMouseLeave={tryCloseDropdownMenu}
          >
            {menuItem.path ? (
              <LocaleNavLink exact to={menuItem.path}>
                {menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
                {menuItem.title}
              </LocaleNavLink>
            ) : (
              <a>
                {menuItem.icon?.length && <Svg href={menuItem.icon} className="mr-4" />}
                {menuItem.title}
              </a>
            )}
          </div>
        </div>
      ))}
      <div
        className={classNames('header-panel-menu__dropdown', menuDropdownOptions.visible && 'visible')}
        style={{
          height:
            (menuDropdownOptions.visible
              ? menuDropdownOptions.items.length * DROPDOWN_MENU_ELEMENTS_HEIGHT.item +
                DROPDOWN_MENU_ELEMENTS_HEIGHT.footer +
                DROPDOWN_MENU_ELEMENTS_HEIGHT.padding
              : 0) + 'px',
          left: menuDropdownOptions.posY + 'px',
        }}
        onMouseLeave={tryCloseDropdownMenu}
        ref={dropdownRef}
      >
        <div className="header-panel-menu__dropdown-itemsList pt-3 pb-1">
          {menuDropdownOptions.items.map((child, c) => (
            <div key={c} className="item">
              <LocaleNavLink exact to={child.path} className="px-7">
                {child.icon?.length && <Svg href={child.icon} width={24} className="mr-4" />}
                {child.title}
              </LocaleNavLink>
            </div>
          ))}
        </div>
        <div className="header-panel-menu__dropdown-footer px-7">
          <Svg href="logo.svg" _label height={12} />
          <Svg href="logo.svg" _label={ELabels.arofx} height={12} />
          <Img src="logo.png" _label={ELabels.bsfx} height={16} />
          <span>{t('Est since 1977')}</span>
        </div>
      </div>
    </div>
  );
}
