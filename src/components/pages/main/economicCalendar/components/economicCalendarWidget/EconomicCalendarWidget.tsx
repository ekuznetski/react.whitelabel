import { useTranslation } from 'react-i18next';
import React, { createRef, memo, useEffect } from 'react';
import './EconomicCalendarWidget.scss';

export const EconomicCalendarWidget = memo(function EconomicCalendarWidget() {
  const { t } = useTranslation();
  const widgetContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      isTransparent: false,
      width: '100%',
      height: '100%',
      locale: 'en',
      importanceFilter: '-1,0,1',
    });
    widgetContainerRef.current?.appendChild(script);
  }, []);

  return (
    <section className="economic-calendar-wrapper__ratios">
      <div className="container">
        <div className="row">
          <div className="tradingview-widget-container col">
            <div className="tradingview-widget-container__widget" ref={widgetContainerRef}></div>
            <div className="tradingview-widget-copyright">
              <a
                href="https://www.tradingview.com/markets/currencies/economic-calendar/"
                rel="noopener"
                target="_blank"
              >
                <span className="blue-text">Economic Calendar </span>
              </a>
              by TradingView
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
