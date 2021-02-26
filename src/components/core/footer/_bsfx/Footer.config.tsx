import { files } from '@domain';
import i18n from '@i18next';
import React from 'react';
import { Col } from 'react-bootstrap';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const config = {
  socialMediaLinks: [],
  documents: [
    {
      name: t('Terms of Business'),
      link: files.termsOfBusiness,
    },
    {
      name: t('Risk Warnings'),
      link: files.riskWarning,
    },
    {
      name: t('Cookies Policy'),
      link: files.cookiePolicy,
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
          <b className="mr-2">{t('High Risk Investment Warning')}</b>
          {t('High Risk Investment Warning Main Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('Disclaimer')}:</b>
          {t('Disclaimer Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('Regional Restrictions')}:</b>
          <Trans i18nKey="Regional Restrictions Desc">
            We do not offer our services to residents of certain jurisdictions such as Afghanistan, Belgium, Hong Kong,
            Japan, the United States of America and some other regions. For more information please refer to our{' '}
            <a target="_blank" href={files.termsOfBusiness}>
              Terms of Business
            </a>
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
