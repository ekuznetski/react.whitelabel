import { OpenLiveAccountBannerSection } from '@components/sections';
import { Button, SectionBg } from '@components/shared';
import { MarketType } from '@domain/enums';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './Products.scss';
import { ITableSection, TableSection } from './tableSection/TableSection';

export function Products() {
  const [activeSection, selectedSection] = useState('forex');
  const sectionRefs: { [key: string]: RefObject<any> } = Object.keys(MarketType).reduce(
    (acc, key) => Object.assign(acc, { [key]: useRef<HTMLDivElement>(null) }),
    {},
  );
  let { location, replace }: any = useHistory();
  const { t } = useTranslation();

  const headerNavigation: { label: string; anchor: MarketType }[] = [
    { label: t('Forex'), anchor: MarketType.forex },
    { label: t('Stocks'), anchor: MarketType.stocks },
    { label: t('Indices'), anchor: MarketType.indices },
    { label: t('Cryptocurrencies'), anchor: MarketType.crypto },
    { label: t('Commodities'), anchor: MarketType.commodities },
    { label: t('ETFs'), anchor: MarketType.etfs },
  ];

  const tableSections: ITableSection[] = [
    {
      title: t('Forex'),
      desc: t('Product Section Forex Desc'),
      tableType: MarketType.forex,
      points: [
        <>
          {t('Spreads from')} <b>0.2 {t('pips')}</b>
        </>,
        <>
          {t('Max Leverage')} <b>1:200</b>
        </>,
        <>
          {t('Margins from just')} <b>0.50%</b>
        </>,
      ],
    },
    {
      title: t('Stocks'),
      desc: t('Product Section Stocks Desc'),
      tableType: MarketType.stocks,
      reversed: true,
      points: [
        <>
          {t('Max Leverage')} <b>1:20</b>
        </>,
        <>
          {t('Margins from just')} <b>5%</b>
        </>,
      ],
    },
    {
      title: t('Indices'),
      desc: t('Product Section Indices Desc'),
      tableType: MarketType.indices,
      points: [
        <>
          <b>15+</b> {t('Most Popular Indices Worldwide')}
        </>,
        <>
          {t('Max Leverage')} <b>1:200</b>
        </>,
      ],
    },
    {
      title: t('Cryptocurrencies'),
      desc: t('Product Section Cryptocurrencies Desc'),
      tableType: MarketType.crypto,
      reversed: true,
      points: [
        <>
          {t('Max Leverage')} <b>1:20</b>
        </>,
        <>
          <b>5</b> {t('Main Cryptocurrencies')}
        </>,
      ],
    },
    {
      title: t('Commodities'),
      desc: t('Product Section Commodities Desc'),
      tableType: MarketType.commodities,
      points: [
        <>
          {t('Max Leverage')} <b>1:133</b>
        </>,
      ],
    },
    {
      title: t('ETFs'),
      desc: t('Product Section ETFs Desc'),
      tableType: MarketType.etfs,
      reversed: true,
      points: [
        <>
          {t('Max Leverage')} <b>1:20</b>
        </>,
      ],
    },
  ];

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        navigateToSection(location.state?.scrollTo)();
        const state = { ...location.state };
        delete state.scrollTo;
        replace(location.pathname, state);
      }, 10);
    }
  }, [location]);

  function navigateToSection(type: MarketType) {
    return (e?: any) => {
      selectedSection(type);
      sectionRefs[type].current.scrollIntoView({ behavior: 'smooth' });
    };
  }

  return (
    <div className="product-wrapper">
      <section className="page-top">
        <SectionBg img="product-page-top.jpg" />
        <div className="container pt-17">
          <div className="row mb-10">
            <div className="col-lg-7">
              <div className="page-top__title mb-5 mb-lg-7">{t('Range of Markets')}</div>
            </div>
          </div>
          <div className="row mx-n1">
            {headerNavigation.map((navBtn, n) => (
              <div key={n} className="col-6 col-md-4 col-lg-2 px-1 mb-5 mb-lg-0">
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
      {tableSections.map((sectionProps, s) => (
        <TableSection key={s} {...sectionProps} ref={sectionRefs[sectionProps.tableType]} />
      ))}
      <OpenLiveAccountBannerSection />
    </div>
  );
}
