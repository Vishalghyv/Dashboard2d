import React, { Component } from 'react';
import Flight from './components/Flight/Flight';

require('dotenv').config()
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Voltela Dashboard</h1>
        </div>
        <Flight />
      </div>
    );
  }
}

export default App;
