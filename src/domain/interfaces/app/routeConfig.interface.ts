import { EAppSection, EPagePath } from '@domain/enums';
import { IAction } from '@store';
import { Path } from 'history';
import { RouteProps } from 'react-router-dom';

export interface IRouteNavConfig {
  meta: {
    title: string;
    desc?: string;
  };
  path: EPagePath;
  appSection: EAppSection;
  component:
    | null
    | React.ComponentClass<{ routeState?: { [key: string]: any } } & any>
    | React.FunctionComponent<{ routeState?: { [key: string]: any } } & any>;
  activators?: ((routeProps?: RouteProps) => boolean | { path: Path; state?: { [key: string]: any } })[];
  state?: { [key: string]: any };
  apiData?: {
    lazy?: ((args?: { force: true | null }) => IAction)[];
    strict?: ((args?: { force: true | null }) => IAction)[];
  };
  menuItem?: IMenuItemConfig;
}

export interface IRouteRedirectConfig {
  path: string;
  redirectTo: string;
  appSection: EAppSection;
}
export type IRoutesInitialApiData = {
  [K in typeof EAppSection[keyof typeof EAppSection]]: {
    lazy?: ((args?: { force: true | null }) => IAction)[];
    strict?: ((args?: { force: true | null }) => IAction)[];
  };
};

export type IRouteConfig = (IRouteNavConfig | IRouteRedirectConfig)[];

export interface IPageSectionsConfig {
  component: React.ComponentClass | React.FunctionComponent;
  sections: (React.ComponentClass | React.FunctionComponent)[];
}

export interface IMenuItemConfig {
  label: string;
  description?: string;
  icon?: string;
  parent?: string | IMenuItemParentConfig;
}

export type IMenuItemParentConfig = Omit<IMenuItemConfig, 'parent' | 'description'> & { path?: string };

export type IChildrenMenuConfig = (Omit<IMenuItemConfig, 'parent'> & {
  path: string;
})[];

export type IMenuConfig = (Omit<IMenuItemConfig, 'parent'> & {
  path?: string;
  children: IChildrenMenuConfig;
})[];
