import React, { memo } from 'react';
import './Placeholder.scss';

export const Placeholder = memo(function Placeholder(props: { text: string }) {
  return (
    <div className="placeholder-wrapper">
      <h1>{props.text}</h1>
    </div>
  );
});
