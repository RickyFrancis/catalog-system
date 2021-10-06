import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;
  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
