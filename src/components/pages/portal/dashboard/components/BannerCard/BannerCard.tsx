import { Button, Svg } from '@components/shared';
import { IClientProfile, ILogin, IClientBannerCard } from '@domain/interfaces';
import { IStore } from '@store';
import React from 'react';
import { useSelector } from 'react-redux';
import './BannerCard.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { usePathLocale } from '@utils/hooks';

type IBannerCardState = {
  clientProfile: IClientProfile;
  clientAccount: ILogin;
};

export function BannerCard() {
  const { clientProfile, clientAccount } = useSelector<IStore, IBannerCardState>((state) => ({
    clientProfile: state.data.client.profile,
    clientAccount: state.data.client.preferences,
  }));
  const [activeCardIdx, setActiveCardIdx] = React.useState(0);
  const { localizePath } = usePathLocale();

  const promotion_cards: IClientBannerCard[] = [
    {
      type: 'blue',
      disabled: true,
      link: { text: 'Learn more' },
      text: '<span>Earn $20</span> to trade with once you complete your Financial profile and submit your documents',
    },
    {
      type: 'blue',
      disabled: true,
      link: { text: 'SMS Verification' },
      text: 'Get a <span>$20 bonus</span> added to your trading account when you verify your phone number',
      title: 'VERIFY YOUR PHONE NUMBER',
    },
    {
      type: 'blue',
      bg_img: 'client_banner_1.jpg',
      bg_color: 'white',
      link: { path: 'share', text: 'Invite Now' },
      text: 'Invite a friend and get <br/> up to <span>$200 Cash Bonus</span>',
      title: 'Invite friends for a Bonus',
    },
    {
      type: 'blue',
      bg_img: 'client_banner_2.jpg',
      bg_color: '#eff1f3',
      link: { path: 'deposit', text: 'Deposit Now' },
      text: 'Deposit now and <span>receive a 10% bonus</span> up to $5K instantly added to your account',
      title: '10% Bonus on deposit',
    },
  ];
  const bonus_cards: IClientBannerCard[] = [
    {
      type: 'blue',
      bg_img: 'fca_logos',
      link: { path: 'deposit', text: 'Deposit Now' },
      text: 'Fund Your Account with <span>$0 Fees</span>',
      title: 'DEPOSIT NOW!',
    },
  ];
  const cards = (clientAccount.show_promotions ? promotion_cards : bonus_cards).filter((slide) => !slide.disabled);

  return (
    <div className="banner-card">
      <div className="banner-card__bg">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={classNames('bg-card', idx == activeCardIdx && 'active')}
            style={{
              backgroundColor: cards[activeCardIdx]?.bg_color,
              backgroundImage: `url(assets/${cards[activeCardIdx]?.bg_img})`,
              zIndex: -~(idx == activeCardIdx),
            }}
          />
        ))}
      </div>
      <div className="banner-card__context px-11">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={classNames('context-card mt-11', idx == activeCardIdx && 'active')}
            style={{ zIndex: -~(idx == activeCardIdx) }}
          >
            {card?.title && <div className={classNames('context-card__title mb-3', card.type)}>{card?.title}</div>}
            <div
              className={classNames('context-card__text', card.type)}
              dangerouslySetInnerHTML={{ __html: card?.text }}
            />
          </div>
        ))}
      </div>
      <div className="banner-card__options px-11">
        <div className="banner-options__btn">
          <Button className="px-9 noBg">
            {cards[activeCardIdx].link.path ? (
              // @ts-ignore
              <NavLink exact to={localizePath(cards[activeCardIdx].link?.path)}>
                {cards[activeCardIdx].link.text}
              </NavLink>
            ) : (
              cards[activeCardIdx].link.text
            )}
          </Button>
        </div>
        <div className="banner-options__nav ml-auto">
          <Button onClick={() => setActiveCardIdx((activeCardIdx + 1) % cards.length)} className="mr-4">
            <Svg href="chevron_left.svg" height={24} />
          </Button>
          <Button onClick={() => setActiveCardIdx((activeCardIdx - 1 < 0 ? cards.length : activeCardIdx) - 1)}>
            <Svg href="chevron_right.svg" height={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
