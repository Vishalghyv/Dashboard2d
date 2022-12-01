import React from 'react';
import GoogleMapReact from 'google-map-react';

import Drone from '../Drone';

import mapStyles from './mapStyles.json';
import { markersData } from '../../dataProcessing';

import MapWrapper from './MapWrapper';
import { flight_1 } from '../Data/Flight1/flight_1';
// const env = dotenv.config().parsed;
const MAP = {
  defaultZoom: 17,
  defaultCenter: {"lat": 40.694388000000,"lng": -73.956820000000},
  options: {
    styles: mapStyles,
    maxZoom: 19,
  },
};

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom,
    },
    clusters: [],
  };

  handleGoogleMapApi = (google) => {
    const paths = [
    {"lat": 40.694388000000,"lng": -73.956820000000},
    {"lat": 40.694395000000,"lng": -73.956821000000},
    {"lat": 40.694402000000,"lng": -73.956822000000},
    {"lat": 40.694409500000,"lng": -73.956823500000},
    {"lat": 40.694417000000,"lng": -73.956825000000},
    {"lat": 40.694424000000,"lng": -73.956826250000},
    {"lat": 40.694431000000,"lng": -73.956827500000},
    {"lat": 40.694438000000,"lng": -73.956828750000},
    {"lat": 40.694445000000,"lng": -73.956830000000},
    {"lat": 40.694452000000,"lng": -73.956832000000},
    {"lat": 40.694459000000,"lng": -73.956833000000},
    {"lat": 40.694466000000,"lng": -73.956834000000},
    {"lat": 40.694473000000,"lng": -73.956835000000},
    {"lat": 40.694480000000,"lng": -73.956837000000},
    {"lat": 40.694487000000,"lng": -73.956838000000},
    {"lat": 40.694494000000,"lng": -73.956839000000},
    {"lat": 40.694502000000,"lng": -73.956840000000},
    {"lat": 40.694502000000,"lng": -73.956840000000},
    {"lat": 40.694516000000,"lng": -73.956843000000},
    {"lat": 40.694523000000,"lng": -73.956844000000},
    {"lat": 40.694530000000,"lng": -73.956845500000},
    {"lat": 40.694537000000,"lng": -73.956847000000},
    {"lat": 40.694545000000,"lng": -73.956848000000},
    {"lat": 40.694551000000,"lng": -73.956849000000},
    {"lat": 40.694559000000,"lng": -73.956851000000},
    {"lat": 40.694566000000,"lng": -73.956852000000},
    {"lat": 40.694573000000,"lng": -73.956853000000},
    {"lat": 40.694580000000,"lng": -73.956855000000},
    {"lat": 40.694587000000,"lng": -73.956856000000},
    {"lat": 40.694594000000,"lng": -73.956858000000},
    {"lat": 40.694602000000,"lng": -73.956859000000},
    {"lat": 40.694609000000,"lng": -73.956860000000},
    {"lat": 40.694616000000,"lng": -73.956862000000},
    {"lat": 40.694624000000,"lng": -73.956863000000},
    {"lat": 40.694631000000,"lng": -73.956865000000},
    {"lat": 40.694638000000,"lng": -73.956866000000},
    {"lat": 40.694645000000,"lng": -73.956867000000},
    ];
    var flightPath = new google.maps.Polyline({
      path: flight_1 ,
      geodesic: true,
      strokeColor: '#33BD4E',
      strokeOpacity: 1,
      strokeWeight: 5
    });

    var flightPath2 = new google.maps.Polyline({
      path: [ { "lat": -0.25, "lng": -78.49305555555556},{ "lat": -0.2, "lng": -78.2 },{ "lat": -0.2, "lng": -78 }, { "lat": -0.25, "lng": -77.5 } ],
      geodesic: true,
      strokeColor: 'black',
      strokeOpacity: 1,
      strokeWeight: 5
    });

    flightPath.setMap(google.map);
    flightPath2.setMap(google.map);
  }

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          // onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP }}
          onGoogleApiLoaded={this.handleGoogleMapApi}
        >

          {
            markersData.map(item => {
              return (
                <Drone
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                  network={item.network}
                />
              );
            }
            )
          }
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
