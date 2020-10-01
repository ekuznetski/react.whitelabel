import { Button, Img, LabelView, Svg } from '@components/shared';
import { EAppSection, ELabels } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import { getAppSectionMenu } from '@utils/fn';
import { usePathLocale } from '@utils/hooks';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BurgerMenu, PanelMenu, ProfileMenu } from './components';
import './HeaderPortal.scss';

export function HeaderPortal(props: IHeaderDefaultProps) {
  const _portalMenuConfig = useMemo(() => getAppSectionMenu(EAppSection.portal), []);
  const [isBurgerMenuOpen, setOpenBurgerMenu] = useState(false);
  const { localizePath } = usePathLocale();
  const responsive = useResponsive();
  const { t } = useTranslation();

  return (
    <>
      <div className={classNames('panel', isBurgerMenuOpen && 'fixed')}>
        <Container className="py-3 py-lg-0">
          <div className="logo mr-xl-9">
            <LabelView>
              <Svg href="logo.svg" _label height={!responsive.md ? 28 : 37} />
            </LabelView>
            <LabelView label={ELabels.bsfx}>
              <Img src="logo.png" height={!responsive.md ? 48 : 87} _label />
            </LabelView>
          </div>
          <PanelMenu menuConfig={_portalMenuConfig} />
          <Button className="ml-auto d-none d-md-block">
            <Link to={localizePath('/deposit')} className="px-5">
              {t('Deposit')}
              <Svg href="coins.svg" className="ml-auto" />
            </Link>
          </Button>
          <ProfileMenu />
          <div className="ml-auto ml-md-0 burger-toggle">
            {!responsive.lg &&
              (isBurgerMenuOpen ? (
                <Svg
                  href="close.svg"
                  className="close-icon ml-9"
                  height={!responsive.md ? 18 : 21}
                  onClick={() => setOpenBurgerMenu(false)}
                />
              ) : (
                <Svg
                  href="burger_menu.svg"
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
