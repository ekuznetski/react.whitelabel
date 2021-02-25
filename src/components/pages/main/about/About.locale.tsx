import { LocaleLink } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import i18n from '@i18next';
import { useLabelView } from '@utils/hooks';
import React from 'react';
import { Trans } from 'react-i18next';

const t = i18n.getLazyT;

export const locale = {
  pageTopRegisterBtn: useLabelView({
    '*': t('Open An Account'),
    [ELabels.bsfx]: t('Start Trading'),
  }),
  trustedTitle: useLabelView({
    '*': t('Trusted Section Title'),
    [ELabels.bsfx]: (
      <Trans i18nKey="Trusted Section Title">
        GLOBAL <strong>TRAINING AND TRADING</strong>
      </Trans>
    ),
    [ELabels.uinvex]: (
      <Trans i18nKey="Trusted Section Title">
        Define <b>your own</b> trading path
      </Trans>
    ),
  }),
  trustedDescription: useLabelView({
    '*': t('Trusted Section Desc'),
    [ELabels.bsfx]: (
      <Trans i18nKey="Trusted Section Desc">
        We believe in training first and trading second, so we have teamed up with an affordable FX trading training
        academy. Learn how to trade for less than $1 per day at <a href="http://www.yulfx.com">www.bsfx.com</a>. We have
        executives stationed globally to introduce clients to the BSFX platform and welcome them to a $6 trillion-a-day
        FX industry. We believe in giving back to the trading community, so we are1 involved in building training
        stations across the globe to provide an FX education.
      </Trans>
    ),
    [ELabels.uinvex]: (
      // <Trans i18nKey="Trusted Section Desc">
      //   Whether you’re interested in trading the $6 trillion-a-day forex (FX) industry or stocks movements, UINVEX has
      //   what you’re looking for. We offer a large range of products in 6 different asset classes:
      //   <b>Forex, Stocks, Commodities, Indices, Cryptocurrencies</b> and <b>ETFs</b>. Not only do we have a wide range
      //   of products but we provide competitive trading conditions for our clients.
      // </Trans>
      <Trans i18nKey="Trusted Section Desc">
        Whether you’re interested in trading the $6 trillion-a-day forex (FX) industry or stocks movements, UINVEX has
        what you’re looking for. We offer a large range of products in 6 different asset classes:
        <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'forex' } }}>Forex</LocaleLink>,
        <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'stocks' } }}>Stocks</LocaleLink>,
        <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'commodities' } }}>Commodities</LocaleLink>,
        <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'indices' } }}>Indices</LocaleLink>,
        <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'crypto' } }}>Cryptocurrencies</LocaleLink>,
        and <b>ETFs</b>. Not only do we have a wide range of products but we provide competitive trading conditions
      </Trans>
    ),
  }),
  depositTitle: useLabelView({
    '*': (
      <Trans i18nKey="Deposit and Withdrawal Information">
        Deposit & Withdrawal <br />
        <strong>Information</strong>
      </Trans>
    ),
    [ELabels.uinvex]: (
      <Trans i18nKey="Deposit and Withdrawal Information">
        <strong>Deposit</strong> & <strong>Withdrawal</strong> Information
      </Trans>
    ),
  }),
};
