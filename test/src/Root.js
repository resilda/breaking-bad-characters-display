//Gather all the routes

import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth/AuthService";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Characters from "./Components/Characters";
import Details from "./Components/Details";

//in case of "Private Route", if the refreshToken exists then we pass the children as props,
//otherwise "redirect" to "login", since we don't have premission to access the "main page"
function PrivateRoute({ children, refreshToken, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        refreshToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

//the opposite of "PrivateRoute"
function PublicRoute({ children, refreshToken, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !refreshToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/main",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const Root = () => {
  //"useContext" to pass "refreshToken"
  const context = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" refreshToken={context.refreshToken}>
          <Register />
        </PublicRoute>

        <PublicRoute exact path="/login" refreshToken={context.refreshToken}>
          <Login />
        </PublicRoute>

        <PrivateRoute exact path="/main" refreshToken={context.refreshToken}>
          <Characters />
        </PrivateRoute>

        <Route>
          <Details exact path="/main/:character/:id"/>
        </Route>

      </Switch>
    </BrowserRouter>
  );
};

export default Root;
