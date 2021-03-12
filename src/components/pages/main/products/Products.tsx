import { OpenLiveAccountBannerSection } from '@components/sections';
import { EAssetClass } from '@domain/enums';
import React, { useRef } from 'react';
import { config } from './';
import { IProductsTopSectionProps, TableSection, TopSection } from './components';
import './Products.scss';

export function Products() {
  const sectionRefs: IProductsTopSectionProps['sectionRefs'] = Object.keys(EAssetClass).reduce(
    (acc, key) => Object.assign(acc, { [key]: useRef<HTMLDivElement>(null) }),
    {},
  );

  return (
    <div className="product-wrapper">
      <TopSection sectionRefs={sectionRefs} />
      {config.tableSections.map((sectionProps, s) => (
        <TableSection key={s} {...sectionProps} ref={sectionRefs[sectionProps.tableType]} />
      ))}
      <OpenLiveAccountBannerSection />
    </div>
  );
}
