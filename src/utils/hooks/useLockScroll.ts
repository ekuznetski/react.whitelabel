export function useLockScroll(state: boolean) {
  const _root = document.getElementById('root');
  _root?.classList.toggle('locked', state);
}
