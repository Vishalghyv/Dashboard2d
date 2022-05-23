import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import Marker from '../Marker';
import Drone from '../Drone';
import ClusterMarker from '../ClusterMarker';

import mapStyles from './mapStyles.json';
import { markersData, susolvkaCoords, dt2, dt3, dt4, dt5} from '../../dataProcessing';
import data from './Towers.json';

import MapWrapper from './MapWrapper';
// const env = dotenv.config().parsed;
const MAP = {
  defaultZoom: 10,
  defaultCenter: susolvkaCoords,
  options: {
    styles: mapStyles,
    maxZoom: 19,
  },
};
// console.log('THis is data')
// console.log(data);

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom,
    },
    clusters: [],
  };

  // getClusters = () => {
  //   const clusters = supercluster(markersData + dt2, {
  //     minZoom: 0,
  //     maxZoom: 16,
  //     radius: 50,
  //   });

  //   return clusters(this.state.mapOptions);
  // };

  // createClusters = props => {
  //   this.setState({
  //     clusters: this.state.mapOptions.bounds
  //       ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
  //           lat: wy,
  //           lng: wx,
  //           numPoints,
  //           id: `${numPoints}_${points[0].id}`,
  //           points,
  //         }))
  //       : [],
  //   });
  // };

  // handleMapChange = ({ center, zoom, bounds }) => {
  //   this.setState(
  //     {
  //       mapOptions: {
  //         center,
  //         zoom,
  //         bounds,
  //       },
  //     },
  //     () => {
  //       this.createClusters(this.props);
  //     }
  //   );
  // };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          // onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP }}
        >
          {/* {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                />
              );
            }
            console.log('item.points');
            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
              />
            );
          })} */}

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
          {/* {
            dt2.map(item => {
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
          } */}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
