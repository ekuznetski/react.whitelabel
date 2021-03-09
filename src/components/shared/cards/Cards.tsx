import { useInViewport, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { CardsProvider, useCardsDispatch, useCardsState } from './cards.context';
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
}

export const Cards = memo(
  forwardRef<HTMLDivElement, ICards>(function Cards({ cards, className, cardWrapperClass, children }, ref) {
    const containerRef = React.createRef<HTMLDivElement>();

    return (
      <CardsProvider>
        {() => {
          // useEffect(() => {
          // 	if (containerRef.current && state.cardsAmount) {
          // 		containerRef.current.scrollLeft = state.activeCardUid
          // 			? state.cardsUid.indexOf(state.activeCardUid) * containerRef.current.clientWidth
          // 			: 0;
          // 	}
          // }, [state.scrollToUid]);

          return (
            <div className={classNames('common-cards', className)} ref={ref}>
              <div className="common-cards__container" ref={containerRef}>
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
              <CardsNavigation />
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
    const { cards, activeCardUid } = useCardsState();
    const observerRef = React.createRef<HTMLDivElement>();
    const inView = useInViewport(observerRef);
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
      if (inView) dispatch({ type: 'setActiveCard', uid: props.uid });
    }, [inView]);

    return (
      <div className={props.wrapperClassName}>
        <div
          className={classNames('common-cards__item', props.className, activeCardUid === props.uid && 'active')}
          ref={ref}
        >
          {props.children}
          {currentCard?.header && (
            <div className={classNames('common-cards__item-header', currentCard?.header.class)}>
              {currentCard?.header.elem}
            </div>
          )}
          {currentCard?.content && (
            <div className={classNames('common-cards__item-content', currentCard?.content.class)}>
              {currentCard?.content.elem}
            </div>
          )}
          {!responsive.md && <div className="common-cards__item-observer" ref={observerRef} />}
        </div>
      </div>
    );
  }),
);

export const CardsNavigation = memo(
  forwardRef<HTMLDivElement, { children?: React.ReactNode; className?: string }>(function CardsNavigation(
    { ...props },
    ref,
  ) {
    const { cards, activeCardUid } = useCardsState();

    return (
      <div className="cards-nav d-md-none">
        {cards.map((el, i) => (
          <div key={i} className={classNames('cards-nav__item', activeCardUid === el.uid && 'active')} />
        ))}
      </div>
    );
  }),
);

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
