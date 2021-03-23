import { Img, LocaleLink, Svg, Tab, Table, Tabs } from '@components/shared';
import { EAssetsIcons, EPagePath } from '@domain/enums';
import { IPrices } from '@domain/interfaces';
import { IStore } from '@store';
import { capitalize } from '@utils/fn';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Area, AreaChart } from 'recharts';
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
                Use our platform to monitor and trade <b>CFD</b>s for the global financial markets including
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'currencies' } }}>Forex</LocaleLink>,
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'stocks' } }}>Stocks</LocaleLink>,
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'indices' } }}>Indices</LocaleLink>,
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'commodities' } }}>
                  Commodities
                </LocaleLink>
                and
                <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'crypto' } }}>
                  Digital assets
                </LocaleLink>
                .
              </Trans>
            </div>
          </div>
          <div className="col-12">
            <Tabs>
              {!prices && <div>Prices can't be loaded</div>}
              {prices &&
                Object.keys(prices)?.map((asset) => {
                  const rowData = Object.keys(prices[asset])
                    .map((item) => {
                      // @ts-ignore
                      const _asset = prices[asset][item];
                      return [...Object.values<string | React.ReactFragment>(_asset.details), _asset.points];
                    })
                    .map((item) => {
                      const variation = item[3] >= 0;
                      const color = variation ? '#40D9A2' : '#EC3838';

                      const _data = item[4]
                        .split(',')
                        .map((el: any) => el.split(' ')[1])
                        .map((p: any) => ({ p: p / 1 }));

                      item[5] = (
                        <AreaChart className="assets-chart" width={98} height={40} baseValue={0} data={_data}>
                          <Area type="monotone" dataKey="p" stroke={color} fill={'#fff'} animationDuration={450} />
                        </AreaChart>
                      );

                      item[4] = (
                        <>
                          <Svg
                            href={variation ? 'arrow_up' : 'arrow_down'}
                            className={`assets-variation ${variation ? 'up' : 'down'}`}
                          />
                          {item[3]}%
                        </>
                      );

                      item[1] = item[0];

                      item[0] = (
                        <Img
                          src={`assets/${EAssetsIcons[((item[0] as string).trim() as unknown) as number]}.png`}
                          className={'assets-icon'}
                        />
                      );

                      return item;
                    });

                  return (
                    <Tab key={asset} label={t(capitalize(asset))} anchor={asset}>
                      <Table
                        key={asset}
                        headers={['', t('Instrument'), t('Sell'), t('Buy'), t('Change percent'), '']}
                        rows={rowData}
                        colsSize={['80px', 'auto', '17%', '17%', '15%', '140px']}
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
