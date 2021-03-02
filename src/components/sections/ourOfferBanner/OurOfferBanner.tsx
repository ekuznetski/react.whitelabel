import { LabelView, Svg } from '@components/shared';
import { assetsCharacteristics } from '@domain';
import { EAssetClass, ELabels } from '@domain/enums';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { Trans, useTranslation } from 'react-i18next';
import './OurOfferBanner.scss';

export const OurOfferBannerSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function OurOfferBannerSection(props, ref) {
    const { t } = useTranslation();

    return (
      <section className={classNames('our-offer-banner-section', props.className)} ref={ref}>
        <Container>
          <Row>
            <Col xs={12} md={4} className="py-8">
              <Svg href="zero_pct" height={48} className="mr-5 mb-md-4 mb-lg-0" />
              {t('Zero Deposit Fees')}
            </Col>
            <Col xs={12} md={4} className="py-8">
              <Svg href="graph" height={48} className="mr-5 mb-md-4 mb-lg-0" />
              <LabelView>
                {{
                  '*': (
                    <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.forex].leverage }}>
                      Max. Leverage <b>1:200</b>
                    </Trans>
                  ),
                  [ELabels.bsfx]: t('# Max Leverage', { val: '1:500' }),
                }}
              </LabelView>
            </Col>
            <Col xs={12} md={4} className="py-8">
              <Svg href="gear_24hr" height={48} className="mr-5 mb-md-4 mb-lg-0" />
              {t('24 5 Customer Support')}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
