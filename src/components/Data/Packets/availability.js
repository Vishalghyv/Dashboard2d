export const availabilityCalculation = async (
  filterUdpBatch,
  filterVoiceBatch
) => {
  let availability = [];
  let continuity = [];
  console.log(filterUdpBatch);
  for (var ele in filterUdpBatch) {
    if (filterUdpBatch[ele][0] == undefined) {
      continue;
    }
    availability.push({
      index: parseFloat(filterUdpBatch[ele][0].value).toFixed(3),
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
      if (filterUdpBatch[batch][ele] == undefined) {
        continue;
      }
      if (voice[filterUdpBatch[batch][ele].index] == true) {
        count++;
      }
      udp[filterUdpBatch[batch][ele].index] = true;
    }
    if (
      filterUdpBatch[batch] != undefined &&
      filterUdpBatch[batch][0] != undefined
    ) {
      availability.push({
        index: parseFloat(filterUdpBatch[batch][0].value).toFixed(3),
        value: (count * 100) / 64,
        type: "voltela",
      });
    }

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

    if (
      filterVoiceBatch[batch] == undefined ||
      filterVoiceBatch[batch][0] == undefined
    ) {
      continue;
    }

    continuity.push({
      value: parseFloat(filterVoiceBatch[batch][0].value).toFixed(3),
      index: udpC ? 1 : 0,
      type: "udp",
    });
    continuity.push({
      value: parseFloat(filterVoiceBatch[batch][0].value).toFixed(3),
      index: voiceC ? 1 : 0,
      type: "voltela",
    });
  }
  return {
    avail: availability,
    cont: continuity,
  };
};
