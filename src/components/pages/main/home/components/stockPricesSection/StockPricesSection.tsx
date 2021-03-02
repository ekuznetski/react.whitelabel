import { Col, Container, Img, LocaleLink, Row, Svg } from '@components/shared';
import { EAssetClass, EPagePath } from '@domain/enums';
import { IPriceCarouselItem, IPriceTabInfo, IPriceTabItem, IPriceTabMenu, IPrices } from '@domain/interfaces';
import { config } from '@pages/main/home';
import { IStore, ac_fetchPrices } from '@store';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { createRef, forwardRef, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Area, AreaChart } from 'recharts';
import './StockPricesSection.scss';

interface IStockPricesSectionProps {
  className?: string;
}

export const StockPricesSection = memo(function StockPricesSection(props: IStockPricesSectionProps) {
  const { prices } = useSelector<IStore, { prices: IPrices }>((state) => ({
    prices: state.data.prices,
  }));
  const [priceTabs, setPriceTabs] = useState<IPriceTabItem[] | []>(generatePriceTabs());
  const [activePriceTab, setActivePriceTab] = useState<IPriceTabItem | null>();
  const responsive = useResponsive();
  const dispatch = useDispatch();

  useEffect(() => {
    setActivePriceTab(priceTabs[0]);
    const fetchPricesInterval = setInterval(() => {
      dispatch(ac_fetchPrices());
    }, 5000);
    return function () {
      clearInterval(fetchPricesInterval);
    };
  }, []);

  useEffect(() => {
    if (prices) {
      setPriceTabs(generatePriceTabs());
    }
  }, [prices]);

  function generatePriceTabs(): IPriceTabItem[] {
    return prices
      ? config.priceSectionTabs
          .filter((item) => prices[item.anchor])
          .map((item) => {
            item.priceData = generatePriceData(prices[item.anchor]);
            return item;
          })
      : [];
  }

  return activePriceTab ? (
    <section className={classNames('stocks', props.className)}>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="stock-prices">
              <>
                {config.priceSectionCarousel.showInfo(responsive) && (
                  <StockPricesInfo
                    {...(activePriceTab.info as IPriceTabInfo)}
                    anchor={activePriceTab.anchor}
                    icon={activePriceTab.icon}
                  />
                )}
                <div className="stock-prices__content py-0 py-lg-11">
                  <StockPricesMenu items={priceTabs} activeTab={activePriceTab} selectTab={setActivePriceTab} />
                  {!config.priceSectionCarousel.showInfo(responsive) && (
                    <StockPricesInfo
                      {...(activePriceTab.info as IPriceTabInfo)}
                      anchor={activePriceTab.anchor}
                      icon={activePriceTab.icon}
                    />
                  )}
                  <StockPricesChartCarousel {...activePriceTab} currentAsset={activePriceTab.anchor} />
                </div>
              </>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  ) : null;
});

function StockPricesInfo({ icon, title, desc, points, anchor }: IPriceTabInfo) {
  const { t } = useTranslation();

  return (
    <div className="stock-prices-item__info pt-9 pt-lg-11 pb-0 pb-lg-11 pl-11 pl-lg-9 pl-xl-11">
      <div className="stock-prices-item__info-title mb-6">
        <Svg href={icon} width={50} height={50} className="mr-5 d-lg-none d-xl-inline" />
        {title}
      </div>
      <div className="stock-prices-item__info-description mb-6 pr-15 pr-lg-8 pr-xl-15">{desc}</div>
      <div className="stock-prices-item__info-points">
        {points.map((point, p) => (
          <div key={p} className="stock-prices-item__info-points-item">
            {point}
          </div>
        ))}
      </div>
      <LocaleLink className="see-all" to={{ pathname: EPagePath.Products, state: { scrollTo: anchor } }}>
        {t('See all products')}
        <Svg href="chevron_right" className="ml-1" />
      </LocaleLink>
    </div>
  );
}

function StockPricesMenu({ items, activeTab, selectTab }: IPriceTabMenu) {
  const [lineProps, setLineProps] = useState<{ [k: string]: any }>();
  const menuRef = createRef<HTMLDivElement>();
  let activeMenuItemRef: any = createRef();
  const responsive = useResponsive();

  useEffect(() => {
    if (activeMenuItemRef) {
      if (menuRef.current) {
        menuRef.current.scrollLeft =
          activeMenuItemRef.offsetLeft - menuRef.current.offsetWidth / 2 + activeMenuItemRef.offsetWidth / 2;
      }
      setLineProps({ width: activeMenuItemRef.clientWidth, left: activeMenuItemRef.offsetLeft });
    }
  }, [activeTab.anchor, responsive]);

  return (
    <div className="stock-prices-menu" ref={menuRef}>
      <div className="stock-prices-wrapper px-7">
        {items.map((item, i) => (
          <div
            key={i}
            className={classNames(
              'stock-prices-menu__item',
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
          <div className="stock-prices-menu__line" style={{ left: lineProps?.left, width: lineProps?.width + 'px' }} />
        )}
      </div>
    </div>
  );
}

function StockPricesChartCarousel({ priceData, currentAsset }: IPriceTabItem & { currentAsset: EAssetClass }) {
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
    if (wrapper.current && _item.current) {
      wrapper.current.style.width =
        _item.current.clientWidth * config.priceSectionCarousel.slidesPerView(responsive) + 'px';
    }
  }, [responsive]);

  useEffect(() => {
    setActiveIndex(0);
  }, [currentAsset]);

  return (
    <div className="stock-prices-item__carousel">
      <div
        className={classNames('carousel-left', activeIndex == 0 && 'disabled')}
        onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
      >
        <Svg href="chevron_left" width={30} height={30} />
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
        <Svg href="chevron_right" width={30} height={30} />
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
          {config.priceSectionChartSettings.showAssetIcon && (
            <Img src={`assets/${props.name.replace(/\W/g, '')}.png`} className={'assets-icon'} />
          )}
          <div className="title mb-1">{props.name}</div>
          <div className="variation">
            <Svg
              href={props.variation >= 0 ? 'arrow_up' : 'arrow_down'}
              className={props.variation >= 0 ? 'up' : 'down'}
            />
            {props.variation}%
          </div>
        </div>
        <div className="carousel-item__bid-ask">
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
          <AreaChart
            width={config.priceSectionChartSettings.width}
            height={config.priceSectionChartSettings.height}
            margin={config.priceSectionChartSettings.margin}
            data={_data}
            baseValue={0}
          >
            <defs>
              <linearGradient id={`color_${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                <stop offset="60%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="p" stroke={color} fill={`url(#color_${color})`} animationDuration={450} />
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
