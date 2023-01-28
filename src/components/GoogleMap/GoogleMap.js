import ReactDOM from "react-dom";
import React from "react";
import GoogleMapReact from "google-map-react";

import Drone from "../Drone";

import mapStyles from "./mapStyles.json";
import { markersData } from "../../dataProcessing";

import MapWrapper from "./MapWrapper";
import { flight_1 } from "../Data/Flight1/flight_1";
import Square from "../Square/Square";
import Start from "../Square/Start";
// const env = dotenv.config().parsed;
const MAP = {
  defaultZoom: 17,
  defaultCenter: { lat: 40.694388, lng: -73.95682 },
  options: {
    styles: mapStyles,
    maxZoom: 19,
  },
};

const colors = [
  "#f44336", // red
  "#e91e63", // pink
  "#9c27b0", // purple
  "#673ab7", // deep purple
  "#3f51b5", // indigo
  "#2196f3", // blue
  "#03a9f4", // light blue
  "#00bcd4", // cyan
  "#009688", // teal
  "#4caf50", // green
];

export const GoogleMap = ({
  flight,
  towers,
  activeTowers,
  changePoints,
  startPoint,
  endPoint,
  startTime,
}) => {
  const handleGoogleMapApi = (google) => {
    if (google.maps) {
      for (var path in flight) {
        for (var i = 0; i < flight[path].data.length; i++) {
          var flightPath = new google.maps.Polyline({
            path: flight[path].data[i],
            geodesic: true,
            strokeColor: colors[path % colors.length],
            strokeOpacity: 1,
            strokeWeight: 5,
          });

          flightPath.setMap(google.map);
        }
      }

      // Loop through changeLines and draw lines
      for (var point in changePoints) {
        console.log(point % 2 == 1 ? changePoints[point] : "");
        new google.maps.Polyline({
          path: changePoints[point],
          geodesic: true,
          strokeColor: point % 2 == 0 ? "green" : "red",
          strokeOpacity: 1,
          strokeWeight: 2,
        }).setMap(google.map);
      }
    }
  };

  return (
    <MapWrapper>
      <GoogleMapReact
        defaultZoom={MAP.defaultZoom}
        defaultCenter={MAP.defaultCenter}
        // onChange={this.handleMapChange}
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAP,
          language: "en",
        }}
        onGoogleApiLoaded={handleGoogleMapApi}
        options={{
          mapTypeId: "satellite",
        }}
      >
        {towers.map((item) => {
          return (
            <Drone
              key={item.id}
              lat={item.Lat}
              lng={item.Lon}
              network={activeTowers[item.id] ? "LTE" : "UMTS"}
            />
          );
        })}
        <Start lat={startPoint.lat} lng={startPoint.lng} color={"white"} />
        <Square lat={endPoint.lat} lng={endPoint.lng} color={"#FF0000"} />
        <div
          style={{
            position: "absolute",
            top: "625px",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Flight 1 <br />
          {startTime}
        </div>
      </GoogleMapReact>
    </MapWrapper>
  );
};
