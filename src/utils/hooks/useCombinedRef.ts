import React from 'react';

export function useCombinedRef<T = HTMLDivElement>(ref: ((instance: T | null) => void) | React.MutableRefObject<T | null> | null) {
	const targetRef = React.createRef<T>();

	React.useEffect(() => {
		if (!ref) return;
		if (typeof ref === 'function') {
			ref(targetRef.current);
		} else {
			ref.current = targetRef.current;
		}
	}, [ref]);

	return targetRef;
}
