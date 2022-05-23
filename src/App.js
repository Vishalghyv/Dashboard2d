import React, { Component } from 'react';

import GoogleMap from './components/GoogleMap';
require('dotenv').config()
class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleMap />
      </div>
    );
  }
}

export default App;
