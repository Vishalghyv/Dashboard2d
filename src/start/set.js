import { getData } from "./data";

export const setData = async (proxy, lat, lon) => {
  return getData("start", proxy, lat, lon).then((data) => {
    return data;
  });
};
