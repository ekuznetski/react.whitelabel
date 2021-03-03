/* eslint-disable func-style */
import { files } from '@domain';
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const locale = {
  customerIntroductionAgreement: (name: string) => (
    <Trans i18nKey="Customer introduction agreement" values={{ name }}>
      I, {name} , declare that I have carefully read and understood,
      <a target="_blank" href={files.termsOfBusiness}>
        Terms of Business
      </a>
      and all other policies as found here which I fully accept and agree with. I accept I am electronically signing
      these documents, and that this is a legally binding contractual agreement.
    </Trans>
  ),
  marketEventNotificationDesc:
    <Trans i18nKey="Market Event Notification Desc">
      To improve your trading experience, we would like to notify you of market events and extreme price
      movements. By signing up, you also declare you read, understood, and accept our
      <a target="_blank" href={files.privacyPolicy}>
        Privacy Policy
      </a>
      and you consent to receive newsletters, special offers and be contacted by WHITE_LABEL representatives
      via phone or e-mail. You can opt-out any time you wish to.
    </Trans>
};
