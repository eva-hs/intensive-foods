import React, { Component } from "react";
import NavBar from "./components/common/NavBar";
import Foods from "./components/Foods";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />;
        <Foods />;
      </>
    );
  }
}

export default App;
