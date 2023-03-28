import { cellIdsToTower } from "../Towers/Towers";
import { getData } from "../data";
export const sinrData = async (count = 1, page = 1) => {
  return getData(
    "sinr",
    "tmo_merged_1644337260000",
    "latitude",
    count,
    page
  ).then((data) => {
    data = data.replaceAll("'", '"');
    data = data.slice(1, -2);
    data = JSON.parse(data);

    let sinr_values = data["sinr"];

    return sinr_values;
  });
};
