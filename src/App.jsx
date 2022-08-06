import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import Foods from "./components/Foods";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />;
        <Switch>
          <Route path="/foods" component={Foods} />
          <Route path="/customers" component={Customers} />
          <Route path="/orders" component={Orders} />
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" component={Foods} />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
      </>
    );
  }
}

export default App;
