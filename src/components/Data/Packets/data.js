export const getData = async () => {
  let url =
    "http://127.0.0.1:5000/network?tablename=tmo_merged_1644337260000&column=unix_time";
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
};

// const dataApi = async () => {
//   return await getData(
//     "http://127.0.0.1:5000/network?tablename=tmo_merged_1644337260000&column=unix_time"
//   ).then((data) => {
//     return data;
//   });
// };
// dataApi().then((data) => {
//   export const dt = data;
// });

// export const getData = async () => fetch("https://api.myjson.com/bins/mp441")
//   .then(response => response.json())
