import { theme } from '@domain';
import { useDebounce, useInViewport, usePrevious, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { CardUid, CardsProvider, useCardsDispatch, useCardsState } from './cards.context';
import './Cards.scss';

export interface ISingleCard {
  header?: React.ReactNode;
  content?: React.ReactNode;
  children?:
    | React.ReactElement<typeof CardHeader>
    | React.ReactElement<typeof CardContent>
    | (React.ReactElement<typeof CardHeader> | React.ReactElement<typeof CardContent>)[];
  className?: string;
  wrapperClassName?: string;
  uid: number | string;
}

export interface ICards {
  id: string;
  cards?: ISingleCard[];
  className?: string;
  cardWrapperClass?: string;
  children?: React.ReactNode;
  scrollableOnMobile?: boolean;
}

export const Cards = memo(
  forwardRef<HTMLDivElement, ICards>(function Cards(
    { cards, className, cardWrapperClass, children, scrollableOnMobile = theme.cardsMobileScroll },
    ref,
  ) {
    const containerRef = React.createRef<HTMLDivElement>();

    return (
      <CardsProvider>
        {(state, dispatch) => {
          const [containerScrollBlocked, setContainerScrollBlocked] = useState(false);

          function scrollHandler() {
            if (!containerScrollBlocked && scrollableOnMobile && containerRef.current) {
              const cardUidOnView = state.cards
                .map((c, i) => {
                  if (c.ref) {
                    const rect = c.ref.getBoundingClientRect();
                    return (
                      ((rect.left > -50 && rect.left < 50) ||
                        // @ts-ignore
                        (i == state.cards.length - 1 && rect.right - containerRef.current.offsetWidth < 50)) &&
                      c.uid
                    );
                  }
                  return false;
                })
                .reduce((acc, key) => (key !== false ? key : acc), false);

              if (cardUidOnView !== false && cardUidOnView != state.activeCard.uid) {
                dispatch({ type: 'setActiveCard', uid: cardUidOnView });
              }
            }
          }

          function navigationItemClickHandler(uid: CardUid) {
            if (containerRef.current && scrollableOnMobile && state.cardsAmount && state.cardsAmount > 1) {
              setContainerScrollBlocked(true);
              containerRef.current.scrollLeft = uid ? state.cards.find((c) => c.uid === uid)?.ref?.offsetLeft || 0 : 0;
              setTimeout(() => setContainerScrollBlocked(false), 600);
            }
          }

          return (
            <div className={classNames('common-cards', className)} ref={ref}>
              <div
                className={classNames('common-cards__container', scrollableOnMobile && 'scrollable')}
                onScroll={scrollHandler}
                ref={containerRef}
              >
                {!children && cards
                  ? cards?.map((card, c) => (
                      <Card
                        key={c}
                        header={card.header}
                        content={card.content}
                        wrapperClassName={cardWrapperClass}
                        uid={card.uid}
                      />
                    ))
                  : children}
              </div>
              {scrollableOnMobile && <CardsNavigation onItemClick={navigationItemClickHandler} />}
            </div>
          );
        }}
      </CardsProvider>
    );
  }),
  (prevProps, nextProps) => {
    return !!prevProps.cards?.every((c, idx) => isEqual(prevProps.cards?.[idx], nextProps.cards?.[idx]));
  },
);

export const Card = memo(
  forwardRef<HTMLDivElement, ISingleCard & React.Attributes>(function Card(props, ref) {
    const dispatch = useCardsDispatch();
    const { cards, activeCard } = useCardsState();
    const cardRef = React.useRef<HTMLDivElement>(null);
    const responsive = useResponsive();
    const currentCard = cards.find((card) => card.uid === props.uid);

    useEffect(() => {
      dispatch({
        type: 'addCard',
        uid: props.uid,
        header: props.header ? { elem: props.header } : null,
        content: props.header ? { elem: props.content } : null,
      });
    }, []);

    useEffect(() => {
      dispatch({
        type: 'addCardRef',
        uid: props.uid,
        ref: cardRef.current,
      });
    }, [cardRef]);

    return (
      <div className={classNames('common-cards__wrapper', props.wrapperClassName)} ref={cardRef}>
        <div
          className={classNames('common-cards__item', props.className, activeCard.uid === props.uid && 'active')}
          ref={ref}
        >
          {props.children}
          {!!currentCard?.header?.elem && (
            <div className={classNames('common-cards__item-header', currentCard?.header.class)}>
              {currentCard?.header.elem}
            </div>
          )}
          {!!currentCard?.content?.elem && (
            <div className={classNames('common-cards__item-content', currentCard?.content.class)}>
              {currentCard?.content.elem}
            </div>
          )}
          {!responsive.md && <div className="common-cards__item-observer" />}
        </div>
      </div>
    );
  }),
);

export const CardsNavigation = memo(function CardsNavigation(props: { onItemClick: (uid: CardUid) => void }) {
  const { cards, activeCard } = useCardsState();
  const dispatch = useCardsDispatch();

  function itemClickHandler(uid: CardUid) {
    dispatch({ type: 'setActiveCard', uid });
    props.onItemClick(uid);
  }

  return (
    <div className="cards-nav d-md-none">
      {cards.map((el, i) => (
        <div
          key={i}
          className={classNames('cards-nav__item', activeCard.uid === el.uid && 'active')}
          onClick={() => itemClickHandler(el.uid)}
        />
      ))}
    </div>
  );
});

export const CardHeader = memo(function CardHeader(props: { children?: React.ReactNode; className?: string }) {
  const dispatch = useCardsDispatch();

  useEffect(() => {
    dispatch({
      type: 'addTempHeader',
      tempHeader: { elem: props.children, class: props.className },
    });
  }, []);

  return null;
});

export const CardContent = memo(function CardContent(props: { children?: React.ReactNode; className?: string }) {
  const dispatch = useCardsDispatch();

  useEffect(() => {
    dispatch({
      type: 'addTempContent',
      tempContent: { elem: props.children, class: props.className },
    });
  }, []);

  return null;
});
