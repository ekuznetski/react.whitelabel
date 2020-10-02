import classNames from 'classnames';
import React from 'react';
import { LocaleNavLink, Svg } from '..';
import './PageTitle.scss';

type IPageTitle = {
  className?: string;
  icon?: string;
  title: string;
  showBackButton?: boolean;
};

export function PageTitle({ showBackButton = true, ...props }: IPageTitle) {
  return (
    <div className={classNames('page-title pt-4 pb-9', props.className)}>
      {showBackButton && (
        <div className="page-title__to-dashboard">
          <LocaleNavLink exact to="/dashboard">
            <Svg href="arrow_left.svg" className="mr-3" />
            Back To Dashboard
          </LocaleNavLink>
        </div>
      )}
      <div className="page-title__context mt-7 mt-md-9 mt-lg-11">
        {props.icon && <Svg href={props.icon} />}
        <div className="title">{props.title}</div>
      </div>
    </div>
  );
}
