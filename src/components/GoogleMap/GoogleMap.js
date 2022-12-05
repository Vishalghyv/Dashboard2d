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

export const GoogleMap = ({flight}) => {


  const handleGoogleMapApi = (google) => {
    const paths = flight;
    var flightPath = new google.maps.Polyline({
      path: flight ,
      geodesic: true,
      strokeColor: '#33BD4E',
      strokeOpacity: 1,
      strokeWeight: 5
    });

    flightPath.setMap(google.map);
  }

    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          // onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP }}
          onGoogleApiLoaded={handleGoogleMapApi}
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

