import env from '@domain';
import { useMemo } from 'react';
import { ELabels } from '@domain/enums';

export function useDomainFolder(path?: string) {
	const appTarget: keyof typeof ELabels = env.LABEL || 'default';

	if (ELabels[appTarget] == undefined || ELabels[appTarget] == null) {
		throw new Error(
			'env.LABEL value: ' +
				appTarget +
				' is not supported! Pls check that the value exist in EProjects enum or add it',
		);
		return null;
	}

	return useMemo(() => {
		if (path) {
			switch (true) {
				case path.search(/assets\//) !== -1:
					{
						path = path.replace(/assets\//, `assets/_${appTarget}`);
					}
					break;
			}
		} else {
			path = `/_${appTarget}`;
		}

		return path;
	}, [path]);
}
