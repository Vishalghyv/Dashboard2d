import { getData } from "../data";
export const countData = async (c, page = 1) => {
  return getData("count", "tmo_merged_1644337260000", "latitude", page).then(
    (data) => {
      return data;
    }
  );
};
