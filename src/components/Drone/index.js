import React from 'react';
import PropTypes from 'prop-types';
import DroneImage from './Drone';
import styled from 'styled-components';
import { COLORS } from '../../style-constants';

// {'LTE', 'LTE ', 'UMTS', 'GSM'}
function DroneStyle({ network }) {
    // console.log('DroneStyle' + RSRP);
    let color = COLORS.gray64;
    if (network == 'LTE') {
        color = COLORS.green;
    } else if (network == 'LTE ') {
        color = COLORS.green;
    } else if (network == 'UMTS') {
        color = COLORS.orange;
    } else if (network == 'GSM') {
        color = COLORS.yellow;
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
      <div><DroneStyle network={this.props.network} /></div>
    );
  }
}

Drone.propTypes = {
  inGroup: PropTypes.bool,
};

export default Drone;
