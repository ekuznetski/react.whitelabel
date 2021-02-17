import { EFormStatus } from '@domain/enums';
import { EActionTypes, IStore } from '@store';
import classNames from 'classnames';
import { FormikContext } from 'formik';
import React, { forwardRef, memo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Svg } from '../../svg/Svg';
import './Button.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  checkFormValidity?: boolean;
  loadingOnAction?: EActionTypes | EActionTypes[];
  isLoading?: boolean;
  noBg?: boolean;
}

export const Button = memo(
  forwardRef<HTMLButtonElement, IButton>(function Button({ className = '', checkFormValidity = false, ...props }, ref) {
    const { activeRequestsList } = useSelector<IStore, { activeRequestsList: EActionTypes[] }>((state) => ({
      activeRequestsList: state.app.requests.activeList,
    }));
    const formikProps = useContext(FormikContext)

    const _loading =
      props.isLoading ||
      (props.loadingOnAction &&
        !![props.loadingOnAction].flat().find((action) => activeRequestsList.includes(action as EActionTypes)));
    const _disabled =
      props.disabled ||
      (formikProps && (formikProps?.status === EFormStatus.disabled || (checkFormValidity && !formikProps?.isValid)));
    const _buttonProps = ['children', 'isLoading', 'loadingOnAction', 'noBg'].reduce(
      // @ts-ignore
      (acc, el) => (delete acc[el], acc),
      { ...props },
    );

    return (
      <button
        className={classNames('common-button', props.noBg && 'noBg', className, (_disabled || _loading) && 'disabled')}
        {..._buttonProps}
        disabled={_disabled || _loading}
        ref={ref}
      >
        {_loading ? <Svg href="loading" width={20} height={20} className="loader" /> : props.children}
      </button>
    );
  }),
);
