import i18n from '@i18next';
import React from 'react';
import { Col } from 'react-bootstrap';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const config = {
  socialMediaLinks: [],
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
        <Trans i18nKey="Regulation Desc">
          Regulation Desc
          <b>Registration Number</b>
          <a className="ml-2">Label Link</a>
        </Trans>
      </Col>
    ),
    main: (
      <>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('High Risk Investment Warning')}:</b>
          {t('High Risk Investment Warning Main Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('Disclaimer')}:</b>
          {t('Disclaimer Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('Regional Restrictions')}:</b>
          <Trans i18nKey="Regional Restrictions Desc">
            Regional Restrictions Desc
            <a className="ml-2">{t('Help Center')}</a>
          </Trans>
        </Col>
      </>
    ),
    portal: (
      <Col xs={12} className="context">
        <Trans i18nKey="Regulation Desc">
          Regulation Desc
          <b>Registration Number</b>
          <a className="ml-2">Label Link</a>
        </Trans>
      </Col>
    ),
  },
  copyright: {
    auth: <Col xs={12}>{t('Label Copyright')}</Col>,
    main: (
      <>
        <Col xs={12} className="mb-lg-9 mb-7">
          <Trans i18nKey="Regulation Desc">
            Regulation Desc
            <b>Registration Number</b>
            <a className="ml-2">Label Link</a>
          </Trans>
        </Col>
        <Col xs={12}>{t('Label Copyright')}</Col>
      </>
    ),
    portal: <Col xs={12}>{t('Label Copyright')}</Col>,
  },
};
