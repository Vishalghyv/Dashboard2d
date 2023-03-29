import { getData } from "../data";
export const initData = async (count = 1, page = 1) => {
  return getData(
    "init",
    "tmo_merged_1644337260000",
    "latitude",
    count,
    page
  ).then((data) => {
    return data;
  });
};
