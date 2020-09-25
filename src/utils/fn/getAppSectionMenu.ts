import { routesNavConfig } from '@domain';
import { EAppSection } from '@domain/enums';
import { IMenuItemConfig, IMenuItemParentConfig, IMenuConfig } from '@domain/interfaces';

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
						title: _p?.title || route.meta.title,
					};
				else
					return {
						title: _p || route.meta.title,
					};
			}
			return;
		});

	// Generate Parent elements first to feed them with Menu Items later
	_menuParents.forEach((parent) => {
		if (typeof parent == 'object') {
			_menu[parent?.title] = {
				...(_menu[parent?.title] || {}),
				...parent,
				children: [...(_menu[parent?.title]?.children || [])],
			};
		} else if (parent) {
			_menu[parent] = {
				...(_menu[parent] || {}),
				title: parent,
				children: [...(_menu[parent]?.children || [])],
			};
		}
	});

	// Generate Menu Item as Parent.children or Parent element
	_routesConfig.forEach((route) => {
		if (typeof route.menuItem == 'object') {
			const _item = { ...route.menuItem };
			const _parent = (_item.parent as any)?.title || _item.parent || null;
			const _itemKey = _item.title || route.meta.title;
			_item.title = _itemKey;
			delete _item.parent;

			if (_parent) _menu[_parent].children.push({ ..._item, path: route.path });
			else _menu[_itemKey] = { ..._item, path: route.path, children: [] };
		} else if (route.menuItem) {
			_menu[route.meta.title] = { title: route.meta.title, path: route.path, children: [] };
		}
	});

	return Object.values(_menu);
}
