import { useEffect, useState } from 'react';
import { BasicTarget, getTargetElement } from './_utils';

interface Position {
	left: number;
	top: number;
}
export type ShouldUpdateFn = (val: Position) => boolean;
export type Target = BasicTarget<HTMLElement | Document>;

/**
 * Get the scroll position of an element.
 * @param target DOM element or Ref object.
 * @param shouldUpdate Return true/false to run/avoid state changing as so re-render the component.
 *
 * @returns {left: number, top: number}	The current scroll position of the element.
 */
export function useScroll(target?: Target, shouldUpdate: ShouldUpdateFn = (val) => true, deps: any[] = []): Position {
	const [position, setPosition] = useState<Position>({
		left: NaN,
		top: NaN,
	});

	useEffect(() => {
		const el = getTargetElement(target, document);
		if (!el) return;
		function updatePosition(currentTarget: Target) {
			let newPosition;
			if (currentTarget === document) {
				if (!document.scrollingElement) return;
				newPosition = {
					left: document.scrollingElement.scrollLeft,
					top: document.scrollingElement.scrollTop,
				};
			} else {
				newPosition = {
					left: (currentTarget as HTMLElement).scrollLeft,
					top: (currentTarget as HTMLElement).scrollTop,
				};
			}
			if (shouldUpdate(newPosition)) setPosition(newPosition);
		}
		updatePosition(el as Target);
		function listener(event: Event) {
			if (!event.target) return;
			updatePosition(event.target as Target);
		}
		el.addEventListener('scroll', listener);
		return () => {
			el.removeEventListener('scroll', listener);
		};
	}, [target, ...deps]);
	return position;
}
