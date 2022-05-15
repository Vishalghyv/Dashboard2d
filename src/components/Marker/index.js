import React from 'react';
import PropTypes from 'prop-types';

import MarkerInGroupStyled from './MarkerInGroupStyled';
import Spy from '../Spy';
import styled from 'styled-components';
import { COLORS } from '../../style-constants';

function MarkerStyle({ dir }) {
  let color = COLORS.gray64;
  if (typeof dir === 'number') {
    console.log(dir)
    if (dir >= 0 && dir < 90) {
      color = COLORS.green;
    } else if (dir >= 90 && dir < 180) {
      color = COLORS.green;
    } else if (dir >= 180 && dir < 270) {
      color = COLORS.orange;
    } else if (dir >= 270 && dir < 360) {
      color = COLORS.red;
    }
  }
  const MarkerStyled = styled.div`
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
      <MarkerStyled>
            <Spy scale="0.5" />
          </MarkerStyled>
      );
}

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  render() {
    return (
      <div>
        <MarkerStyle dir={this.props.dir} />
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool,
};

export default Marker;
