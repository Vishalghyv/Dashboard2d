import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      <ReactLoading type={"balls"} color={"#12b5de"} height={125} width={150} />
      Please wait while we fetch data
    </div>
  );
}

export default Loading;
