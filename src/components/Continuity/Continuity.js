import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line, Scatter } from "@ant-design/plots";
import styles from "./PacketsChart.module.css";

export const Continuity = ({ sinr, heading }) => {
  const [data, setData] = useState(sinr);

  const config = {
    // appendPadding: 10,
    autofit: true,
    data,
    yField: "index",
    xField: "value",
    shape: "circle",
    colorField: "type",

    color: ({ type }) => {
      const colors10 = ["darkblue", "lightblue"];
      // custom colorMapping function
      const idx = data.map((d) => d.type).indexOf(type);
      return colors10[idx + 1];
    },
    size: 7,
    yAxis: {
      min: -0.5,
      max: 1.5,
      nice: true,
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
      title: {
        text: "Batch",
      },
    },
  };

  return <Scatter {...config} />;
};
