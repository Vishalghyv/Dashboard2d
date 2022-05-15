
const dt = require('./Towers.json')
console.log('THIS IS RELA', dt);

const TOTAL_COUNT = 100;
var parse = require('csv-parse')
// const data = require('./Test.js')
// const Papa = require('papaparse');
// 		console.log('PAPA' );
//     var file = new File([""], './new.csv');
// console.log(file);
// Papa.parse(file, {
// 	complete: function(results) {
// 		console.log('PAPA' );
//     console.log(results);
// 	}
// });

// Look through dt
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


export const susolvkaCoords = { lat: 40.694388000000, lng: -73.956820000000 };

export const markersData = finalResult
  