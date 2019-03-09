import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.email !== '') {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/user/login',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToRest = state => ({
  email: state.user.email
})

export default connect(
  mapStateToRest
)(ProtectedRoute)