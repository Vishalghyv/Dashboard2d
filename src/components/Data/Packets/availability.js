import { filterUdpBatch } from "./packets";
import { filterVoiceBatch } from "./packets";

let availability = [];
let continuity = [];
for (var ele in filterUdpBatch) {
  availability.push({
    index: parseInt(ele),
    value: (filterUdpBatch[ele].length * 100) / 64,
    type: "udp",
  });
}

for (var batch in filterVoiceBatch) {
  let voice = {};
  let udp = {};
  let count = 0;
  for (var ele in filterVoiceBatch[batch]) {
    voice[filterVoiceBatch[batch][ele].index] = true;
  }

  for (var ele in filterUdpBatch[batch]) {
    if (voice[filterUdpBatch[batch][ele].index] == true) {
      count++;
    }
    udp[filterUdpBatch[batch][ele].index] = true;
  }
  availability.push({
    index: parseInt(batch),
    value: (count * 100) / 64,
    type: "voltela",
  });

  var udpC = true;
  var voiceC = true;
  for (var ele = 0; ele < 64; ele++) {
    if (udp[ele] != true) {
      udpC = false;
    }

    if (udp[ele] != true && voice[ele] != true) {
      voiceC = false;
      break;
    }
  }

  continuity.push({
    value: parseInt(batch) + 1.1,
    index: udpC ? 1 : 0,
    type: "udp",
  });
  continuity.push({
    value: parseInt(batch) + 1,
    index: voiceC ? 1 : 0,
    type: "voltela",
  });
}

export const avail = availability;
export const cont = continuity;
