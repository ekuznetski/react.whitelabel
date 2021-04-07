import React, { memo } from 'react';
import './Placeholder.scss';

interface IPlaceholder {
  text?: string;
}

export const Placeholder = memo(function Placeholder({ text }: IPlaceholder) {
  return (
    <div className="placeholder-wrapper">
      <div className="placeholder-text">{text}</div>
    </div>
  );
});
