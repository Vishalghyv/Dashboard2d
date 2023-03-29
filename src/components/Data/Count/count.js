import { getData } from "../data";
export const countData = async (page = 1) => {
  return getData("count", "tmo_merged_1644337260000", "latitude", 1, page).then(
    (data) => {
      return data;
    }
  );
};
