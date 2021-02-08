import { useEffect, useState } from 'react';

export function useLockScroll() {
  const [isLocked, setIsLocked] = useState(false);
  const [lockDelay, setLockDelay] = useState(0);
  const [unlockDelay, setUnlockDelay] = useState(0);
  const [lockPos, setLockPos] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const _root = document.getElementById('root');

  useEffect(() => {
    if (_root) {
      if (isLocked) {
        _root.classList.toggle('locking', true);
        setLockPos(window.pageYOffset);
      }

      if (timer) {
        clearTimeout(timer);
      }

      setTimer(
        setTimeout(
          () => {
            if (isLocked) _root.classList.toggle('locking', false);
            else {
              // that ensure that scroll() will be executed on the next render frame after class has been changed
              setTimeout(() => window.scroll(0, lockPos), 0);
            }
            _root.classList.toggle('locked', isLocked);
          },
          isLocked ? lockDelay : unlockDelay,
        ),
      );
    }
  }, [isLocked]);

  function lock(state: boolean, lockDelay: number, unlockDelay: number) {
    setIsLocked(state);
    setLockDelay(lockDelay);
    setUnlockDelay(unlockDelay);
  }

  return {
    lockScroll: (lockDelay: number = 0, unlockDelay: number = 0) => lock(true, lockDelay, unlockDelay),
    unlockScroll: (lockDelay: number = 0, unlockDelay: number = 0) => lock(false, lockDelay, unlockDelay),
    setScrollLock: (state: boolean, lockDelay: number = 0, unlockDelay: number = 0) =>
      lock(state, lockDelay, unlockDelay),
  };
}
