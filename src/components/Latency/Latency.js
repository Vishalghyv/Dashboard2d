import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line, Scatter } from "@ant-design/plots";
import styles from "./PacketsChart.module.css";

export const Latency = ({ sinr, heading }) => {
  const [data, setData] = useState(sinr);

  const config = {
    // appendPadding: 10,
    autofit: true,
    data,
    yField: "index",
    xField: "value",
    shape: "circle",
    color: "lightgreen",

    pointStyle: {
      fill: "lightgreen",
      stroke: "lightgreen",
      opacity: 0.8,
    },
    size: 5,
    yAxis: {
      minLimit: -300,
      maxLimit: 2200,
      nice: true,
      line: {
        style: {
          stroke: "#aaa",
        },
      },
    },
    xAxis: {
      //   min: -100,
      grid: {
        line: {
          style: {
            stroke: "#eee",
          },
        },
      },
      line: {
        style: {
          stroke: "#aaa",
        },
      },
      title: {
        text: "time (s)",
      },
    },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return <Scatter {...config} />;
};
