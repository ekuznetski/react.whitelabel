import { files } from '@domain';
import i18n from '@i18next';
import React from 'react';
import { Col } from 'react-bootstrap';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const config = {
  socialMediaLinks: [
    {
      name: 'Facebook',
      icon: 'facebook',
      link: '',
    },
    {
      name: 'Tweeter',
      icon: 'tweeter',
      link: '',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      link: '',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      link: '',
    },
    {
      name: 'YouTube',
      icon: 'youtube',
      link: '',
    },
  ],
  documents: [
    {
      name: t('Legal Forms and Documents'),
      link: '',
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
        <b className="mr-2">{t('High Risk Investment Warning')}</b>
        {t('High Risk Investment Warning Portal Desc')}
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
        <b className="mr-2">{t('High Risk Investment Warning')}</b>
        {t('High Risk Investment Warning Portal Desc')}
      </Col>
    ),
  },
  copyright: {
    auth: <Col xs={12}>{t('Label Copyright')}</Col>,
    main: <Col xs={12}>{t('Label Copyright')}</Col>,
    portal: <Col xs={12}>{t('Label Copyright')}</Col>,
  },
};
