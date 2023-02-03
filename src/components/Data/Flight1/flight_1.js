import { cellIdsToTower } from "../Towers/Towers";

const data = require("./flight_1.json");
let flight = [];
let sinr_values = [];
let rsrp_values = [];
let prevTower = null;
let changePoints = {};
let towers = {};
let index = 0;
let initialTime = data[0].unix_time;
for (var i in data) {
  flight.push({ lat: data[i].Latitude, lng: data[i].Longitude });

  rsrp_values.push({
    value: data[i].RSRPs,
    type: "RSRP",
    unix_time: (data[i].unix_time - initialTime) / 1000,
  });
  sinr_values.push({
    value: data[i].SINRs,
    type: "SINR",
    unix_time: (data[i].unix_time - initialTime) / 1000,
  });
  // Note the points where new cell is connected
  if (
    cellIdsToTower[data[i].CellID] !== undefined &&
    cellIdsToTower[data[i].CellID].id !== prevTower
  ) {
    prevTower = cellIdsToTower[data[i].CellID].id;
    towers[cellIdsToTower[data[i].CellID].id] = true;
  }
}

const getTime = (unix_time) => {
  var date = new Date(unix_time * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var time = hours + ":" + minutes + ":" + seconds;
  return time;
};

const convertTo2DArrayTower = (data) => {
  const cells = [];

  let prevCellId = -1;
  let indi = 0;
  for (var ind in data) {
    const { Latitude, Longitude, CellID } = data[ind];

    if (CellID !== prevCellId) {
      const cellArray = { CellID, data: [[]] };
      cells.push(cellArray);

      if (prevCellId != -1) {
        let prev = indi - 2;
        if (indi == 1) {
          prev++;
        }
        changePoints[indi] = [
          { lat: data[ind].Latitude, lng: data[ind].Longitude },
          changePoints[prev][1],
        ];
        indi++;
      }

      if (cellIdsToTower[data[ind].CellID] !== undefined) {
        changePoints[indi] = [
          { lat: data[ind].Latitude, lng: data[ind].Longitude },
          {
            lat: cellIdsToTower[data[ind].CellID].Lat,
            lng: cellIdsToTower[data[ind].CellID].Lon,
          },
        ];
        indi++;
      }

      prevCellId = CellID;
    }

    cells[cells.length - 1].data[0].push({ lat: Latitude, lng: Longitude });
  }

  return cells;
};

const convertTo2DArraySinr = (data) => {
  const cells = [
    { neg: -10, data: [] },
    { neg: -5, data: [] },
    { neg: 0, data: [] },
    { neg: 5, data: [] },
    { neg: 10, data: [] },
  ];
  let prevIndex = -1;
  for (const { Latitude, Longitude, CellID, SINRs } of data) {
    let index;
    if (SINRs < -10) {
      index = 0;
    } else if (SINRs < -5) {
      index = 1;
    } else if (SINRs < 0) {
      index = 2;
    } else if (SINRs < 5) {
      index = 3;
    } else {
      index = 4;
    }

    if (index !== prevIndex) {
      cells[index].data.push([{ lat: Latitude, lng: Longitude }]);
      prevIndex = index;
    } else {
      cells[index].data[cells[index].data.length - 1].push({
        lat: Latitude,
        lng: Longitude,
      });
    }
  }
  return cells;
};

const convertTo2DArrayRsrp = (data) => {
  const cells = [
    { neg: -70, data: [] },
    { neg: -65, data: [] },
    { neg: -60, data: [] },
    { neg: -55, data: [] },
    { neg: -50, data: [] },
  ];
  let prevIndex = -1;
  for (const { Latitude, Longitude, CellID, RSRPs } of data) {
    let index;
    if (RSRPs < -70) {
      index = 0;
    } else if (RSRPs < -65) {
      index = 1;
    } else if (RSRPs < -60) {
      index = 2;
    } else if (RSRPs < -55) {
      index = 3;
    } else {
      index = 4;
    }

    if (index !== prevIndex) {
      cells[index].data.push([{ lat: Latitude, lng: Longitude }]);
      prevIndex = index;
    } else {
      cells[index].data[cells[index].data.length - 1].push({
        lat: Latitude,
        lng: Longitude,
      });
    }
  }
  return cells;
};

export const changePoints_1 = changePoints;

export const towers_1 = towers;
export const startTime = getTime(data[0].unix_time);
export const endTime = getTime(data[data.length - 1].unix_time);
export const flight_1 = flight;
export const SINRs = sinr_values;
export const RSRPs = rsrp_values;
export const flight_1_towers = convertTo2DArrayTower(data);
export const flight_1_sinr = convertTo2DArraySinr(data);
export const flight_1_rsrps = convertTo2DArrayRsrp(data);
export const startPoint = { lat: data[0].Latitude, lng: data[0].Longitude };
export const endPoint = {
  lat: data[data.length - 1].Latitude,
  lng: data[data.length - 1].Longitude,
};

export default data;

// RSRP, SINR, LTE Voice
