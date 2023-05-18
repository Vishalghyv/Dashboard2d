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
import { rsrpData } from "../Data/RSRP/rsrp";
import { syncData } from "../Data/Sync/sync";
import { availabilityCalculation } from "../Data/Packets/availability";
import Loading from "./Loading/Loading";
import { sinrData } from "../Data/SINR/sinr";
import { LineChart } from "../Line/Line";
import { countData } from "../Data/Count/count";
import { initData } from "../Data/Init/init";

function Flight() {
  const [value, setValue] = useState(1);
  const [index, setIndex] = useState(1);
  const [init, setInit] = useState(true);
  const [syncDt, setSyncDt] = useState();
  const [SINRs, setSINRs] = useState();
  const [udpP, setudpP] = useState();
  const [avail, setAvail] = useState();
  const [cont, setCont] = useState();
  const [dist, setDist] = useState();
  const [startTime, setstartTime] = useState();
  const [endTime, setendTime] = useState();
  const [date, setdate] = useState();
  const [filterVoiceBatch, setfilterVoiceBatch] = useState();
  const [filterUdpBatch, setfilterUdpBatch] = useState();
  const [flight, setFlightData] = useState();
  const [rsrp, setRsrp] = useState();
  const [sinr, setSinr] = useState();
  const [treeData, setTreeData] = useState([]);
  let mi = 0;
  let mx = 100;
  const [loading, setLoading] = useState(true);

  const setCountData = (count) => {
    let tData = [];
    // Convert flightCount to number
    count = Number(count);
    for (let i = 0; i < count; i++) {
      tData.push({
        value: i + 1,
        title: i + 1 == 2 ? "flight_2023-15-05" : "flight_2023-15-05",
      });
    }
    setTreeData(tData);
  };

  const getCountData = async () => {
    countData().then((dt) => {
      setCountData(dt);
    });
  };

  const initApi = async (count) => {
    setLoading(true);
    await initData(count, 1).then((dt) => {
      setLoading(false);
    });
  };

  const initialize = async () => {
    setLoading(true);

    await getCountData()
      .then(async () => {
        // Wait for 3 seconds
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        await initApi(1).then(async () => {
          setValues(1, true);
        });
      })
      .then((dt) => {
        setLoading(false);
      });
  };

  const setValues = async (ind, new_flight = false) => {
    console.log("Getting data for flight: " + ind);
    setLoading(true);

    await flightData(ind, new_flight).then(async (dt) => {
      if (new_flight) {
        setFlightData(dt);
      }
      setInit(false);
      // setSINRs(dt.sinr);
      await rsrpData(ind).then((dt) => {
        setRsrp(dt);
      });
      await sinrData(ind).then((dt) => {
        setSinr(dt);
      });
      await test(ind).then(async (dt) => {
        setudpP(dt.udpPT);
        setDist(dt.distanceT);
        setstartTime(dt.startTimeT);
        setendTime(dt.endTimeT);
        setdate(dt.dateT);
        setfilterUdpBatch(dt.filterUdpBatchT);
        setfilterVoiceBatch(dt.filterVoiceBatchT);
        let availability = await availabilityCalculation(
          dt.filterUdpBatchT,
          dt.filterVoiceBatchT
        );
        setAvail(availability.avail);
        setCont(availability.cont);
      });
    });
    setLoading(false);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  useEffect(() => {
    initialize().then(() => {
      setLoading(false);
    });
  }, []);

  const callIncrease = async () => {
    await setValues(index + 1, false).then(() => {
      setIndex(index + 1);
      setLoading(false);
    });
  };

  const callDecrease = async () => {
    if (index == 1) {
      return;
    }
    await setValues(index - 1, false).then(() => {
      setIndex(index - 1);
      setLoading(false);
    });
  };

  const onFlightChange = async (newValue) => {
    await initApi(newValue).then(async () => {
      await setValues(1, true).then(() => {
        setIndex(1);
        setLoading(false);
      });
    });
  };

  const onChange = (newValue) => {
    setValue(newValue);
    onFlightChange(newValue);
  };
  const [flightValue, setFlightValue] = useState(
    window.localStorage.getItem("flightValue") || "sinr"
  );

  const refreshPage = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div
        style={{
          height: "90%",
          width: "100%",
          backgroundColor: "grey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

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
      {/* <Radio.Group value={flightValue} onChange={setFlight}>
        <Radio.Button value="sinr">SINR</Radio.Button>
        <Radio.Button value="rsrp">RSRP</Radio.Button>
      </Radio.Group> */}
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
        <div>
          Data shown for {index}
          {index == 1
            ? "st"
            : index == 2
            ? "nd"
            : index == 3
            ? "rd"
            : "th"}{" "}
          batch
          <br />
          <Radio.Group value={"test"}>
            <Radio.Button value="prev" onClick={callDecrease}>
              Prev
            </Radio.Button>
            <Radio.Button value="next" onClick={callIncrease}>
              Next
            </Radio.Button>
          </Radio.Group>
          <br />
        </div>
        <div className={styles.displayContainer}>
          <div className={styles.chartContainer} style={{ marginLeft: 0 }}>
            <div className={styles.chartTitle}>RSRP</div>
            <div className={styles.chart}>
              {rsrp != undefined && (
                <Chart sinr={rsrp} divide={[-80, -90, -100]} />
                // <LineChart rsrp={rsrp} />
              )}
            </div>
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitle}>SINR</div>
            <div className={styles.chart}>
              {sinr != undefined && <Chart sinr={sinr} divide={[20, 13, 0]} />}
            </div>
          </div>
        </div>
        <div className={styles.displayContainer}>
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
          {/* <div className={styles.chartContainer}>
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
              {dist != undefined && <Latency sinr={dist} />}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Flight;
