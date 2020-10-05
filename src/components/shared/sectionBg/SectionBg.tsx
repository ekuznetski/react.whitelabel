import path from 'path';
import React from 'react';
import './SectionBg.scss';

interface ISectionBg {
  img: string;
}

export function SectionBg({ img }: ISectionBg) {
  return (
    <div
      className="section-bg"
      style={{ background: `url(${`assets/${path.basename(img)}`}) 50% 50% no-repeat` }}
    ></div>
  );
}
