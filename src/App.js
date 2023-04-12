import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Start from "./start/Start";

require("dotenv").config();

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* Define route for existing home page */}
          <Route path="/" element={<Home />} />

          {/* Define route for new page */}
          <Route path="/start" element={<Start />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
