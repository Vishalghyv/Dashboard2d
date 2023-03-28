import { cellIdsToTower } from "../Towers/Towers";
import { getData } from "../data";
export const syncData = async (count = 1, page = 1) => {
  return getData(
    "sync",
    "tmo_merged_1644337260000",
    "latitude",
    count,
    page
  ).then((data) => {
    data = data.replaceAll("'", '"');
    data = JSON.parse(data);
    // data = data.filter(function (item) {
    //   return !(
    //     item.latitude === "None" &&
    //     item.longitude === "None" &&
    //     item.rsrp === "None" &&
    //     item.sinr === "None"
    //   );
    // });

    // data = data.slice(0, 1000);

    // const data = require("./flight_1.json");
    let sinr_values = data["sinr"];
    let rsrp_values = data["rsrp"];

    return {
      sinr: sinr_values,
      rsrp: rsrp_values,
    };
  });
};
