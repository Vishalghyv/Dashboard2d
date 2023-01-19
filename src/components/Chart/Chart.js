import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import styles from './Chart.module.css';

export const Chart = ({sinr, divide, heading}) => {
  const [data, setData] = useState(sinr);
  const config = {
    data,
    padding: 'auto',
    xField: 'unix_time',
    yField: 'value',
    slider: {
      start: 0.1,
      end: 0.5,
    },
    annotations: [
      // {
      //   type: 'regionFilter',
      //   start: ['min', divide],
      //   end: ['max', 'min'],
      //   color: '#F4664A',
      // },
      {
        type: 'line',
        start: ['min', divide[0]],
        end: ['max', divide[0]],
        style: {
          stroke: 'green',
          lineDash: [4, 4],
        },
      },
      {
        type: 'line',
        start: ['min', divide[1]],
        end: ['max', divide[1]],
        style: {
          stroke: 'yellow',
          lineDash: [4, 4],
        },
      },
      {
        type: 'line',
        start: ['min', divide[2]],
        end: ['max', divide[2]],
        style: {
          stroke: 'orange',
          lineDash: [4, 4],
        },
      },
      {
        type: 'line',
        start: ['min', divide[3]],
        end: ['max', divide[3]],
        style: {
          stroke: 'red',
          lineDash: [4, 4],
        },
      },
    ],
    meta: {
      sale: {
        min: 0,
        max: 100,
      },
      tickCount: 4,
      x: { sync: true },
      y: { sync: true },
      x1: { sync: 'x1' },
      x2: { sync: 'x1' },
    },
    yAxis: {
      nice: true,
      max: -40
    }
  };

  return (
    <div className='chart-heading'>
      <>
        <h4>{heading}</h4>
      </>
      <Line {...config} height={300}/>
    </div>
  );
};
