import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import Foods from "./components/Foods";
import FoodForm from "./components/FoodForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
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
        {/* <Redirect from="/intensive-foods/" to="/intensive-foods/foods" /> */}
        <Switch>
          <Route path="/intensive-foods/foods/:id" component={FoodForm} />
          <Route path="/intensive-foods/login" component={LoginForm} />
          <Route path="/intensive-foods/register" component={RegisterForm} />
          <Route path="/intensive-foods/foods" component={Foods} />
          <Route path="/intensive-foods/customers" component={Customers} />
          <Route path="/intensive-foods/orders" component={Orders} />
          <Route path="/intensive-fodds/foods/new" component={FoodForm} />
          <Route path="/intensive-foods/not-found" component={NotFound} />
          <Route exact path="/intensive-foods/" component={Foods} />
          <Redirect to="/intensive-foods/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
