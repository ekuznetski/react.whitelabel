import { LocaleLink, Svg } from '@components/shared';
import { MarketType } from '@domain/enums';
import { usePathLocale } from '@utils/hooks';
import { useDebounceFn, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { createRef, forwardRef, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Area, AreaChart } from 'recharts';
import { IPriceCarouselItem, IPriceTabInfo, IPriceTabItem, IPriceTabMenu } from '../home.interface';
import { priceRawData } from './price_data';
import './StockPrices.scss';

export function StockPrices() {
  const [activePriceTab, setPriceTab] = useState<IPriceTabItem | null>();
  const responsive = useResponsive();
  const { t } = useTranslation();

  const priceTabs: IPriceTabItem[] = [
    {
      name: 'Forex',
      icon: 'filter.svg',
      anchor: MarketType.forex,
      info: {
        title: t('Number Of Markets', { num: '40', sign: '+', market: t('Forex') }),
        desc: t('Product Section Forex Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ text: '$t(Max Leverage)', val: '1:200' }}>
            Max. Leverage <b></b>
          </Trans>,
        ],
      },
      priceData: generatePriceData(priceRawData.Forex),
    },
    {
      name: 'Stocks',
      icon: 'graph_bars.svg',
      anchor: MarketType.stocks,
      info: {
        title: t('Number Of Markets', { num: '40', sign: '+', market: t('Stocks') }),
        desc: t('Product Section Stocks Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ text: '$t(Max Leverage)', val: '1:20' }}>
            Max. Leverage <b></b>
          </Trans>,
        ],
      },
      priceData: generatePriceData(priceRawData.Stocks),
    },
    {
      name: 'Indices',
      icon: 'indices.svg',
      anchor: MarketType.indices,
      info: {
        title: t('Indices'),
        desc: t('Product Section Indices Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ text: '$t(Max Leverage)', val: '1:200' }}>
            Max. Leverage <b></b>
          </Trans>,
        ],
      },
      priceData: generatePriceData(priceRawData.Indices),
    },
    {
      name: 'Commodities',
      icon: 'commodities.svg',
      anchor: MarketType.commodities,
      info: {
        title: t('Commodities'),
        desc: t('Product Section Commodities Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ text: '$t(Max Leverage)', val: '1:133' }}>
            Max. Leverage <b></b>
          </Trans>,
        ],
      },
      priceData: generatePriceData(priceRawData.Commodities),
    },
    {
      name: 'Cryptocurrencies',
      icon: 'crypto.svg',
      anchor: MarketType.crypto,
      info: {
        title: t('Cryptocurrencies'),
        desc: t('Product Section Cryptocurrencies Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ text: '$t(Max Leverage)', val: '1:20' }}>
            Max. Leverage <b></b>
          </Trans>,
        ],
      },
      priceData: generatePriceData(priceRawData.Crypto),
    },
  ];

  useEffect(() => {
    setPriceTab(priceTabs[0]);
  }, []);

  return (
    <div className="stockPrices">
      {activePriceTab ? (
        <>
          {responsive.lg && (
            <StockPricesInfo
              {...(activePriceTab.info as IPriceTabInfo)}
              anchor={activePriceTab.anchor}
              icon={activePriceTab.icon}
            />
          )}
          <div className="stockPrices__content py-0 py-lg-11">
            <StockPricesMenu items={priceTabs} activeTab={activePriceTab} selectTab={setPriceTab} />
            {!responsive.lg && (
              <StockPricesInfo
                {...(activePriceTab.info as IPriceTabInfo)}
                anchor={activePriceTab.anchor}
                icon={activePriceTab.icon}
              />
            )}
            <StockPricesChartCarousel {...activePriceTab} />
          </div>
        </>
      ) : null}
    </div>
  );
}

function StockPricesInfo({ icon, title, desc, points, anchor }: IPriceTabInfo) {
  const { localizePath } = usePathLocale();
  const { t } = useTranslation();

  return (
    <div className="stockPrices-item__info pt-9 pt-lg-11 pb-0 pb-lg-11 pl-11 pl-lg-9 pl-xl-11">
      <div className="stockPrices-item__info-title mb-6">
        <Svg href={icon} width={50} height={50} className="mr-5 d-lg-none d-xl-inline" />
        {title}
      </div>
      <div className="stockPrices-item__info-description mb-6 pr-15 pr-lg-8 pr-xl-15">{desc}</div>
      <div className="stockPrices-item__info-points">
        {points.map((point, p) => (
          <div key={p} className="stockPrices-item__info-points-item">
            {point}
          </div>
        ))}
      </div>
      <LocaleLink className="see-all" to={{ pathname: '/products', state: { scrollTo: anchor } }}>
        {t('See all products')}
        <Svg href="chevron_right.svg" className="ml-1" />
      </LocaleLink>
    </div>
  );
}

function StockPricesMenu({ items, activeTab, selectTab }: IPriceTabMenu) {
  const [lineProps, setLineProps] = useState<{ [k: string]: any }>();
  const menuRef = createRef<HTMLDivElement>();
  let activeMenuItemRef: any = createRef();
  const responsive = useResponsive();
  const { run } = useDebounceFn(
    () => {
      if (activeMenuItemRef) {
        if (menuRef.current) {
          menuRef.current.scrollLeft =
            activeMenuItemRef.offsetLeft - menuRef.current.offsetWidth / 2 + activeMenuItemRef.offsetWidth / 2;
        }
        setLineProps({ width: activeMenuItemRef.clientWidth, left: activeMenuItemRef.offsetLeft });
      }
    },
    { wait: 0 },
  );

  useEffect(run, [activeTab.anchor, responsive]);

  return (
    <div className="stockPrices-menu" ref={menuRef}>
      <div className="stockPrices-wrapper px-7">
        {items.map((item, i) => (
          <div
            key={i}
            className={classNames(
              'stockPrices-menu__item',
              i != items.length - 1 && 'mr-9',
              activeTab.anchor === item.anchor && 'active',
            )}
            onClick={() => selectTab(item)}
            ref={(ref) => activeTab.anchor === item.anchor && (activeMenuItemRef = ref)}
          >
            <Svg href={item.icon} width={20} className="mr-3" />
            {item.name}
          </div>
        ))}
        {lineProps && (
          <div
            className="stockPrices-menu__line"
            style={{ left: lineProps?.left, width: lineProps?.width + 'px' }}
          ></div>
        )}
      </div>
    </div>
  );
}

function StockPricesChartCarousel({ priceData }: IPriceTabItem) {
  const [activeIndex, setActiveIndex] = useState(0);
  const _item = createRef<HTMLDivElement>();
  const wrapper = createRef<HTMLDivElement>();
  const container = createRef<HTMLDivElement>();
  const responsive = useResponsive();

  useEffect(() => {
    if (container.current && _item.current) {
      container.current.style.left = activeIndex * -_item.current.offsetWidth + 'px';
    }
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
    if (wrapper.current && _item.current) {
      wrapper.current.style.width = _item.current.clientWidth * (responsive.md ? 3 : responsive.sm ? 2 : 1) + 'px';
    }
  }, [priceData, responsive]);

  return (
    <div className="stockPrices-item__carousel">
      <div
        className={classNames('carousel-left', activeIndex == 0 && 'disabled')}
        onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
      >
        <Svg href="chevron_left.svg" width={30} height={30} />
      </div>
      <div className="carousel-wrapper" ref={wrapper}>
        <div className="carousel-container" ref={container}>
          {priceData.map((carousel, c) => (
            <StockPricesChartCarouselItem
              {...carousel}
              key={c}
              ref={c === 0 ? _item : null}
              active={c >= activeIndex && c < activeIndex + 3}
            />
          ))}
        </div>
      </div>
      <div
        className={classNames('carousel-right', activeIndex == priceData.length - 3 && 'disabled')}
        onClick={() => activeIndex < priceData.length - 3 && setActiveIndex(activeIndex + 1)}
      >
        <Svg href="chevron_right.svg" width={30} height={30} />
      </div>
    </div>
  );
}

const StockPricesChartCarouselItem = forwardRef((props: IPriceCarouselItem, ref: any) => {
  const { t } = useTranslation();
  const color = props.variation >= 0 ? '#40D9A2' : '#EC3838';
  const _data = props.points.map((p) => ({ p: p / 1 }));

  return (
    <div className="carousel-item-wrapper" ref={ref}>
      <div className={classNames('carousel-item', props.className, props.active && 'active')}>
        <div className="carousel-item__header p-4">
          <div className="title mb-1">{props.name}</div>
          <div className="variation">
            <Svg
              href={props.variation >= 0 ? 'arrow_up.svg' : 'arrow_down.svg'}
              width={20}
              height={20}
              className={props.variation >= 0 ? 'up' : 'down'}
            />
            {props.variation}%
          </div>
        </div>
        <div className="carousel-item__bid_ask">
          <div className="bid px-6">
            <div className="label">{t('Bid')}</div>
            <div className="amount">{props.bid}</div>
          </div>
          <div className="ask px-6">
            <div className="label">{t('Ask')}</div>
            <div className="amount">{props.ask}</div>
          </div>
        </div>
        <div className="carousel-item__chart">
          <AreaChart width={180} height={115} data={_data} margin={{ top: 40 }} baseValue={0}>
            <Area type="monotone" dataKey="p" stroke={color} fill={color} animationDuration={450} />
          </AreaChart>
        </div>
      </div>
    </div>
  );
});

function generatePriceData(_data: any): IPriceCarouselItem[] {
  return Object.keys(_data).reduce((acc: any, key) => {
    // @ts-ignore
    const _value: any = _data[key];
    acc.push({
      ..._value.details,
      points: _value.points.split(',').map((el: any) => el.split(' ')[1]),
    });
    return acc;
  }, []);
}
