import { LocaleLink, Tab, Table, Tabs } from '@components/shared';
import { EPagePath } from '@domain/enums';
import { IPrices } from '@domain/interfaces';
import { IStore } from '@store';
import { capitalize } from '@utils/fn';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './AssetsSection.scss';

export const AssetsSection = memo(function AssetsSection() {
  const { prices } = useSelector<IStore, { prices: IPrices }>((state) => ({
    prices: state.data.prices,
  }));
  const { t } = useTranslation();

  return (
    <section className="platform-wrapper__assets">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className="assets__title mb-7">
              <Trans i18nKey="Assets Title">
                <strong>6</strong> Asset Classes, <strong>150+</strong> Instruments
              </Trans>
            </div>
            <div className="assets__description mb-md-13">
              <Trans i18nKey="Assets SubTitle">
                CFD for
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'currencies' } }}>
                  Currencies
                </LocaleLink>
                ,<LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'stocks' } }}>Stocks</LocaleLink>,
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'indices' } }}>Indices</LocaleLink>,
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'commodities' } }}>
                  Commodities
                </LocaleLink>{' '}
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'crypto' } }}>
                  Digital assets
                </LocaleLink>{' '}
                at your service on one trading account. Monitor and trade the world’s largest financial markets!
              </Trans>
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <Tabs>
              {!prices && <div>Prices can't be loaded</div>}
              {prices &&
                Object.keys(prices)?.map((asset) => {
                  const rowData = Object.keys(prices[asset]).map((item) =>
                    // @ts-ignore
                    Object.values(prices[asset][item].details),
                  );
                  return (
                    <Tab key={asset} label={t(capitalize(asset))} anchor={asset}>
                      <Table
                        key={asset}
                        headers={[t('Instrument'), t('Sell'), t('Buy'), t('Change percent')]}
                        rows={rowData as string[][]}
                        colsSize={['30%', '25%', '25%', '20%']}
                        preview
                      />
                    </Tab>
                  );
                })}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
});
