const  towers = require('./Towers.json')
const flight = require('./flight.json')

function parseData(dt) {
    var result = [];

    for(var i in dt)
        result.push([i, dt [i]]);

    var finalResult = [];
    for(var i = 0; i < result.length && i < 500; i++) {
        // console.log(result[i][1]);
    finalResult.push({
        id: i,
        lat: result[i][1].Lat,
        lng: result[i][1].Lon,
    });
    }

    return finalResult;
}

function parseFlightData(dt) {

    var finalResult = [];
    var index = 0
    for(var i in dt) {
        // console.log(dt[i]['altitude(m)'])
        if (dt[i]['altitude(m)'] == 0 ) {
            break;
        }
        // if (index > 500) {
        //     break;
        // }
        index++;
        finalResult.push({
            id: i,
            lat: dt[i].latitude,
            lng: dt[i].longitude,
            rsrp: dt[i].RSRP,
            cell: dt[i].CellID,

        });
    }
    var newResult = [];
    for(var i = 0; i < finalResult.length; i++) {
        if (newResult.length == 0) {
            newResult.push(finalResult[i]);
        } else {
            var last = newResult[newResult.length - 1];
            if (!(last.lat - finalResult[i].lat < 0.00004 && last.lat - finalResult[i].lat > -0.00004)) {
                newResult.push(finalResult[i]);
            }
        }
    }
    return newResult;
}

var res = parseFlightData(flight);
console.log(res.length)
var st = new Set();
for(var i in res) {
    st.add(res[i].cell);
}

console.log(st.size);

var connectedTowers = [];
let a = Array.from(st);
for(var i in a) {
    var curr = a[i]
    curr = curr.substring(0, 5);
    var value = parseInt(curr, 16);
    var tow = towers[value.toString()];
    curr = a[i]
    value = parseInt(curr, 16);
    var cell = tow.Cells[value.toString()];
    if (typeof cell === 'undefined') {
        console.log(tow);
        continue;
    }
    connectedTowers.push({
        dir: cell.Dir,
        lat: tow.Lat,
        lng: tow.Lon,
    });
}

var result = parseData(towers);

export const resF = res;
export const resultF = result;
export const connectedTowersF = connectedTowers;