import { LocaleLink, Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import classNames from 'classnames';
import React from 'react';
import { Container } from 'react-bootstrap';
import './HeaderGeneral.scss';

export function HeaderGeneral(props: IHeaderDefaultProps) {
  return (
    <div className={classNames('panel-menu', props.fixed && 'fixed')}>
      <Container>
        <LocaleLink to="" className="logo">
          <Svg className="m-auto" href="logo" _label />
          <Svg className="mx-auto mb-n5" href="logo" _label={ELabels.bsfx} height={58} />
        </LocaleLink>
      </Container>
    </div>
  );
}
