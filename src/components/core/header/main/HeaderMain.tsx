import { Container } from '@components/shared';
import { EAppSection } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import { routesNavConfig } from '@routers';
import { useLockScroll } from '@utils/hooks';
import { useDebounceFn, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { memo, useEffect, useState } from 'react';
import { Auth, BurgerMenu, BurgerToggle, Logo, Menu } from './components';
import './HeaderMain.scss';

export const HeaderMain = memo(function HeaderMain(props: IHeaderDefaultProps) {
  const _mainRoutesConfig = routesNavConfig.filter((route) => route.menuItem && route.appSection === EAppSection.main);
  const [isBurgerMenuOpen, setOpenBurgerMenu] = useState(false);
  const { setScrollLock } = useLockScroll();
  const responsive = useResponsive();

  const { run: debounceOpenBurger } = useDebounceFn((value: boolean) => setOpenBurgerMenu(value), {
    wait: isBurgerMenuOpen ? 0 : 150,
  });

  useEffect(() => {
    if (isBurgerMenuOpen && responsive.lg) setOpenBurgerMenu(false);
  }, [responsive.lg]);

  useEffect(() => {
    setScrollLock(isBurgerMenuOpen, 300);
  }, [isBurgerMenuOpen]);

  return (
    <>
      <div className={classNames('panel-menu', (props.fixed || isBurgerMenuOpen) && 'fixed')}>
        <Container className="py-3 py-lg-0">
          <Logo />
          <Menu routes={_mainRoutesConfig} />
          <Auth />
          <BurgerToggle isBurgerMenuOpen={isBurgerMenuOpen} toggleBurgerMenu={debounceOpenBurger} />
        </Container>
      </div>
      <BurgerMenu
        isBurgerMenuOpen={isBurgerMenuOpen}
        toggleBurgerMenu={debounceOpenBurger}
        routes={_mainRoutesConfig}
      />
    </>
  );
});
