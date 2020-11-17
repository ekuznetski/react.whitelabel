import { ColNumberAttr } from '@domain/interfaces';
import classNames from 'classnames';
import { ELabels } from '@domain/enums';
import React from 'react';
import { Img, LabelView, LocaleNavLink, Svg } from '..';
import './PageTitle.scss';

type IPageTitle = {
  className?: string;
  icon?: string;
  title: string;
  description?: string | React.ReactFragment;
  showBackButton?: boolean;
  sizes?: {
    xs?: ColNumberAttr;
    sm?: ColNumberAttr;
    md?: ColNumberAttr;
    lg?: ColNumberAttr;
    xl?: ColNumberAttr;
  };
};

export function PageTitle({ showBackButton = true, sizes = { xs: 12 }, ...props }: IPageTitle) {
  return (
    <div className={classNames('page-title pt-4 pb-9', props.className)}>
      {showBackButton && (
        <div className="page-title__to-dashboard">
          <LocaleNavLink exact to="/dashboard">
            <Svg href="arrow_left" className="mr-3" />
            Back To Dashboard
          </LocaleNavLink>
        </div>
      )}
      <div className="d-flex justify-content-center">
        <div
          className={classNames(
            'page-title__context mt-7 mt-md-9 mt-lg-11',
            // @ts-ignore
            Object.keys(sizes).map((size) => `col-${size}-${sizes[size]}`),
          )}
        >
          <div className="title">
            <LabelView>
              {{
                '*': props.icon && <Svg href={props.icon} />,
                [ELabels.bsfx]: props.icon && <Img src={`${props.icon}.png`} height={75} className="mb-8" />,
              }}
            </LabelView>
            {props.title}
          </div>
          {props.description && <div className="description mt-5">{props.description}</div>}
        </div>
      </div>
    </div>
  );
}
