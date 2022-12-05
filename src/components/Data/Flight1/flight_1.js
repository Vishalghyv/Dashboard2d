const data = require('./flight_1.json');
let sinrs = [];
for(var i in data) {
    sinrs.push({"lat": data[i].Latitude, "lng": data[i].Longitude});
}

export const flight_1 = sinrs;
export const SINRs = data;

export default data;