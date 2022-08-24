import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "./components/common/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import Foods from "./components/Foods";
import FoodForm from "./components/FoodForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./components/NotFound";
import auth from "./services/authService";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    try {
      const token = auth.getJwt();
      const user = jwtDecode(token);
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    return (
      <>
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/intensive-foods/foods/:id" component={FoodForm} />
          <Route path="/intensive-foods/login" component={LoginForm} />
          <Route path="/intensive-foods/logout" component={Logout} />
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
