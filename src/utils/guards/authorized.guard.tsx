import { IRouteGuard } from '@domain/interfaces';

export function userAuthorized(): IRouteGuard {
	const isAuthenticated = true;
	return (
		isAuthenticated || {
			pathname: '/dashboard',
			state: { from: location.pathname },
		}
	);
}
