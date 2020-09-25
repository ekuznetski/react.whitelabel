import { EAppSection } from '@domain/enums';

export function useLockScroll(state: boolean, section: EAppSection) {
	const _root = document.getElementById('root');
	if (_root) {
		_root.style.overflowY = state ? 'hidden' : 'unset';
		_root.style.height = state ? '100vh' : 'auto';
		Object.keys(EAppSection).forEach((_section) => _root.classList.remove(_section));
		_root.classList.add(section);
	}
}
