import { Button, Img, LocaleLink } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './PrestigiousPlatformTechnology.scss';

export const PrestigiousPlatformTechnologySection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function PrestigiousPlatformTechnologySection(
    props,
    ref,
  ) {
    const { t } = useTranslation();

    return (
      <section className={classNames('prestigious-platform-technology', props.className)} ref={ref}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="mt-md-12 mt-lg-0 mb-12 mt-md-0">
              <div className="prestigious-platform-technology__title mb-7">
                {t('Prestigious MT5')} <br />
                <b>{t('Platform Technology')}</b>
              </div>
              <div className="prestigious-platform-technology__description mb-10">
                <div className="mb-6">
                  {t('Prestigious MT5 Section Desc:0')} <b>{t('Prestigious MT5 Section Desc:1')}</b>{' '}
                  {t('Prestigious MT5 Section Desc:2')}
                </div>
                <div className="mb-6">{t('Prestigious MT5 Section Desc:3')}</div>
                <div>
                  {t('Prestigious MT5 Section Desc:4')} <b>{t('Prestigious MT5 Section Desc:5')}</b>{' '}
                  {t('Prestigious MT5 Section Desc:6')}
                </div>
              </div>
              <Button>
                <LocaleLink to="/registration">{t('Open Live Account')}</LocaleLink>
              </Button>
            </Col>
            <Col xs={12} lg={6}>
              <Img src="platform_devices.jpg" />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
