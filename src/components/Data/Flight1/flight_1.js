const data = require('./flight_1.json');
let flight = [];
let values = [];
for(var i in data) {
    flight.push({"lat": data[i].Latitude, "lng": data[i].Longitude});
    // Convert unix time to time
    var date = new Date(data[i].unix_time * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var time = hours + ':' + minutes + ':' + seconds;

    values.push({"value": data[i].RSRPs, "type": "RSRP", "unix_time": time});
    values.push({"value": data[i].SINRs, "type": "SINR", "unix_time": time});
}

export const flight_1 = flight;
export const SINRs = values;

export default data;

// RSRP, SINR, LTE Voice