const data = require("./packets.json");
let packets = [];
const initTime = data[0].unix_time;
var voicePacket = {};

for (var i = 0; i < data.length; i++) {
  if (data[i].voice_counter == null) {
    continue;
  }
  if (voicePacket[data[i].voice_counter]) {
    voicePacket[data[i].voice_counter].push(data[i].unix_time);
  } else {
    voicePacket[data[i].voice_counter] = [data[i].unix_time];
  }
}

var udpPacket = {};

for (var i = 0; i < data.length; i++) {
  if (data[i].udp_counter == null) {
    continue;
  }
  if (udpPacket[data[i].udp_counter]) {
    udpPacket[data[i].udp_counter].push(data[i].unix_time);
  } else {
    udpPacket[data[i].udp_counter] = [data[i].unix_time];
  }
}

var oneDimensionalArray = [];
var index = 0;
for (var key in voicePacket) {
  for (var ele in voicePacket[key]) {
    oneDimensionalArray.push({
      index: parseInt(key),
      value: voicePacket[key][ele] - initTime,
      type: "voice",
    });
  }
}

oneDimensionalArray.sort(function (a, b) {
  return a.value - b.value;
});
console.log(oneDimensionalArray);
let error = [];

let prev = oneDimensionalArray[0];

for (var ele in oneDimensionalArray) {
  ele = parseInt(ele);
  if (ele == 0 || ele == oneDimensionalArray.length - 1) {
    continue;
  }

  let current = oneDimensionalArray[ele];
  let n = oneDimensionalArray[ele + 1];
  let bad = false;

  if (prev.index > current.index && current.index > n.index) {
    bad = true;
  }

  if (
    prev.index < current.index &&
    current.index > n.index &&
    prev.index < n.index
  ) {
    bad = true;
  }

  if (
    current.index < prev.index &&
    current.index < n.index &&
    n.index > prev.index
  ) {
    bad = true;
  }

  if (prev.index == n.index) {
    bad = true;
  }

  if (bad) {
    error.push(ele);
  }
  prev = current;
  // }
}

error.sort(function (a, b) {
  return parseInt(a) - parseInt(b);
});
console.log(error);
for (let i = error.length - 1; i >= 0; i--) {
  oneDimensionalArray.splice(error[i], 1);
}
oneDimensionalArray.splice(oneDimensionalArray.length - 1, 1);
console.log(oneDimensionalArray);

// for (var key in udpPacket) {
//   for (var ele in udpPacket[key]) {
//     oneDimensionalArray.push({
//       index: parseInt(key),
//       value: udpPacket[key][ele] - initTime,
//       type: "udp",
//     });
//   }
// }

export const udpP = oneDimensionalArray;

// Convert voicePacket array in to a one dimernsional array
// Where elements are inserted in formal {index: key, value: value}
