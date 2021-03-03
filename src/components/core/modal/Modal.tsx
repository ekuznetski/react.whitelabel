import { Svg } from '@components/shared';
import { IModalState } from '@domain/interfaces';
import { IStore, ac_hideModal } from '@store';
import classNames from 'classnames';
import React, { memo, useEffect } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useDispatch, useSelector } from 'react-redux';
import './Modal.scss';

interface IModalStateProps {
  modalProps: IModalState;
}

export const Modal = memo(function Modal() {
  const { modalProps } = useSelector<IStore, IModalStateProps>((state) => ({
    modalProps: state.app.modal,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(ac_hideModal());
    };
  }, []);

  function closeModal(e: any) {
    e.stopPropagation();
    dispatch(ac_hideModal());
  }

  return modalProps.visible ? (
    <div className={classNames('modal-wrapper', modalProps.modalWrapperClassName)}>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="common-modal py-8 px-6 py-md-10 px-md-9">
        <Svg href="close" className="common-modal__close" height={18} onClick={closeModal} />
        <div className="common-modal__content">{React.createElement(modalProps.component, modalProps.props)}</div>
      </div>
    </div>
  ) : null;
});

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

export function ModalBody(props: { className?: string; children: React.ReactNode }) {
  return <div className={classNames('modal-content__body', props.className)}>{props.children}</div>;
}

export function ModalFooter(props: { className?: string; children: React.ReactNode }) {
  return <div className={classNames('modal-content__footer', props.className)}>{props.children}</div>;
}
