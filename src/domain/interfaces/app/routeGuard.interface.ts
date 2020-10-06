import { Path } from 'history';

export type IRouteGuard = boolean | { path: Path; state?: { [key: string]: any } };
