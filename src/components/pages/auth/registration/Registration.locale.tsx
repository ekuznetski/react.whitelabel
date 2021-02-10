/* eslint-disable func-style */
import { files } from '@domain';
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const locale = {
  customerIntroductionAgreement: (name: string) => (
    <Trans i18nKey="Customer introduction agreement" values={{ name }}>
      I, {name} , declare that I have carefully read and understood, <a href="#">Customer Agreement</a>,
      <a target="_blank" href={files.termsOfBusiness}>
        Terms of Business
      </a>
      and all other policies as found here which I fully accept and agree with. I accept I am electronically signing
      these documents, and that this is a legally binding contractual agreement.
    </Trans>
  ),
};
