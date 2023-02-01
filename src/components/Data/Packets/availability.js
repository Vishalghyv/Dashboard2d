import { filterUdpBatch } from "./packets";
import { filterVoiceBatch } from "./packets";
const data = require("./packets.json");

console.log(filterUdpBatch);
console.log(filterVoiceBatch);

let availability = [];
for (var ele in filterUdpBatch) {
  availability.push({
    index: parseInt(ele),
    value: (filterUdpBatch[ele].length * 100) / 64,
    type: "udp",
  });
}

for (var batch in filterVoiceBatch) {
  let voice = {};
  let count = 0;
  for (var ele in filterVoiceBatch[batch]) {
    voice[filterVoiceBatch[batch][ele].index] = true;
  }

  for (var ele in filterUdpBatch[batch]) {
    if (voice[filterUdpBatch[batch][ele].index] == true) {
      count++;
    }
  }
  availability.push({
    index: parseInt(batch),
    value: (count * 100) / 64,
    type: "voltela",
  });
}

export const avail = availability;
