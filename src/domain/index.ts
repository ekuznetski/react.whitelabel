import _env from './_default/env.config.json';
export default _env as { [k: string]: any };

export const env: { [k: string]: any } = _env;
export * from './_default/pages.config';
export * from './_default/routers.config';
export * from './_default/validation.config';
export * from './_default/portal/profile-menu.config';
