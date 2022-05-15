import React from 'react';
import PropTypes from 'prop-types';
import ReactLogo from './tower.svg';
function Spy(props) {
  const styles = {
    transform: `scale(${props.scale})`,
  };

  return (
    <img src={ReactLogo} alt="React Logo" />
  );
}

Spy.propTypes = {
  scale: PropTypes.string,
};

export default Spy;
