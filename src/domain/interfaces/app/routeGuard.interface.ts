import { RedirectProps } from 'react-router-dom';

export type IRouteGuard = boolean | RedirectProps['to'];
