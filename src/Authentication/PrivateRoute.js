import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Authentication from "../Authentication";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(Authentication);

  if (auth.loading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Component {...props}></Component>
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          ></Redirect>
        )
      }
    ></Route>
  );
};
