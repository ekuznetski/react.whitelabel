import { useResponsive } from 'ahooks';

export function useDeviceDetect() {
  const responsive = useResponsive();
  return {
    isMobile: !responsive.md,
    isTablet: responsive.md && !responsive.lg,
    isDesktop: responsive.lg,
  };
}
