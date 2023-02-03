import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line, Scatter } from "@ant-design/plots";
import styles from "./PacketsChart.module.css";

export const PacketsChart = ({ sinr, heading }) => {
  const [data, setData] = useState(sinr);

  const config = {
    // appendPadding: 10,
    autofit: true,
    data,
    yField: "index",
    xField: "value",
    shape: "circle",
    colorField: "type",
    size: 3,
    yAxis: {
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
      start: 0.1,
      end: 0.5,
    },
  };

  return <Scatter {...config} />;
};
