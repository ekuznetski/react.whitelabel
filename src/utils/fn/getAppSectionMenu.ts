import { EAppSection } from '@domain/enums';
import { IMenuConfig, IMenuItemConfig, IMenuItemParentConfig } from '@domain/interfaces';
import { routesNavConfig } from '@routers';

export function getAppSectionMenu(section: EAppSection): IMenuConfig {
  const _menu: any = {};
  // Select all routes config that belong to mention App Section
  const _routesConfig = routesNavConfig.filter((route) => route.menuItem && route.appSection === section);
  // Collect Parent Menu Items elements
  const _menuParents = _routesConfig
    .filter((route) => typeof route.menuItem == 'object')
    .map((route) => {
      const _p = (route.menuItem as IMenuItemConfig)?.parent as IMenuItemParentConfig;
      if (_p) {
        if (typeof _p == 'object')
          return {
            ..._p,
            label: _p?.label || route.menuItem?.label,
          };
        else
          return {
            label: _p || route.menuItem?.label,
          };
      }
      return;
    });

  // Generate Parent elements first to feed them with Menu Items later
  _menuParents.forEach((parent) => {
    if (typeof parent == 'object') {
      if (parent?.label) {
        _menu[parent?.label] = {
          ...(_menu[parent?.label] || {}),
          ...parent,
          children: [...(_menu[parent?.label]?.children || [])],
        };
      }
    } else if (parent) {
      _menu[parent] = {
        ...(_menu[parent] || {}),
        label: parent,
        children: [...(_menu[parent]?.children || [])],
      };
    }
  });

  // Generate Menu Item as Parent.children or Parent element
  _routesConfig.forEach((route) => {
    if (route.menuItem) {
      const _item = { ...route.menuItem };
      const _parent = (_item.parent as any)?.label || _item.parent || null;
      const _itemKey = _item.label || route.menuItem?.label;
      _item.label = _itemKey;
      delete _item.parent;

      if (!route.activators?.length || route.activators?.every((e) => e({}) === true)) {
        if (_parent) _menu[_parent].children.push({ ..._item, path: route.path });
        else _menu[_itemKey] = { ..._item, path: route.path, children: [] };
      }
    }
  });

  return Object.values(_menu).filter((e: any) => e.children?.length) as IMenuConfig;
}
