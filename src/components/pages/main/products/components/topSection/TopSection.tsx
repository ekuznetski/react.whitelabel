import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Button, SectionBg } from '@components/shared';
import { config } from '@pages/main/products';
import { EAssetClass } from '@domain/enums';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './TopSection.scss';

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
      <SectionBg primary={'product-page-top.jpg'} />
      <div className="container pt-17">
        <div className="row mb-10">
          <div className="col-lg-7">
            <div className="page-top__title mb-5 mb-lg-7">{config.pageTopTitle}</div>
          </div>
        </div>
        <div className="row mx-n1">
          {config.headerNavigation.map((navBtn, n) => (
            <div key={n} className="col-6 col-md-4 col-xl-2 px-1 mb-5 mb-xl-0">
              <Button
                className={navBtn.anchor === activeSection ? 'active' : ''}
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
