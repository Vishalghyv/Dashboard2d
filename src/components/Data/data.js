export const getData = async (api, tablename, column, count = 1, page = 1) => {
  let url =
    // "https://1134-54-92-141-149.ngrok.io/" +
    "http://127.0.0.1:9021/" +
    api +
    "?tablename=" +
    tablename +
    "&column=" +
    column +
    "&page=" +
    page +
    "&count=" +
    count;
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.text();
};
