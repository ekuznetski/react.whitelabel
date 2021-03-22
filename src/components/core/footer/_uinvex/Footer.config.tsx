import { Col } from '@components/shared';
import { config as _config } from '@core/footer/Footer.config';
import { EPagePath } from '@domain/enums';
import i18n from '@i18next';
import React from 'react';
const t = i18n.getLazyT;

export const config = {
  ..._config,
  socialMediaLinks: [],
  documents: [
    {
      name: t('Legal Forms and Documents'),
      link: EPagePath.LegalForms,
    },
    {
      name: t('Risk Warnings'),
      link: EPagePath.RiskWarnings,
    },
    {
      name: t('Cookies Policy'),
      link: EPagePath.Cookies,
    },
  ],
  context: {
    auth: (
      <Col xs={12} className="context">
        <b className="mr-2">{t('High Risk Investment Warning')}</b>
        {t('High Risk Investment Warning Portal Desc')}
      </Col>
    ),
    main: (
      <>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('High Risk Investment Warning')}</b>
          {t('High Risk Investment Warning Main Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('Disclaimer')}:</b>
          {t('Disclaimer Desc')}
        </Col>
      </>
    ),
    portal: (
      <Col xs={12} className="context">
        <b className="mr-2">{t('High Risk Investment Warning')}</b>
        {t('High Risk Investment Warning Portal Desc')}
      </Col>
    ),
  },
  copyright: {
    auth: (
      <>
        <Col xs={12}>{t('Footer Authorized:0')}</Col>
        <Col xs={12}>{t('Footer Authorized:1')}</Col>
        <Col xs={12} className="mt-7">
          {t('Footer Authorized:2')}
        </Col>
      </>
    ),
    main: (
      <>
        <Col xs={12}>{t('Footer Authorized:0')}</Col>
        <Col xs={12}>{t('Footer Authorized:1')}</Col>
        <Col xs={12} className="mt-7">
          {t('Footer Authorized:2')}
        </Col>
      </>
    ),
    portal: (
      <>
        <Col xs={12}>{t('Footer Authorized:0')}</Col>
        <Col xs={12}>{t('Footer Authorized:1')}</Col>
        <Col xs={12} className="mt-7">
          {t('Footer Authorized:2')}
        </Col>
      </>
    ),
  },
};
