import React from "react";
import drone from "./Drone.png";
const Start = () => {
  return (
    <div>
      {/* <StartStyle network={this.props.network} /> */}
      <img
        src={drone}
        alt="image"
        style={{
          width: "25px",
          height: "25px",
          marginLeft: "-15px",
          marginBottom: "-15px",
        }}
      />
    </div>
  );
};

export default Start;
