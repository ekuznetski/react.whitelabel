import React, { RefObject, useEffect, useState } from 'react';
import { Button, SectionBg } from '@components/shared';
import { config } from '@pages/main/products';
import { EAssetClass } from '@domain/enums';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './TopSection.scss';
import classNames from 'classnames';

export interface IProductsTopSectionProps {
  sectionRefs: { [key: string]: RefObject<any> };
}

export function TopSection({ sectionRefs }: IProductsTopSectionProps) {
  const [activeSection, selectedSection] = useState('forex');

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
          lg: 'products-page-top-desktop.png',
        }}
      />
      <div className="container">
        <div className="row mb-9">
          <div className="col text-center">
            <div className="page-top__title">{config.pageTopTitle}</div>
          </div>
        </div>
        <div className="nav-buttons row no-gutters mx-auto justify-content-center">
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
      </div>
    </section>
  );
}
