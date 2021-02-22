import { SectionBg } from '@components/shared';
import { config as _config } from '@pages/main/about/About.config';
import React from 'react';

export const config = {
  ..._config,
  pageTopBg: (responsive: any) =>
    responsive.lg ? (
      <SectionBg img="about-page-top.jpg" />
    ) : responsive.sm ? (
      <SectionBg img="about-page-top-tablet.jpg" />
    ) : (
      <SectionBg img="about-page-top-mobile.png" />
    ),
};
