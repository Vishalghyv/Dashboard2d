import React from 'react';
import PropTypes from 'prop-types';
import ReactLogo from './drone.svg';
function Drone(props) {
  const styles = {
    transform: `scale(${props.scale})`,
  };

  return (
    <img src={ReactLogo} alt="React Logo" />
  );
}

Drone.propTypes = {
  scale: PropTypes.string,
};

export default Drone;
