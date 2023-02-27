import React, { useState, useEffect, useMemo } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Scatter } from "react-chartjs-2";
import * as faker from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
const labels = [100, 200, 300, 400, 500, 600, 700];

const options = {
  // fill: true,
  // responsive: true,
  // plugins: {
  //   legend: {
  //     display: true,
  //   },
  // },
};

export const LineChart = ({ rsrp }) => {
  const value = rsrp["value"];
  const label = rsrp["unix"];
  const data = useMemo(function () {
    return {
      labels: label,
      datasets: [
        {
          id: 1,
          label: "RSRP",
          data: value,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }, []);

  return <Line datasetIdKey="id" data={data} options={options} />;
};
