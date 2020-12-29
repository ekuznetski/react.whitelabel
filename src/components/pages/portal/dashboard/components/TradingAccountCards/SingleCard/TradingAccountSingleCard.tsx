import { Button, DropDown, IDropdownItem, IconFlag, LocaleNavLink, Svg } from '@components/shared';
import {
  Currencies,
  EAccountLeverage,
  ECurrencyCode,
  ETradingAccountType,
  ETradingPlatform,
  ETradingType,
} from '@domain/enums';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './TradingAccountSingleCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IStore, ac_showModal } from '@store';
import { MClientSettings } from '@domain/models';
import { getMetaTraderWebTerminalLink } from '@utils/fn';
import { AccountSettingsModal } from '@pages/portal/dashboard/components/TradingAccountCards/AccountSettingsModal/AccountSettingsModal';
import { AccountPasswordModal } from '@pages/portal/dashboard/components/TradingAccountCards/AccountPasswordModal/AccountPasswordModal';
import { AccountLeverageModal } from '@pages/portal/dashboard/components/TradingAccountCards/AccountLeverageModal/AccountLeverageModal';

export interface ITradingAccountSingleCard {
  platform: ETradingPlatform;
  tradingAccountType: ETradingAccountType;
  allowLeverageChange: boolean;
  type: ETradingType;
  balance: number;
  accountId: string;
  leverage: EAccountLeverage;
  currency: ECurrencyCode;
  inline?: boolean;
}
// TODO modal should work like notification
export const TradingAccountSingleCard = memo(function TradingAccountSingleCard(
  tradingAccount: ITradingAccountSingleCard,
) {
  const { clientSettings } = useSelector<IStore, { clientSettings: MClientSettings }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const [isDropdownMenuOpen, setDropdownMenuOpen] = React.useState(false);
  const navRef = React.createRef<HTMLButtonElement>();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const accountNavItems: IDropdownItem[] = [
    {
      id: 'launch',
      icon: 'coins',
      target: '_blank',
      externalLink: getMetaTraderWebTerminalLink({
        version: tradingAccount.platform == ETradingPlatform.mt4 ? 4 : 5,
        servers: ['BlueSquare-Live'],
        server: 'BlueSquare-Live',
        demoAllServers: true,
        utmSource: 'www.bluesquarefx.com',
        startMode: 'create_demo',
        language: 'en',
        colorScheme: 'black_on_white',
      }),
      title: t(`Launch MetaTrader Web`, { platform: tradingAccount.platform.toUpperCase() }),
    },
    {
      id: 'download',
      icon: 'coins',
      path: '/download',
      title: t('Download MetaTrader Platform', { platform: tradingAccount.platform.toUpperCase() }),
    },
  ];
  if (tradingAccount.type != ETradingType.fake) {
    accountNavItems.push(
      {
        id: 'password',
        icon: 'coins',
        title: t('Change Password'),
        onclick: () => dispatch(ac_showModal(AccountPasswordModal, { tradingAccount })),
      },
      {
        id: 'statement',
        icon: 'coins',
        path: '/statement',
        title: t('Get Trading Statement'),
      },
    );
    if (tradingAccount.allowLeverageChange) {
      accountNavItems.push({
        id: 'leverage',
        icon: 'coins',
        title: t('Change Leverage'),
        onclick: () => dispatch(ac_showModal(AccountLeverageModal, { tradingAccount })),
      });
    }
  }
  if (clientSettings.edit_fake_account) {
    accountNavItems.push({
      id: 'settings',
      icon: 'coins',
      title: t('Change Account Settings'),
      onclick: () => dispatch(ac_showModal(AccountSettingsModal, { tradingAccount })),
    });
  }

  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return (
    <div
      className={classNames(
        'trading-account-single-card',
        tradingAccount.inline ? 'col-12 mb-7 inline' : 'col-12 col-lg-4 col-md-6 mb-lg-0 mb-9',
      )}
    >
      <div className="trading-account-card-wrapper">
        <div className="account-card__details px-7">
          <div className="account__logo mr-7">{tradingAccount.platform}</div>
          <div className="account__info">
            <div className="info-type">{tradingAccount.tradingAccountType}</div>
            <div className="info-number">{tradingAccount.accountId}</div>
          </div>
          <div className="account__currency ml-auto">
            {tradingAccount.currency}
            <IconFlag flag={Currencies[tradingAccount.currency.toLowerCase()].flag} className="ml-2" />
          </div>
        </div>
        <div className="account-card__balance px-7">
          <div className="balance-title">{t('Balance')}</div>
          <div className="balance-value">
            <Svg href={tradingAccount.currency.toLowerCase()} className="mr-2" height={18} />
            {tradingAccount.balance}
          </div>
        </div>
        <div className="account-card__leverage px-7">
          <div className="leverage-title">{t('Leverage')}</div>
          <div className="leverage-value">{tradingAccount.leverage}</div>
        </div>
        <div className="account-card__options px-7">
          <Button className="fund px-3 mr-3" noBg>
            <LocaleNavLink exact to="/deposit">
              {t('Fund')}
              <Svg href="coins" className="ml-4" />
            </LocaleNavLink>
          </Button>
          <Button
            className={classNames('nav', isDropdownMenuOpen && 'active')}
            onClick={toggleDropdownMenu}
            ref={navRef}
          >
            <Svg href="gear" />
          </Button>
          <DropDown
            width={270}
            parentRef={navRef}
            items={accountNavItems}
            isOpen={isDropdownMenuOpen}
            isOpenDispatcher={setDropdownMenuOpen}
            position="right"
          />
        </div>
      </div>
    </div>
  );
});
