import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render }) => {
  return (
    <Route
      path={path}
      render={(props) => {
        if (authService.getCurrentUser())
          return <Redirect to="/intensive-foods/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
