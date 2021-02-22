import { Button, LocaleNavLink, Svg } from '@components/shared';
import { MClientSettings } from '@domain/models';
import { IStore } from '@store';
import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { config } from '@pages/portal/dashboard';
import './BannerCard.scss';

type IBannerCardState = {
  clientSettings: MClientSettings;
};

export function BannerCard() {
  const { clientSettings } = useSelector<IStore, IBannerCardState>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const [activeCardIdx, setActiveCardIdx] = React.useState(0);

  const cards = (clientSettings.show_promotions ? config.promotion_cards : config.bonus_cards).filter(
    (slide) => !slide.disabled,
  );

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
      <div className="banner-card__context px-7 px-sm-11">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={classNames('context-card mt-7 mt-sm-11', idx == activeCardIdx && 'active')}
            style={{ zIndex: -~(idx == activeCardIdx) }}
          >
            {card?.title && <div className={classNames('context-card__title mb-3', card.type)}>{card?.title}</div>}
            <div className={classNames('context-card__text', card.type)}>{card?.text}</div>
          </div>
        ))}
      </div>
      <div className="banner-card__options px-7 px-sm-11">
        <div className="banner-options__btn">
          <Button className="px-9" noBg>
            {cards[activeCardIdx].link.path ? (
              // @ts-ignore
              <LocaleNavLink exact to={cards[activeCardIdx].link?.path}>
                {cards[activeCardIdx].link.text}
              </LocaleNavLink>
            ) : (
              cards[activeCardIdx].link.text
            )}
          </Button>
        </div>
        {cards.length > 1 && (
          <div className="banner-options__nav ml-auto">
            <Button onClick={() => setActiveCardIdx((activeCardIdx + 1) % cards.length)} className="mr-4">
              <Svg href="chevron_left" height={24} />
            </Button>
            <Button onClick={() => setActiveCardIdx((activeCardIdx - 1 < 0 ? cards.length : activeCardIdx) - 1)}>
              <Svg href="chevron_right" height={24} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
