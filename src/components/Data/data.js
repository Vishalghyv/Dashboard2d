export const getData = async (api, tablename, column, count = 1, page = 1) => {
  let url =
    // "https://c112-103-112-17-59.in.ngrok.io/" +
    "http://127.0.0.1:5000/" +
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
