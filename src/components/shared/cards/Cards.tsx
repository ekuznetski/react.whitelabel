import { useInViewport, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { CardsProvider, useCardsDispatch, useCardsState } from './cards-context';
import './Cards.scss';

export interface ISingleCard {
	header?: string | React.ReactFragment;
	content?: string | React.ReactFragment;
	children?: React.ReactNode;
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
				{(state, dispatch) => {
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
		const { activeCardUid } = useCardsState();
		const observerRef = React.createRef<HTMLDivElement>();
		const inView = useInViewport(observerRef);
		const responsive = useResponsive();

		useEffect(() => dispatch({ type: 'addCard', uid: props.uid }), []);
		useEffect(() => {
			if (inView) dispatch({ type: 'setActiveCard', uid: props.uid });
		}, [inView]);

		return (
			<div className={props.wrapperClassName}>
				<div
					className={classNames('common-cards__item', props.className, activeCardUid === props.uid && 'active')}
					ref={ref}
				>
					{!props.children ? (
						<>
							<CardHeader>{props.header}</CardHeader>
							<CardContent>{props.content}</CardContent>
						</>
					) : (
						<>
							{props.header && <CardHeader>{props.header}</CardHeader>}
							{props.children}
							{props.content && <CardContent>{props.content}</CardContent>}
						</>
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
		const { cardsUid, activeCardUid } = useCardsState();

		return (
			<div className="cardsNav d-md-none">
				{cardsUid.map((el, i) => (
					<div key={i} className={classNames('cardsNav__item', activeCardUid === el && 'active')} />
				))}
			</div>
		);
	}),
);

export const CardHeader = memo(
	forwardRef<HTMLDivElement, { children?: React.ReactNode; className?: string }>(function CardHeader(
		{ ...props },
		ref,
	) {
		return (
			<div className={classNames('common-cards__item-header', props.className)} ref={ref}>
				{props.children}
			</div>
		);
	}),
);

export const CardContent = memo(
	forwardRef<HTMLDivElement, { children?: React.ReactNode; className?: string }>(function CardContent(
		{ ...props },
		ref,
	) {
		return (
			<div className={classNames('common-cards__item-content', props.className)} ref={ref}>
				{props.children}
			</div>
		);
	}),
);
