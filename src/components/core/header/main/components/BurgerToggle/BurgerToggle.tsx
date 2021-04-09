import { Svg } from '@components/shared';
import { useResponsive } from 'ahooks';
import React, { memo } from 'react';
import './BurgerToggle.scss';

export const BurgerToggle = memo(function BurgerToggle(props: {
  isBurgerMenuOpen: boolean;
  toggleBurgerMenu: (state: boolean) => void;
}) {
  const responsive = useResponsive();

  return (
    <div className="header-panel-burger-toggle">
      {!responsive.lg &&
        (props.isBurgerMenuOpen ? (
          <Svg
            href="close"
            className="close-icon ml-9"
            height={!responsive.md ? 18 : 21}
            onClick={() => props.toggleBurgerMenu(false)}
          />
        ) : (
          <Svg
            href="burger_menu"
            className="burger-icon ml-9"
            height={!responsive.md ? 18 : 21}
            onClick={() => props.toggleBurgerMenu(true)}
          />
        ))}
    </div>
  );
});
