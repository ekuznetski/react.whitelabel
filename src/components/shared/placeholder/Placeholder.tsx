import React, { memo } from 'react';
import './Placeholder.scss';

export const Placeholder = memo(function Placeholder({ text }: { text: string }) {
  return (
    <div className="placeholder-wrapper">
      <h1>{text}</h1>
    </div>
  );
});
