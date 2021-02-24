import path from 'path';
import React from 'react';
import './SectionBg.scss';

interface ISectionBg {
  primary: string;
  secondary?: string;
}

export function SectionBg({ primary, secondary }: ISectionBg) {
  return (
    <div className="section-bg" style={{ background: `url(${`assets/${path.basename(primary)}`}) 50% 50% no-repeat` }}>
      {!!secondary && <div style={{ background: `url(${`assets/${path.basename(primary)}`}) 50% 50% no-repeat` }} />}
    </div>
  );
}
