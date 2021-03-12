import { ELanguage } from '@domain/enums';
import { IAppStore, IStore } from '@store';
import React, { createRef, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './EconomicCalendarWidget.scss';

export const EconomicCalendarWidget = memo(function EconomicCalendarWidget() {
  const { locale } = useSelector<IStore, { locale: ELanguage }>((state) => ({
    locale: state.app.route.locale,
  }));
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
      locale: locale,
      importanceFilter: '-1,0,1',
    });
    widgetContainerRef.current?.appendChild(script);
  }, []);

  return (
    <section className="economic-calendar-wrapper__widget">
      <div className="container">
        <div className="row">
          <div className="tradingview-widget-container col">
            <div className="tradingview-widget-container__widget" ref={widgetContainerRef}></div>
          </div>
        </div>
      </div>
    </section>
  );
});
