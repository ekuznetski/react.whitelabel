import { routesConfig } from '@domain';
import { EAppSection } from '@domain/enums';
import { useCombinedRef } from '@utils/hooks';
import React, { forwardRef, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLockScroll } from 'utils/hooks/useLockScroll';
import { Svg } from '..';
import './Modal.scss';
import classNames from 'classnames';

export interface IModal {
	children: React.ReactNode;
	isOpen?: boolean;
	height?: number;
	width?: number;
	className?: string;
	isOpenDispatcher: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = memo(
	forwardRef<HTMLDivElement, IModal>(function Modal(props: any, ref) {
		const wrapperRef = React.createRef<HTMLDivElement>();
		const elementRef = useCombinedRef(ref);
		const section = routesConfig.find((route) => route.path == location.pathname)?.appSection as EAppSection;

		useEffect(() => {
			return () => {
				wrapperRef.current && document.body.removeChild(wrapperRef.current);
			};
		}, []);

		useEffect(() => {
			useLockScroll(props.isOpen, section);
		}, [props.isOpen]);

		return (
			props.isOpen &&
			ReactDOM.createPortal(
				<div className="modal-wrapper" ref={wrapperRef}>
					<div
						className="modal-overlay"
						onClick={(e) => {
							e.stopPropagation();
							props.isOpenDispatcher(false);
						}}
					/>
					<div
						className="common-modal p-9"
						style={{
							width: props.width,
							height: props.height,
						}}
						ref={elementRef}
					>
						<Svg
							href="close.svg"
							className="common-modal__close"
							height={18}
							onClick={(e) => {
								e.stopPropagation();
								props.isOpenDispatcher(false);
							}}
						/>
						<div className={classNames('common-modal__content', props.className)}>{props.children}</div>
					</div>
				</div>,
				document.body,
			)
		);
	}),
);

export function ModalTitle(props: {
	className?: string;
	children?: React.ReactNode;
	title?: React.ReactNode;
	subTitle?: React.ReactNode;
}) {
	return (
		<div className="modal-content__title">
			{props.title}
			{props.subTitle && <small className="mt-1">{props.subTitle}</small>}
			{props.children}
		</div>
	);
}

export function ModalContext(props: { className?: string; children: React.ReactNode }) {
	return <div className="modal-content__context">{props.children}</div>;
}

export function ModalNav(props: { className?: string; children: React.ReactNode }) {
	return <div className="modal-content__nav">{props.children}</div>;
}
