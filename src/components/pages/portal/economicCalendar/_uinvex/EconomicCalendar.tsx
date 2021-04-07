import { Col, Container, PageTitle, Placeholder, Row } from '@components/shared';
import { ELanguage } from '@domain/enums';
import { IStore } from '@store';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './EconomicCalendar.scss';

export const EconomicCalendar = memo(function EconomicCalendar() {
  const { locale } = useSelector<IStore, { locale: ELanguage }>((state) => ({
    locale: state.app.route.locale,
  }));
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

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
    script.addEventListener('load', () => {
      setLoading(false);
    });
    widgetContainerRef.current?.appendChild(script);
  }, []);

  return (
    <div className="economic-calendar-wrapper">
      <Container>
        <Row>
          <Col xs={12}>
            <PageTitle title={t('Economic Calendar')} />
          </Col>
        </Row>
        <Row>
          <Col className="tradingview-widget-container">
            <div className="tradingview-widget" ref={widgetContainerRef}>
              {loading && <Placeholder text={t('Loading Calendar..')} />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
});
