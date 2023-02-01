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

var voiceArray = [];
var index = 0;
for (var key in voicePacket) {
  for (var ele in voicePacket[key]) {
    voiceArray.push({
      index: parseInt(key),
      value: voicePacket[key][ele] - initTime,
      type: "voice",
    });
  }
}

voiceArray.sort(function (a, b) {
  return a.value - b.value;
});
let error = [];

let prev = voiceArray[0];

for (var ele in voiceArray) {
  ele = parseInt(ele);
  if (ele == 0 || ele == voiceArray.length - 1) {
    continue;
  }

  let current = voiceArray[ele];
  let n = voiceArray[ele + 1];
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
}

error.sort(function (a, b) {
  return parseInt(a) - parseInt(b);
});
for (let i = error.length - 1; i >= 0; i--) {
  voiceArray.splice(error[i], 1);
}
voiceArray.splice(voiceArray.length - 1, 1);

let voiceBatch = [[]];
prev = voiceArray[0];
for (let ele in voiceArray) {
  if (prev.index > voiceArray[ele].index) {
    voiceBatch.push([]);
  }
  voiceBatch[voiceBatch.length - 1].push(voiceArray[ele]);
  prev = voiceArray[ele];
}

export const filterVoiceBatch = voiceBatch;

function findRegressionLine(data) {
  let x = 0,
    y = 0,
    xy = 0,
    x2 = 0;
  let n = data.length;

  for (let i = 0; i < n; i++) {
    x += data[i].value;
    y += data[i].index;
    xy += data[i].value * data[i].index;
    x2 += data[i].value * data[i].value;
  }

  let slope = (n * xy - x * y) / (n * x2 - x * x);
  let intercept = (y - slope * x) / n;

  return {
    slope: slope,
    intercept: intercept,
  };
}
var slopes = [];
for (var ele in voiceBatch) {
  slopes.push(findRegressionLine(voiceBatch[ele]));
}

console.log(slopes);
let udpArray = [];

for (var key in udpPacket) {
  for (var ele in udpPacket[key]) {
    udpArray.push({
      index: parseInt(key),
      value: udpPacket[key][ele] - initTime,
      type: "udp",
    });
    voiceArray.push({
      index: parseInt(key),
      value: udpPacket[key][ele] - initTime,
      type: "udp",
    });
  }
}

udpArray.sort(function (a, b) {
  return a.value - b.value;
});

let udpBatch = [[]];
prev = udpArray[0];
for (let ele in udpArray) {
  if (prev.index > udpArray[ele].index) {
    udpBatch.push([]);
  }
  udpBatch[udpBatch.length - 1].push(udpArray[ele]);
  prev = udpArray[ele];
}

export const filterUdpBatch = udpBatch;

function distanceBetweenPointAndProjection(line, point) {
  let A = line.slope;
  let C = line.intercept;
  let x = point.value;
  let y = point.index;

  let projectionX = (y - C) / A;
  // console.log({ A, C, x, y, projectionX });
  return x - projectionX;
}

var latency = [];
for (var batch in slopes) {
  for (var ele in udpBatch[batch]) {
    latency.push({
      value: udpBatch[batch][ele].value,
      index: distanceBetweenPointAndProjection(
        slopes[batch],
        udpBatch[batch][ele]
      ),
    });
  }
}

console.log(latency);

export const udpP = voiceArray;
export const distance = latency;

// Convert voicePacket array in to a one dimernsional array
// Where elements are inserted in formal {index: key, value: value}
