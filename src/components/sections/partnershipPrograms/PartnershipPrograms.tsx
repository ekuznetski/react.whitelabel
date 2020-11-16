import { Button, Card, CardContent, CardHeader, Cards, Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { AnyFunction } from '@domain/interfaces';
import './PartnershipPrograms.scss';

export interface ISelect {
  onNavigate: AnyFunction;
}

export const PartnershipPrograms = memo(
  forwardRef<HTMLDivElement, ISelect & React.HTMLAttributes<HTMLDivElement>>(function PartnershipPrograms(props, ref) {
    const { t } = useTranslation();

    const programPoints = {
      affiliate: [
        t('Mobile optimised marketing tools'),
        t('Dedicated affiliate manager'),
        t('Round-the-clock access to all your analytics'),
      ],
      brokers: [
        t('Multi-level marketing rebate tiers'),
        t('Free market reviews for clients'),
        t('Customisable marketing and advertising tools'),
        t('Local office and events support'),
      ],
    };

    const onProgramSelect = (program: string) => () => {
      props?.onNavigate?.(program);
    };

    return (
      <section className={classNames('partnership-programs-styles-section', props.className)} ref={ref}>
        <div className="container">
          <div className="row">
            <div className="col-12 partnership-programs-styles-section__header">
              <div className="partnership-programs-styles-section__title mb-4">
                <Trans i18nKey="Programs Section Title">
                  <strong>CUSTOM-MADE</strong> FOR YOU
                </Trans>
              </div>
              <div className="partnership-programs-styles-section__description mb-13">{t('Programs Section Desc')}</div>
            </div>
            <div className="col-12 p-0">
              <Cards id="partnershipProgramsStylesSectionCards">
                <Card wrapperClassName="card col-12 col-md-6 col-lg-4 mb-7 mb-md-0" uid={1}>
                  <CardHeader className="mb-7 header">
                    <div>
                      <Svg href="affiliate" _label={ELabels.bsfx} className="mr-5" />
                      {t('Affiliate Program')}
                    </div>
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="common-cards__item-content-points">
                      {programPoints.affiliate.map((point) => (
                        <div className="common-cards__item-content-points__item">{point}</div>
                      ))}
                    </div>
                    <Button onClick={onProgramSelect('affiliate')}>{t('Sign Up')}</Button>
                  </CardContent>
                </Card>
                <Card wrapperClassName="card col-12 col-md-6 col-lg-4 mb-7 mb-md-0" uid={2}>
                  <CardHeader className="mb-7 header">
                    <div>
                      <Svg href="brokers" _label={ELabels.bsfx} className="mr-5" />
                      {t('Introducing Brokers')}
                    </div>
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="common-cards__item-content-points">
                      {programPoints.brokers.map((point) => (
                        <div className="common-cards__item-content-points__item">{point}</div>
                      ))}
                    </div>
                    <Button onClick={onProgramSelect('ib')}>{t('Sign Up')}</Button>
                  </CardContent>
                </Card>
              </Cards>
            </div>
          </div>
        </div>
      </section>
    );
  }),
);
