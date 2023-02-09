import { cellIdsToTower } from "../Towers/Towers";
import { getData } from "../data";
export const flightData = async () => {
  return getData("gps", "tmo_merged_1644337260000", "latitude").then((data) => {
    data = data.replaceAll("'", '"');
    data = JSON.parse(data);
    data = data.filter(function (item) {
      return !(
        item.latitude === "None" &&
        item.longitude === "None" &&
        item.rsrp === "None" &&
        item.sinr === "None"
      );
    });

    // data = data.slice(0, 1000);

    // const data = require("./flight_1.json");
    let flight = [];
    let sinr_values = [];
    let rsrp_values = [];
    let prevTower = null;
    let changePoints = {};
    let towers = {};
    let index = 0;
    let initialTime = data[0].unix_time;
    for (var i in data) {
      let { latitude, longitude, rsrp, sinr } = data[i];
      if (!(isNaN(latitude) && isNaN(longitude))) {
        flight.push({ lat: latitude, lng: longitude });
      }
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);
      rsrp = parseFloat(rsrp);
      sinr = parseFloat(sinr);

      rsrp_values.push({
        value: rsrp,
        type: "RSRP",
        unix_time: (data[i].unix_time - initialTime) / 1000,
      });
      sinr_values.push({
        value: sinr,
        type: "SINR",
        unix_time: (data[i].unix_time - initialTime) / 1000,
      });
      // Note the points where new cell is connected
      if (
        cellIdsToTower[data[i].cid] !== undefined &&
        cellIdsToTower[data[i].cid].id !== prevTower
      ) {
        prevTower = cellIdsToTower[data[i].cid].id;
        towers[cellIdsToTower[data[i].cid].id] = true;
      }
    }

    const convertTo2DArrayTower = (data) => {
      const cells = [];

      let prevCellId = -1;
      let indi = 0;
      for (var ind in data) {
        let { latitude, longitude, cid } = data[ind];

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        if (isNaN(latitude) && isNaN(longitude)) {
          continue;
        }
        if (cid !== prevCellId) {
          const cellArray = { cid, data: [[]] };
          cells.push(cellArray);

          if (prevCellId != -1) {
            let prev = indi - 2;
            if (indi == 1) {
              prev++;
            }
            changePoints[indi] = [
              { lat: data[ind].latitude, lng: data[ind].longitude },
              changePoints[prev][1],
            ];
            indi++;
          }

          if (cellIdsToTower[data[ind].cid] !== undefined) {
            changePoints[indi] = [
              { lat: data[ind].latitude, lng: data[ind].longitude },
              {
                lat: cellIdsToTower[data[ind].cid].Lat,
                lng: cellIdsToTower[data[ind].cid].Lon,
              },
            ];
            indi++;
          }

          prevCellId = cid;
        }

        cells[cells.length - 1].data[0].push({ lat: latitude, lng: longitude });
      }

      return cells;
    };

    const convertTo2DArraySinr = (data) => {
      const cells = [
        { neg: -0, data: [] },
        { neg: 13, data: [] },
        { neg: 20, data: [] },
        { neg: 25, data: [] },
      ];

      let prevIndex = -1;
      for (let { latitude, longitude, cid, sinr } of data) {
        sinr = parseFloat(sinr);
        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        if (isNaN(latitude) && isNaN(longitude)) {
          continue;
        }
        let index;
        if (sinr < 0) {
          index = 3;
        } else if (sinr < 13) {
          index = 2;
        } else if (sinr < 20) {
          index = 1;
        } else {
          index = 0;
        }

        if (index !== prevIndex) {
          cells[index].data.push([{ lat: latitude, lng: longitude }]);
          prevIndex = index;
        } else {
          cells[index].data[cells[index].data.length - 1].push({
            lat: latitude,
            lng: longitude,
          });
        }
      }
      return cells;
    };

    const convertTo2DArrayRsrp = (data) => {
      const cells = [
        { neg: -100, data: [] },
        { neg: -90, data: [] },
        { neg: -80, data: [] },
        { neg: -50, data: [] },
      ];
      let prevIndex = -1;
      for (const { latitude, longitude, cid, rsrp } of data) {
        let index;
        if (rsrp < -100) {
          index = 0;
        } else if (rsrp < -90) {
          index = 1;
        } else if (rsrp < -80) {
          index = 2;
        } else {
          index = 3;
        }

        if (index !== prevIndex) {
          cells[index].data.push([{ lat: latitude, lng: longitude }]);
          prevIndex = index;
        } else {
          cells[index].data[cells[index].data.length - 1].push({
            lat: latitude,
            lng: longitude,
          });
        }
      }
      return cells;
    };

    return {
      changePoints_1: changePoints,
      towers_1: towers,
      flight_1: flight,
      sinr: sinr_values,
      rsrp: rsrp_values,
      flight_1_towers: convertTo2DArrayTower(data),
      flight_1_sinr: convertTo2DArraySinr(data),
      flight_1_rsrps: convertTo2DArrayRsrp(data),
      startPoint: { lat: flight[0].lat, lng: flight[0].lng },
      endPoint: {
        lat: flight[flight.length - 1].lat,
        lng: flight[flight.length - 1].lng,
      },
    };
  });
};
flightData();

// export const changePoints_1 = changePoints;

// export const towers_1 = towers;

// export const flight_1 = flight;
// export const sinr = sinr_values;
// export const rsrp = rsrp_values;
// export const flight_1_towers = convertTo2DArrayTower(data);
// export const flight_1_sinr = convertTo2DArraySinr(data);
// export const flight_1_rsrps = convertTo2DArrayRsrp(data);
// export const startPoint = { lat: data[0].latitude, lng: data[0].longitude };
// export const endPoint = {
//   lat: data[data.length - 1].latitude,
//   lng: data[data.length - 1].longitude,
// };

// RSRP, SINR, LTE Voice
