import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import Foods from "./components/Foods";
import FoodForm from "./components/common/FoodForm";
import NotFound from "./components/NotFound";

// Bugs: you will never get the not-found component if you in /foods/...

// Even though the page do not rerender my foodstable is resetting,
// which meens that if I remove an item of click om favorite and moves
// to another component and back again, there are 9 items in my tablet
// and none of them are a favorite.

class App extends Component {
  render() {
    return (
      <>
        <NavBar />;
        <Switch>
          <Route path="/foods/:id" component={FoodForm} />
          <Route path="/foods" component={Foods} />
          <Route path="/customers" component={Customers} />
          <Route path="/orders" component={Orders} />
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" component={Foods} />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
