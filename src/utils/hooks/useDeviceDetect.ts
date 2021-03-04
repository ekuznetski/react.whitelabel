import { isBrowser, isMobileOnly, isTablet } from 'react-device-detect';

export function useDeviceDetect() {
  return {
    isMobile: isMobileOnly,
    isTablet: isTablet,
    isBrowser: isBrowser,
  };
}
