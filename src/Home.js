import React from "react";
import Flight from "./components/Flight/Flight";
import Voltela from "./voltela4.png";

const Home = () => {
  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <div className="App-header">
        <img src={Voltela} height={50} width={100} />
        <h1 style={{ paddingLeft: "10px" }}>
          Connectivity Assurance Dashboard
        </h1>
      </div>
      <Flight />
    </div>
  );
};

export default Home;
