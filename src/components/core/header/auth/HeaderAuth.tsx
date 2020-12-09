import { Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import { IHeaderDefaultProps } from '@domain/interfaces';
import classNames from 'classnames';
import React from 'react';
import { Container } from 'react-bootstrap';
import './HeaderAuth.scss';

export function HeaderAuth(props: IHeaderDefaultProps) {
  return (
    <div className={classNames('panel-menu', props.fixed && 'fixed')}>
      <Container>
        <div className="logo">
          <Svg className="m-auto" href="logo" _label />
          <Svg className="mx-auto mb-n5" href="logo" _label={ELabels.bsfx} height={58} />
        </div>
      </Container>
    </div>
  );
}
