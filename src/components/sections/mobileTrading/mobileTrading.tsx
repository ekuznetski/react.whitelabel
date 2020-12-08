import { Button, Img, LabelView, Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { config } from './MobileTrading.config';
import './mobileTrading.scss';

interface MobileTradingSectionProps {
  title?: string | React.ReactFragment;
  description?: string | React.ReactFragment;
  className?: string;
}

export const MobileTradingSection = memo(
  forwardRef<HTMLDivElement, MobileTradingSectionProps>(function MobileTradingSection(
    { title, description, className },
    ref,
  ) {
    const { t } = useTranslation();

    return (
      <section className={classNames('mobile-trading', className)}>
        <Container>
          <Row>
            <Col xs={12} lg={5} className="mb-12 mb-lg-0 mt-12 mb-md-0">
              <Img src="mobile_trading.jpg" />
            </Col>
            <Col xs={12} lg={6} className="offset-lg-1 pt-lg-10 pr-lg-6">
              <div className="mobile-trading__title mb-7">
                {title || (
                  <LabelView>
                    {{
                      '*': (
                        <Trans i18nKey="Mobile Trading Section Title">
                          <b>Mobile Trading</b>
                          <br />
                          With MT5
                        </Trans>
                      ),
                      [ELabels.bsfx]: (
                        <Trans i18nKey="Mobile Trading Section Title">
                          <b>Mobile Trading</b>
                          <br />
                          With MT4
                        </Trans>
                      ),
                    }}
                  </LabelView>
                )}
              </div>
              <div className="mobile-trading__description mb-10">
                {description || (
                  <LabelView>
                    {{
                      '*': (
                        <Trans i18nKey="Mobile Trading Section Desc">
                          <div className="mb-6">
                            Have complete control over your account with our native mobile app; open, close, and manage
                            trading positions from your mobile phone.
                          </div>
                          <div className="mb-6">
                            Download MetaTrader 5 for Android/iOS on your smartphone or tablet and trade Forex anytime
                            and anywhere in the world!
                          </div>
                        </Trans>
                      ),
                      [ELabels.bsfx]: (
                        <Trans i18nKey="Mobile Trading Section Desc">
                          <div className="mb-6">
                            Have complete control over your account with our native mobile app; open, close, and manage
                            trading positions from your mobile phone.
                          </div>
                          <div className="mb-6">
                            Download MetaTrader 4 for Android/iOS on your smartphone or tablet and trade Forex anytime
                            and anywhere in the world!
                          </div>
                        </Trans>
                      ),
                    }}
                  </LabelView>
                )}
              </div>
              <div className="store-links">
                <Button className="mr-md-6 px-7 mb-7 mb-md-0">
                  <a href={config.appStoreLink}>
                    <Svg href="app_store_logo" />
                  </a>
                </Button>
                <Button className="mr-md-6 px-7">
                  <a href={config.googlePlayLink}>
                    <Svg href="google_play_logo" />
                  </a>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
