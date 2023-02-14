export const getData = async (api, tablename, column, page = 1) => {
  let url =
    // "http://172.31.0.133:9021/" +
    "http://127.0.0.1:5000/" +
    api +
    "?tablename=" +
    tablename +
    "&column=" +
    column +
    "&page=" +
    page;
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
  return response.text();
};
