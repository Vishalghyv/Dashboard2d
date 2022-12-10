import { cellIdsToTower } from '../Towers/Towers';

const data = require('./flight_1.json');
let flight = [];
let values = [];
let towers = {};
let changePoints = {};
let index = 0;
for (var i in data) {
    flight.push({ "lat": data[i].Latitude, "lng": data[i].Longitude });
    // Convert unix time to time
    var date = new Date(data[i].unix_time * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var time = hours + ':' + minutes + ':' + seconds;

    values.push({ "value": data[i].RSRPs, "type": "RSRP", "unix_time": time });
    values.push({ "value": data[i].SINRs, "type": "SINR", "unix_time": time });
    // Note the points where new cell is connected
    if (cellIdsToTower[data[i].CellID] !== undefined && towers[cellIdsToTower[data[i].CellID].id] !== true ) {
        changePoints[index] = [{ "lat": data[i].Latitude, "lng": data[i].Longitude }, { "lat": cellIdsToTower[data[i].CellID].Lat, "lng": cellIdsToTower[data[i].CellID].Lon }];
        index++;
        if (index > 1) {
            let prev = index - 2;
            if (index > 2) {
                prev = index - 3;
            }
            changePoints[index] = [{ "lat": data[i].Latitude, "lng": data[i].Longitude }, changePoints[prev][1]];
            index++;

        }

        towers[cellIdsToTower[data[i].CellID].id] = true;
    }
}

const getTime = (unix_time) => {
    var date = new Date(unix_time * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}


const convertTo2DArrayTower = (data) => {
    const cells = [];

    let prevCellId = -1;
    for (var ind in data) {
      const { Latitude, Longitude, CellID} = data[ind];
  
      if (CellID !== prevCellId) {
        const cellArray = { CellID, data: [[]] };
        cells.push(cellArray);
  
        prevCellId = CellID;
      }
  
      cells[cells.length - 1].data[0].push({ "lat": Latitude, "lng": Longitude });
    }

    return cells;
  };

const convertTo2DArraySinr = (data) => {
    const cells = [];
    
    cells.push({ neg: -10, data: [] });
    cells.push({ neg: -5, data: [] });
    cells.push({ neg: 0, data: [] });
    cells.push({ neg: 5, data: [] });
    cells.push({ neg: 10, data: [] });
    let prevIndex = -1;
    for (var ind in data) {
      const { Latitude, Longitude, CellID, SINRs} = data[ind];
  
      if (SINRs < -10) {
        if (prevIndex !== 0) {
            cells[0].data.push([{ "lat": Latitude, "lng": Longitude }]);
            prevIndex = 0;
        } else {
            cells[0].data[cells[0].data.length - 1].push({ "lat": Latitude, "lng": Longitude });
        }
      } else if (SINRs < -5) {
        if (prevIndex !== 1) {
            cells[1].data.push([{ "lat": Latitude, "lng": Longitude }]);
            prevIndex = 1;
        } else {
            cells[1].data[cells[1].data.length - 1].push({ "lat": Latitude, "lng": Longitude });
        }
      } else if (SINRs < 0) {
        if (prevIndex !== 2) {
            cells[2].data.push([{ "lat": Latitude, "lng": Longitude }]);
            prevIndex = 2;
        } else {
            cells[2].data[cells[2].data.length - 1].push({ "lat": Latitude, "lng": Longitude });
        }
      } else if (SINRs < 5) {
        if (prevIndex !== 3) {
            cells[3].data.push([{ "lat": Latitude, "lng": Longitude }]);
            prevIndex = 3;
        } else {
            cells[3].data[cells[3].data.length - 1].push({ "lat": Latitude, "lng": Longitude });
        }
      } else {
        if (prevIndex !== 4) {
            cells[4].data.push([{ "lat": Latitude, "lng": Longitude }]);
            prevIndex = 4;
        } else {
            cells[4].data[cells[4].data.length - 1].push({ "lat": Latitude, "lng": Longitude });
        }
      }

    }

    return cells;
}
  
export const changePoints_1 = changePoints;

export const towers_1 = towers;
export const flight_1 = flight;
export const SINRs = values;
export const flight_1_towers = convertTo2DArrayTower(data);
export const flight_1_sinr = convertTo2DArraySinr(data);
export const startPoint = { "lat": data[0].Latitude, "lng": data[0].Longitude };
export const endPoint = { "lat": data[data.length - 1].Latitude, "lng": data[data.length - 1].Longitude };

export default data;

// RSRP, SINR, LTE Voice