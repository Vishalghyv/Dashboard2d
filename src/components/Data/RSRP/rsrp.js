import { cellIdsToTower } from "../Towers/Towers";
import { getData } from "../data";
export const rsrpData = async (page = 1) => {
  return getData("rsrp", "tmo_merged_1644337260000", "latitude", page).then(
    (data) => {
      data = data.replaceAll("'", '"');
      data = data.slice(1, -2);
      data = JSON.parse(data);

      let rsrp_values = data["rsrp"];
      return rsrp_values;
    }
  );
};
