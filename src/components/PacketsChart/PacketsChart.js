import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line, Scatter } from "@ant-design/plots";
import styles from "./PacketsChart.module.css";

export const PacketsChart = ({ sinr, heading }) => {
  const [data, setData] = useState(sinr);
  //   const config = {
  //     data,
  //     padding: "auto",
  //     xField: "unix_time",
  //     yField: "udp",
  //     slider: {
  //       start: 0.1,
  //       end: 0.5,
  //     },
  //   };

  //   return (
  //     <div className="chart-heading">
  //       <>
  //         <h4>{heading}</h4>
  //       </>
  //       <Line {...config} height={300} />
  //     </div>
  //   );

  const config = {
    // appendPadding: 10,
    autofit: true,
    data,
    xField: "index",
    yField: "value",
    shape: "circle",
    colorField: "type",
    size: 4,
    yAxis: {
      //   min: 0,
      //   max: 4,
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
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return <Scatter {...config} />;
};
