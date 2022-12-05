import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';

export const Chart = ({sinr}) => {
  const [data, setData] = useState(sinr);
  const config = {
    data,
    padding: 'auto',
    xField: 'unix_time',
    yField: 'value',
    seriesField: 'type',
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return <Line {...config} />;
};
