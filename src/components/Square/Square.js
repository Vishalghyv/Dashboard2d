import React from 'react';

const Square = ({color}) => {
  return (
    <svg width="100" height="100">
      <rect x="0" y="0" width="7" height="7"
        style={{fill: color, stroke: '#000', strokeWidth: 1}} />
    </svg>
  );
}

export default Square;
