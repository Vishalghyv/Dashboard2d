import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { SINRs } from '../Data/Flight1/flight_1';
export const Chart = () => {
  const [data, setData] = useState(SINRs);
    console.log(data);
  const config = {
    data,
    padding: 'auto',
    xField: 'unix_time',
    yField: 'SINRs',
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return <Line {...config} />;
};
