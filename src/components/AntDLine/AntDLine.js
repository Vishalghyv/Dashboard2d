import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";
// import styles from "./PacketsChart.module.css";

export const AntDLine = ({ sinr, heading }) => {
  const [data, setData] = useState(sinr);

  const config = {
    data,
    padding: "auto",
    xField: "index",
    yField: "value",
    seriesField: "type",

    xAxis: {
      // type: 'timeCat',
      tickCount: sinr.length,
    },
  };
  return <Line {...config} />;
};
