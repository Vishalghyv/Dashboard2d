const data = require("./packets.json");

let prevUdp = -1;
let prevVoice = -1;
let udp = [[]];
let voice = [[]];

for (var i in data) {
  let current;
  let isUdp = true;
  if (data[i].udp_counter == null) {
    isUdp = false;
    current = data[i].voice_counter;
  } else {
    current = data[i].udp_counter;
  }

  if (isUdp && parseInt(current) < parseInt(prevUdp)) {
    udp.push([]);
  }

  if (!isUdp && parseInt(current) < parseInt(prevVoice)) {
    voice.push([]);
  }

  if (isUdp) {
    udp[udp.length - 1].push({ current: true });
    prevUdp = current;
  } else {
    voice[voice.length - 1].push({ current: true });
    prevVoice = current;
  }
}

let availability = [];

for (var i = 0; i < Math.min(voice.length, udp.length); i++) {
  let count = 0;
  for (let j = 0; j < 64; j++) {
    if (udp[i][j] || voice[i][j]) {
      count++;
    }
  }

  if (Math.floor((count / 64) * 100) < 5) {
    continue;
  }
  availability.push({ index: i, value: Math.floor((count / 64) * 100) });
}

export const avail = availability;
