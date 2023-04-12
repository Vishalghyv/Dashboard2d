import React, { useState } from "react";
import Form from "./Form";
// import "./Start.css"; // Import CSS file for styling
import Voltela from "./voltela4.png";

const Start = () => {
  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <div className="App-header">
        <img src={Voltela} height={50} width={100} />
        <h1 style={{ paddingLeft: "10px" }}>
          Connectivity Assurance Dashboard
        </h1>
      </div>
      <Form />
    </div>
  );
};

export default Start;
