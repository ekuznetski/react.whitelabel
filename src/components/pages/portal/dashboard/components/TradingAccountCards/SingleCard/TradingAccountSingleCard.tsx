import { Button, DropDown, IconFlag, LocaleNavLink, Modal, Svg } from '@components/shared';
import { Currencies, EAccountLeverage, ECurrencyCode, ETradingAccountType } from '@domain/enums';
import { usePathLocale } from '@utils/hooks';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './TradingAccountSingleCard.scss';

export interface ITradingAccountSingleCard {
  platform: string;
  type: ETradingAccountType;
  balance: number;
  accountId: number;
  leverage: EAccountLeverage;
  currency: ECurrencyCode;
  inline?: boolean;
}

export const TradingAccountSingleCard = memo(function TradingAccountSingleCard(card: ITradingAccountSingleCard) {
  const [isDropdownMenuOpen, setDropdownMenuOpen] = React.useState(false);
  const [isChangePasswordOpen, setChangePasswordOpen] = React.useState(false);
  const { t } = useTranslation();
  const navRef = React.createRef<HTMLButtonElement>();

  const accountNavItems = [
    {
      icon: 'coins.svg',
      path: '/deposit',
      title: 'Launch MT4 Web',
    },
    {
      icon: 'coins.svg',
      path: '/deposit',
      title: 'Download MT4 Platform',
    },
    {
      icon: 'coins.svg',
      path: '/deposit',
      title: 'Get Trading Statement',
    },
    {
      icon: 'coins.svg',
      title: 'Change Password',
      onclick: () => setChangePasswordOpen(true),
    },
  ];

  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return (
    <div className={classNames('trading-account-single-card', card.inline ? 'col-12 mb-7 inline' : 'col-4')}>
      <div className="trading-account-card-wrapper">
        <div className="account-card__details px-7">
          <div className="account__logo mr-7">{card.platform}</div>
          <div className="account__info">
            <div className="info-type">{card.type}</div>
            <div className="info-number">{card.accountId}</div>
          </div>
          <div className="account__currency ml-auto">
            {card.currency}
            <IconFlag flag={Currencies[card.currency.toLowerCase()].flag} className="ml-2" />
          </div>
        </div>
        <div className="account-card__balance px-7">
          <div className="balance-title">{t('Balance')}</div>
          <div className="balance-value">
            <Svg href={card.currency.toLowerCase() + '.svg'} className="mr-2" height={18} />
            {card.balance}
          </div>
        </div>
        <div className="account-card__leverage px-7">
          <div className="leverage-title">{t('Leverage')}</div>
          <div className="leverage-value">{card.leverage}</div>
        </div>
        <div className="account-card__options px-7">
          <Button className="fund px-3 mr-3 noBg">
            <LocaleNavLink exact to="/deposit">
              {t('Fund')}
              <Svg href="coins.svg" className="ml-4" />
            </LocaleNavLink>
          </Button>
          <Button
            className={classNames('nav', isDropdownMenuOpen && 'active')}
            onClick={toggleDropdownMenu}
            ref={navRef}
          >
            <Svg href="gear.svg" />
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
      <Modal isOpen={isChangePasswordOpen} isOpenDispatcher={setChangePasswordOpen}>
        test
      </Modal>
    </div>
  );
});
