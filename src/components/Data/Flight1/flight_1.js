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

export const changePoints_1 = changePoints;

export const towers_1 = towers;
export const flight_1 = flight;
export const SINRs = values;

export default data;

// RSRP, SINR, LTE Voice