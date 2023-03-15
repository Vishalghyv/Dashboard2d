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
      start: 0,
      end: 1,
    },
    color: "grey",
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
        end: ["max", divide[2]],
        style: {
          fill: "red",
        },
      },
      {
        type: "region",
        start: ["min", divide[2]],
        end: ["max", divide[1]],
        style: {
          fill: "orange",
        },
      },
      {
        type: "region",
        start: ["min", divide[1]],
        end: ["max", divide[0]],
        style: {
          fill: "yellow",
        },
      },
      {
        type: "region",
        start: ["min", divide[0]],
        end: ["max", "max"],
        style: {
          fill: "green",
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
      max: -50,
    },
  };

  return <Line {...config} />;
};
