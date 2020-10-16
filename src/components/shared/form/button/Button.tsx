import { Svg } from '@components/shared';
import { EFormStatus } from '@domain/enums';
import { EActionTypes, IStore } from '@store';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React, { forwardRef, memo } from 'react';
import { useSelector } from 'react-redux';
import './Button.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  checkFormValidity?: boolean;
  loadingOnAction?: EActionTypes | EActionTypes[];
  isLoading?: boolean;
}

export const Button = memo(
  forwardRef<HTMLButtonElement, IButton>(function Button({ className = '', checkFormValidity = false, ...props }, ref) {
    const { activeRequestsList } = useSelector<IStore, { activeRequestsList: EActionTypes[] }>((state) => ({
      activeRequestsList: state.app.requests.activeList,
    }));
    const formikProps = useFormikContext();

    const _loading =
      props.isLoading ||
      (props.loadingOnAction &&
        !![props.loadingOnAction].flat().find((action) => activeRequestsList.includes(action as EActionTypes)));
    const _disabled =
      props.disabled ||
      (formikProps && (formikProps?.status === EFormStatus.disabled || (checkFormValidity && !formikProps?.isValid)));
    const _buttonProps = { ...props };
    delete _buttonProps.children;
    delete _buttonProps.isLoading;
    delete _buttonProps.loadingOnAction;

    return (
      <button
        className={classNames('common-button', className, (_disabled || _loading) && 'disabled')}
        {..._buttonProps}
        disabled={_disabled || _loading}
        ref={ref}
      >
        {_loading ? <Svg href="loading" width={20} height={20} className="loader" /> : props.children}
      </button>
    );
  }),
);
