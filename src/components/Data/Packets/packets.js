const data = require("./packets.json");
let packets = [];
let udp = {};

let prevUnixTime = data[0].unix_time;
let prevUdp = -1;
let result = [[]];
let size = 1;
for (var i in data) {
  if (data[i].voice_counter == null) {
    continue;
  }
  if (parseInt(data[i].voice_counter) < parseInt(prevUdp)) {
    result.push([]);
    size++;
  }
  // let s = result[size - 1].length;
  // while (s != data[i].voice_counter) {
  //   result[size - 1].push(-1);
  //   s++;
  // }

  result[size - 1].push(data[i].unix_time - prevUnixTime);

  prevUdp = data[i].voice_counter;
}

for (var i in result) {
  let init = result[i][0];
  for (var j in result[i]) {
    let tmp = result[i][j];
    result[i][j] = result[i][j] - init;
    init = tmp;
  }
  result[i].shift();
}

let final = [];
result = [].concat(...result);
for (var i in result) {
  final.push({
    index: i,
    value: result[i],
    type: "voice",
  });
}

prevUdp = -1;
result = [[]];
size = 1;
for (var i in data) {
  if (data[i].udp_counter == null) {
    continue;
  }
  if (parseInt(data[i].udp_counter) < parseInt(prevUdp)) {
    result.push([]);
    size++;
  }
  // let s = result[size - 1].length;
  // while (s != data[i].udp_counter) {
  //   result[size - 1].push(-1);
  //   s++;
  // }

  result[size - 1].push(data[i].unix_time - prevUnixTime);

  prevUdp = data[i].udp_counter;
}

for (var i in result) {
  let init = result[i][0];
  for (var j in result[i]) {
    let tmp = result[i][j];
    result[i][j] = result[i][j] - init;
    init = tmp;
  }
  result[i].shift();
}

result = [].concat(...result);

for (var i in result) {
  final.push({
    index: i,
    value: result[i],
    type: "udp",
  });
}

export const udpP = final;

for (var i in data) {
  udp[data[i].udp_counter] = data[i].unix_time;
}

for (var i in data) {
  packets.push({
    unix_time: data[i].unix_time,
    type: "udp",
    value: 0,
  });
  packets.push({
    unix_time: data[i].unix_time,
    type: "voice",
    value: udp[data[i].voice_counter] - data[i].unix_time,
  });
}

export const pack = packets;
