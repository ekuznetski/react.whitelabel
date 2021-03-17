import { Button, SectionBg } from '@components/shared';
import { EAssetClass } from '@domain/enums';
import { config } from '@pages/main/products';
import { useDeviceDetect } from '@utils/hooks';
import classNames from 'classnames';
import React, { RefObject, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './TopSection.scss';

export interface IProductsTopSectionProps {
  sectionRefs: { [key: string]: RefObject<any> };
}

export function TopSection({ sectionRefs }: IProductsTopSectionProps) {
  const [activeSection, selectedSection] = useState('forex');
  const device = useDeviceDetect();
  let { location, replace }: any = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        navigateToSection(location.state?.scrollTo)();
        const state = { ...location.state };
        delete state.scrollTo;
        replace(location.pathname, state);
      }, 100);
    }
  }, [location]);

  function navigateToSection(type: EAssetClass) {
    return (e?: any) => {
      selectedSection(type);
      sectionRefs[type].current.scrollIntoView({ behavior: 'smooth' });
    };
  }
  return (
    <section className="page-top">
      <SectionBg
        primary="header_bg.jpg"
        secondary={{
          xxs: 'products-page-top-mobile.png',
          md: 'products-page-top-tablet.png',
          lg: 'products-page-top-desktop.png',
        }}
      />
      <div className="container">
        <div className="row mb-9">
          <div className="col text-center">
            <div className="page-top__title">{config.pageTopTitle}</div>
          </div>
        </div>
        {!device.isMobile && (
          <div className="nav-buttons row no-gutters mx-auto">
            {config.headerNavigation.map((navBtn, n) => (
              <div key={n} className="col">
                <Button
                  className={classNames('px-8', navBtn.anchor === activeSection && 'active')}
                  onClick={navigateToSection(navBtn.anchor)}
                >
                  {navBtn.label}
                </Button>
              </div>
            ))}
          </div>
        )}
        {device.isMobile && (
          <>
            <div className="nav-buttons row no-gutters mx-auto mb-10">
              {config.headerNavigation.slice(0, 3).map((navBtn, n) => (
                <div key={n} className="col">
                  <Button
                    className={classNames('px-8', navBtn.anchor === activeSection && 'active')}
                    onClick={navigateToSection(navBtn.anchor)}
                  >
                    {navBtn.label}
                  </Button>
                </div>
              ))}
            </div>
            <div className="nav-buttons row no-gutters mx-auto">
              {config.headerNavigation.slice(3, 5).map((navBtn, n) => (
                <div key={n} className="col">
                  <Button
                    className={classNames('px-8', navBtn.anchor === activeSection && 'active')}
                    onClick={navigateToSection(navBtn.anchor)}
                  >
                    {navBtn.label}
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
