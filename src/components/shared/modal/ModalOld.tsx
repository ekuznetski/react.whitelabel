import { useCombinedRef, useLockScroll } from '@utils/hooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Svg } from '../svg/Svg';
import './Modal.scss';

export interface IModal {
  children: React.ReactNode;
  isOpen?: boolean;
  height?: number;
  width?: number;
  className?: string;
  isOpenDispatcher: React.Dispatch<React.SetStateAction<boolean>> | React.Dispatch<boolean>;
}

export const ModalOld = memo(
  forwardRef<HTMLDivElement, IModal>(function Modal(props: any, ref) {
    const { setScrollLock } = useLockScroll();
    const wrapperRef = React.createRef<HTMLDivElement>();
    const elementRef = useCombinedRef(ref);
    const TARGET_CONTAINER = document.getElementById('dynamic-portals') || document.body;

    useEffect(() => {
      return () => {
        wrapperRef.current && document.body.removeChild(wrapperRef.current);
      };
    }, []);

    useEffect(() => {
      setScrollLock(props.isOpen);
    }, [props.isOpen]);

    return (
      TARGET_CONTAINER &&
      props.isOpen &&
      ReactDOM.createPortal(
        <div className={classNames('modal-wrapper', props.className)} ref={wrapperRef}>
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
              href="close"
              className="common-modal__close"
              height={18}
              onClick={(e) => {
                e.stopPropagation();
                props.isOpenDispatcher(false);
              }}
            />
            <div className="common-modal__content">{props.children}</div>
          </div>
        </div>,
        TARGET_CONTAINER,
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
    <div className={classNames('modal-content__title', props.className)}>
      {props.title}
      {props.subTitle && <small className="mt-1">{props.subTitle}</small>}
      {props.children}
    </div>
  );
}

export function ModalContext(props: { className?: string; children: React.ReactNode }) {
  return <div className={classNames('modal-content__context', props.className)}>{props.children}</div>;
}

export function ModalNav(props: { className?: string; children: React.ReactNode }) {
  return <div className={classNames('modal-content__nav', props.className)}>{props.children}</div>;
}
