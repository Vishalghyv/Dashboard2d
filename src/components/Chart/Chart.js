import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";
import styles from "./Chart.module.css";

export const Chart = ({ sinr, divide, heading }) => {
  const [data, setData] = useState(sinr);
  const config = {
    data,
    padding: "auto",
    xField: "unix_time",
    yField: "value",
    slider: {
      start: 0.4,
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
        type: "region",
        start: ["min", "min"],
        end: ["max", divide[3]],
        style: {
          fill: "red",
        },
      },
      {
        type: "region",
        start: ["min", divide[3]],
        end: ["max", divide[2]],
        style: {
          fill: "blue",
        },
      },
      {
        type: "region",
        start: ["min", divide[2]],
        end: ["max", divide[1]],
        style: {
          fill: "black",
        },
      },
      {
        type: "region",
        start: ["min", divide[1]],
        end: ["max", divide[0]],
        style: {
          fill: "red",
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
      x1: { sync: "x1" },
      x2: { sync: "x1" },
    },
    xAxis: {
      title: {
        text: "time (s)",
      },
    },
    yAxis: {
      nice: true,
      max: -40,
    },
  };

  return (
    <div className="chart-heading">
      <>
        <h4>{heading}</h4>
      </>
      <Line {...config} height={300} />
    </div>
  );
};
