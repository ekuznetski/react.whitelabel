import { Svg } from '@components/shared';
import { files } from '@domain';
import i18n from '@i18next';
import React from 'react';

const t = i18n.getLazyT;

export const config = {
  linksCards: [
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: (
        <>
          <div className="svg-container">
            <Svg href="document" />
          </div>
          <span>{t('Customer Agreement')}</span>
        </>
      ),
      uid: 1,
      content: (
        <a target="_blank" href="">
          <Svg href="download" />
          {t('Download')}
        </a>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: (
        <>
          <div className="svg-container">
            <Svg href="document" />
          </div>
          <span>{t('Disclaimer')}</span>
        </>
      ),
      uid: 2,
      content: (
        <a target="_blank" href={files.riskWarning}>
          <Svg href="download" />
          {t('Download')}
        </a>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: (
        <>
          <div className="svg-container">
            <Svg href="document" />
          </div>
          <span>{t('Privacy Policy')}</span>
        </>
      ),
      uid: 3,
      content: (
        <a target="_blank" href={files.privacyPolicy}>
          <Svg href="download" />
          {t('Download')}
        </a>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: (
        <>
          <div className="svg-container">
            <Svg href="document" />
          </div>
          <span>{t('Execution Policy')}</span>
        </>
      ),
      uid: 4,
      content: (
        <a target="_blank" href="">
          <Svg href="download" />
          {t('Download')}
        </a>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: (
        <>
          <div className="svg-container">
            <Svg href="document" />
          </div>
          <span>{t('Preventing Money Laundering')}</span>
        </>
      ),
      uid: 5,
      content: (
        <a target="_blank" href="">
          <Svg href="download" />
          {t('Download')}
        </a>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: (
        <>
          <div className="svg-container">
            <Svg href="document" />
          </div>
          <span>{t('Terms of Business')}</span>
        </>
      ),
      uid: 6,
      content: (
        <a target="_blank" href={files.termsOfBusiness}>
          <Svg href="download" />
          {t('Download')}
        </a>
      ),
    },
  ],
};
