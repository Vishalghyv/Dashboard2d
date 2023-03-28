import { cellIdsToTower } from "../Towers/Towers";
import { getData } from "../data";
export const flightData = async (count = 1, page = 1) => {
  return getData(
    "flight",
    "tmo_merged_1644337260000",
    "latitude",
    count,
    page
  ).then((data) => {
    data = data.replaceAll("'", '"');
    data = data.slice(1, -2);
    data = JSON.parse(data);

    // const data = require("./flight_1.json");
    let flight = data["flight"];

    return {
      changePoints_1: {},
      towers_1: {},
      flight_1: flight,
      flight_1_towers: [],
      flight_1_sinr: [],
      flight_1_rsrps: [],
      startPoint: { lat: flight[0]?.lat, lng: flight[0]?.lng },
      endPoint: {
        lat: flight[flight.length - 1]?.lat,
        lng: flight[flight.length - 1]?.lng,
      },
    };
  });
};
