import React from 'react';
import PropTypes from 'prop-types';
import DroneImage from './Drone';
import styled from 'styled-components';
import { COLORS } from '../../style-constants';


function DroneStyle({ RSRP }) {
    // console.log('DroneStyle' + RSRP);
    let color = COLORS.gray64;
    if (RSRP < -70) {
        console.log('RSRP < -70');
        color = COLORS.green;
    } else if (RSRP < -60) {
        color = COLORS.yellow;
    } else if (RSRP < -50) {
        console.log('RSRP < -50');
        color = COLORS.orange;
    }
    const DroneInGroupStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    margin-left: -7px;
    font-size: 14px;
    color: #fff;
    text-transform: uppercase;
    border: 2px solid #fff;
    border-radius: 50%;
    background-color: ${color};
    background-size: cover;
    background-position: center;
    `;

    return (
        <DroneInGroupStyled>
              <DroneImage scale="0.5" />
            </DroneInGroupStyled>
        );
}

class Drone extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  render() {
    return (
      <div><DroneStyle RSRP={this.props.rsrp} /></div>
    );
  }
}

Drone.propTypes = {
  inGroup: PropTypes.bool,
};

export default Drone;
