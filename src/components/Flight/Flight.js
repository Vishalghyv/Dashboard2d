import React, { useEffect, useState } from "react";

import { GoogleMap } from "../GoogleMap/GoogleMap";
import { Radio, TreeSelect } from "antd";
import styles from "./Flight.module.css";
import { flightData } from "../Data/Flight1/flight_1";
// import { startTime, endTime, date } from "../Data/Packets/packets";
import { Chart } from "../Chart/Chart";
import { towers } from "../Data/Towers/Towers";
import { pack } from "../Data/Packets/packets";
import { PacketsChart } from "../PacketsChart/PacketsChart";
import { test } from "../Data/Packets/packets";
// import { avail, cont } from "../Data/Packets/availability";
import { AntDLine } from "../AntDLine/AntDLine";
import { Latency } from "../Latency/Latency";
import { Continuity } from "../Continuity/Continuity";
import { syncData } from "../Data/Sync/sync";
import { availabilityCalculation } from "../Data/Packets/availability";
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
  const [index, setIndex] = useState(25);
  const [syncDt, setSyncDt] = useState();
  const [SINRs, setSINRs] = useState();
  const [udpP, setudpP] = useState();
  const [avail, setAvail] = useState();
  const [cont, setCont] = useState();
  const [distance, setdistance] = useState();
  const [startTime, setstartTime] = useState();
  const [endTime, setendTime] = useState();
  const [date, setdate] = useState();
  const [filterVoiceBatch, setfilterVoiceBatch] = useState();
  const [filterUdpBatch, setfilterUdpBatch] = useState();
  const [flight, setFlightData] = useState();
  useEffect(() => {
    flightData().then((dt) => {
      setFlightData(dt);
      setSINRs(dt.sinr);
    });
    test().then((dt) => {
      setudpP(dt.udpPT);
      setdistance(dt.distanceT);
      setstartTime(dt.startTimeT);
      setendTime(dt.endTimeT);
      setdate(dt.dateT);
      setfilterUdpBatch(dt.filterUdpBatchT);
      setfilterVoiceBatch(dt.filterVoiceBatchT);
      let availability = availabilityCalculation(
        dt.filterUdpBatchT,
        dt.filterVoiceBatchT
      );
      setAvail(availability.avail);
      setCont(availability.cont);
    });
    syncData(index).then((dt) => {
      setSyncDt(dt);
      setIndex(index + 1);
    });
  }, []);

  const callSync = () => {
    syncData(index).then((dt) => {
      setSyncDt(dt);
      setIndex(index + 1);
    });
  };

  const onChange = (newValue) => {
    if (newValue === "flight_1") {
      setSINRs(flight.sinr);
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
      </Radio.Group>
      <div className={styles.floatDown}>
        <div className={styles.mapContainer}>
          {flight != undefined && (
            <GoogleMap
              flight={
                flightValue === "tower" ? flight?.flight_1 : flight?.flight_1
              }
              towers={towers}
              activeTowers={flight?.towers_1}
              changePoints={flight?.changePoints_1}
              startPoint={flight?.startPoint}
              endPoint={flight?.endPoint}
              startTime={startTime}
              endTime={endTime}
              date={date}
            />
          )}
        </div>
        <div className={styles.displayContainer}>
          <div className={styles.chartContainer} style={{ marginLeft: 0 }}>
            <div className={styles.chartTitle}>
              RSRP -
              <div
                onClick={() => {
                  callSync();
                }}
              >
                {"     "}
                Next
              </div>
            </div>
            <div className={styles.chart}>
              {syncDt != undefined && (
                <Chart sinr={syncDt?.rsrp} divide={[-80, -90, -100]} />
              )}
            </div>
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitle}>SINR</div>
            <div className={styles.chart}>
              {syncDt != undefined && (
                <Chart sinr={syncDt?.sinr} divide={[20, 13, 0]} />
              )}
            </div>
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitle}>Packets</div>
            <div className={styles.chart}>
              {udpP != undefined && <PacketsChart sinr={udpP} />}
            </div>
          </div>
        </div>
        <div className={styles.displayContainer}>
          <div className={styles.chartContainer} style={{ marginLeft: 0 }}>
            <div className={styles.chartTitle}>Availability</div>
            <div className={styles.chart}>
              {avail != undefined && <AntDLine sinr={avail} />}
            </div>
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitle}>
              Continuity {"("}one-way{")"}
            </div>
            <div className={styles.chart}>
              {cont != undefined && <Continuity sinr={cont} />}
            </div>
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitle}>Latency</div>
            <div className={styles.chart}>
              {distance != undefined && <Latency sinr={distance} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flight;
