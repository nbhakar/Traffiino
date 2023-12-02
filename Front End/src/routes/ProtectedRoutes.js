import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../store/auth-context";

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.isLoggedIn);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={otherProps.redirectTo ? otherProps.redirectTo : "/login"}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
