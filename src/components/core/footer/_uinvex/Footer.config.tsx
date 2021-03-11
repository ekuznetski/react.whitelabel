import i18n from '@i18next';
import React from 'react';
import { Col, Img } from '@components/shared';
import { Trans } from 'react-i18next';
import { ELabels, EPagePath } from '@domain/enums';
import { config as _config } from '@core/footer/Footer.config';
const t = i18n.getLazyT;

export const config = {
  ..._config,
  documents: [
    {
      name: t('Legal Forms and Documents'),
      link: '',
    },
    {
      name: t('Risk Warnings'),
      link: '',
    },
    {
      name: t('Cookies Policy'),
      link: '',
    },
  ],
  context: {
    auth: (
      <Col xs={12} className="context">
        <span className="mr-2">{t('High Risk Investment Warning')}</span>
        {t('High Risk Investment Warning Portal Desc')}
      </Col>
    ),
    main: (
      <>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <span className="mr-2">{t('High Risk Investment Warning')}</span>
          {t('High Risk Investment Warning Main Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <span className="mr-2">{t('Disclaimer')}:</span>
          {t('Disclaimer Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <span className="mr-2">{t('Regional Restrictions')}:</span>
          <Trans i18nKey="Regional Restrictions Desc">
            Regional Restrictions Desc
            <a className="ml-2">{t('Help Center')}</a>
          </Trans>
        </Col>
      </>
    ),
    portal: (
      <Col xs={12} className="context">
        <span className="mr-2">{t('High Risk Investment Warning')}</span>
        {t('High Risk Investment Warning Portal Desc')}
      </Col>
    ),
  },
  copyright: {
    auth: (
      <Col xs={12}>
        <Img src="CJ.png" _label={ELabels.uinvex} />
        {t('Footer Authorized')}
      </Col>
    ),
    main: (
      <Col xs={12}>
        <Img src="CJ.png" _label={ELabels.uinvex} />
        {t('Footer Authorized')}
      </Col>
    ),
    portal: (
      <Col xs={12}>
        <Img src="CJ.png" _label={ELabels.uinvex} />
        {t('Footer Authorized')}
      </Col>
    ),
  },
};
