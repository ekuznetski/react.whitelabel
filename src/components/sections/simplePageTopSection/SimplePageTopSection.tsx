import React from 'react';
import { Row, SectionBg } from '@components/shared';
import { BackButton } from '@components/shared';
import './SimplePageTopSection.scss';

export function SimplePageTopSection({ title }: { title: string }) {
  return (
    <section>
      <SectionBg
        primary="header_bg.jpg"
        secondary={{
          xxs: 'header_bg_general_mobile.png',
          xs: 'header_bg_general_mobile.png',
          md: 'header_bg_general_tablet.png',
          lg: 'header_bg_general_desktop.png',
        }}
      />
      <div className="container">
        <Row>
          <div className="col-12 page-top__header">
            <div className="page-top__title">{title}</div>
            <div className="page-top__button">
              <BackButton />
            </div>
          </div>
        </Row>
      </div>
    </section>
  );
}
