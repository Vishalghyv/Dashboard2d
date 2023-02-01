import React, { useState } from "react";

import { GoogleMap } from "../GoogleMap/GoogleMap";
import { Radio, TreeSelect } from "antd";
import styles from "./Flight.module.css";
import {
  endPoint,
  flight_1_sinr,
  flight_1_towers,
  startTime,
  startPoint,
} from "../Data/Flight1/flight_1";
import { Chart } from "../Chart/Chart";
import { SINRs as SINR1 } from "../Data/Flight1/flight_1";
import { RSRPs as RSRP1 } from "../Data/Flight1/flight_1";
import { flight_1 } from "../Data/Flight1/flight_1";
import { towers_1 } from "../Data/Flight1/flight_1";
import { towers } from "../Data/Towers/Towers";
import { changePoints_1 } from "../Data/Flight1/flight_1";
import { pack } from "../Data/Packets/packets";
import { PacketsChart } from "../PacketsChart/PacketsChart";
import { udpP } from "../Data/Packets/packets";
import { avail } from "../Data/Packets/availability";
import { AntDLine } from "../AntDLine/AntDLine";
const treeData = [
  {
    value: "flight_1",
    title: "flight 1",
  },
  {
    value: "flight_2",
    title: "flight 2",
  },
  {
    value: "flight_3",
    title: "flight 3",
  },
  {
    value: "flight_4",
    title: "flight 4",
  },
];

function Flight() {
  const [value, setValue] = useState("flight_1");
  const [SINRs, setSINRs] = useState(SINR1);
  const onChange = (newValue) => {
    if (newValue === "flight_1") {
      setSINRs(SINR1);
    }
    setValue(newValue);
  };
  const [flightValue, setFlightValue] = useState(
    window.localStorage.getItem("flightValue") || "sinr"
  );

  const refreshPage = () => {
    window.location.reload();
  };

  const setFlight = (e) => {
    if (e.target.value !== flightValue) {
      window.localStorage.setItem("flightValue", e.target.value);
      setFlightValue(e.target.value);
      refreshPage();
    }
  };

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "white",
      }}
    >
      <h2>Flight</h2>
      <div className={styles.treeContainer}>
        <TreeSelect
          showSearch
          style={{
            width: "100%",
          }}
          value={value}
          dropdownStyle={{
            maxHeight: 400,
            overflow: "auto",
          }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={onChange}
          treeData={treeData}
        />
      </div>
      <Radio.Group value={flightValue} onChange={setFlight}>
        <Radio.Button value="sinr">SINR</Radio.Button>
        <Radio.Button value="rsrp">RSRP</Radio.Button>
        <Radio.Button value="udp">UDP</Radio.Button>
        <Radio.Button value="voice">Voice</Radio.Button>
      </Radio.Group>
      <div className={styles.floatDown}>
        <div className={styles.mapContainer}>
          <GoogleMap
            flight={flightValue === "tower" ? flight_1_towers : flight_1_sinr}
            towers={towers}
            activeTowers={towers_1}
            changePoints={changePoints_1}
            startPoint={startPoint}
            endPoint={endPoint}
            startTime={startTime}
          />
        </div>
        <div className={styles.displayContainer}>
          <div className={styles.chartContainer}>
            <Chart
              sinr={RSRP1}
              divide={[-50, -55, -60, -70]}
              heading={"RSRP"}
            />
          </div>
          <div className={styles.chartContainer}>
            <Chart sinr={SINR1} divide={[20, 13, 0, -10]} heading={"SINR"} />
          </div>
          <div className={styles.chartContainer}>
            <PacketsChart sinr={udpP} heading={"SINR"} />
          </div>
          <div className={styles.chartContainer}>
            <AntDLine sinr={avail} heading={"Availability"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flight;
