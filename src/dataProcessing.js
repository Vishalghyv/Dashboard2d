
const flight = require('./radiobases.json');
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    degrees = parseInt(degrees);
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);
    var dd = degrees + minutes/60 + seconds/(60*60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

function ParseDMS(input) {
    input = input.replace("' '", "'' ");
    // input = input.replace(".00", "");
    var parts = input.split(/[^\d\w]+/);
    var lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[4]);
    // var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    return lat;
}

function parseData(dt) {
    var result = [];

    for(var i in dt)
        result.push([i, dt [i]]);

    var finalResult = [];
    for(var i = 0; i < result.length && i < 500; i++) {
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


var result = [];
var tmp = [];
var index = 0
var si = 0
for(var i in flight) {
    si++;
}
var lng = new Set();
var count = 0;
var st = new Set();
for(var i in flight) {
    if (flight[i]['altitude(m)'] == 0 ) {
        break;
    }
    if (index > 3000) {
        result.push(tmp);
        break;
    }
    if (index% 500 == 0) {
        result.push(tmp);
        tmp = [];
    }
    index++;
    st.add(flight[i].TECNOLOGIA);
    var l = ParseDMS(flight[i].LONGITUD)
    tmp.push({
        id: i,
        lat: ParseDMS(flight[i].LATITUD),
        lng: l,
        network: flight[i].TECNOLOGIA,
    });
    lng.add(l);
}

export const susolvkaCoords = { lat: -0.15, lng: -78.49305555555556 };

export const markersData = result[1];
export const data2 = result[2];
export const data3 = result[3];
export const data4 = result[4];
export const data5 = result[5];