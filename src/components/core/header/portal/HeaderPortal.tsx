import { Button, Img, LocaleLink, Svg } from '@components/shared';
import { EAppSection, ELabels } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import { getAppSectionMenu } from '@utils/fn';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BurgerMenu, PanelMenu, ProfileMenu } from './components';
import './HeaderPortal.scss';

export function HeaderPortal(props: IHeaderDefaultProps) {
  const _portalMenuConfig = useMemo(() => getAppSectionMenu(EAppSection.portal), []);
  const [isBurgerMenuOpen, setOpenBurgerMenu] = useState(false);
  const responsive = useResponsive();
  const { t } = useTranslation();

  return (
    <>
      <div className={classNames('panel', isBurgerMenuOpen && 'fixed')}>
        <Container className="py-3 py-lg-0">
          <div className="logo mr-xl-9">
            <Svg href="logo" _label height={!responsive.md ? 28 : 37} />
            <Svg href="logo" _label={ELabels.arofx} height={!responsive.md ? 28 : 37} />
            <Svg href="logo" _label={ELabels.bsfx} height={!responsive.md ? 48 : 60} />
          </div>
          <PanelMenu menuConfig={_portalMenuConfig} />
          <Button className="ml-auto d-none d-md-block">
            <LocaleLink to="/deposit" className="px-5">
              {t('Deposit')}
              <Svg href="coins" className="ml-auto" />
            </LocaleLink>
          </Button>
          <ProfileMenu />
          <div className="ml-auto ml-md-0 burger-toggle">
            {!responsive.lg &&
              (isBurgerMenuOpen ? (
                <Svg
                  href="close"
                  className="close-icon ml-9"
                  height={!responsive.md ? 18 : 21}
                  onClick={() => setOpenBurgerMenu(false)}
                />
              ) : (
                <Svg
                  href="burger_menu"
                  className="burger-icon ml-9"
                  height={!responsive.md ? 18 : 21}
                  onClick={() => setOpenBurgerMenu(true)}
                />
              ))}
          </div>
        </Container>
      </div>
      <BurgerMenu
        menuConfig={_portalMenuConfig}
        closeBurgerMenu={() => setOpenBurgerMenu(false)}
        className={isBurgerMenuOpen ? 'visible' : ''}
      />
    </>
  );
}
