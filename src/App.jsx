import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import Foods from "./components/Foods";
import FoodForm from "./components/FoodForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";
import auth from "./services/authService";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <NavBar user={user} />
        <Switch>
          <ProtectedRoute
            path="/intensive-foods/foods/:id"
            component={FoodForm}
          />
          <Route path="/intensive-foods/login" component={LoginForm} />
          <Route path="/intensive-foods/logout" component={Logout} />
          <Route path="/intensive-foods/register" component={RegisterForm} />
          <Route
            path="/intensive-foods/foods"
            render={(props) => <Foods {...props} user={user} />}
          />
          <Route path="/intensive-foods/customers" component={Customers} />
          <Route path="/intensive-foods/orders" component={Orders} />
          <Route path="/intensive-foods/not-found" component={NotFound} />
          <Redirect
            exact
            from="/intensive-foods/"
            to="/intensive-foods/foods"
          />
          <Redirect to="/intensive-foods/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
