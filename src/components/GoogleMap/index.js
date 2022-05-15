import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import Marker from '../Marker';
import Drone from '../Drone';
import ClusterMarker from '../ClusterMarker';

import mapStyles from './mapStyles.json';
import { markersData, susolvkaCoords, towersData, cellData} from '../../fakeData';
import data from './Towers.json';

import MapWrapper from './MapWrapper';

const MAP = {
  defaultZoom: 18,
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

  getClusters = () => {
    const clusters = supercluster(towersData, {
      minZoom: 0,
      maxZoom: 16,
      radius: 50,
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          }))
        : [],
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: 'AIzaSyBwyZKXbpmkWtxwGRHSTLatxGfHR-wqs10' }}
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
            towersData.map(item => {
              return (
                <Marker
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                />
              );
            })
          }
          {
            cellData.map(item => {
              return (
                <Marker
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                  dir={item.dir}
                />
              );
            })
          }

          {
            markersData.map(item => {
              return (
                <Drone
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                  rsrp={item.rsrp}
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
