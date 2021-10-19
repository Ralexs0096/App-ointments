import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../actions/auth";
import LoginView from "../components/Authentication/LoginView";
import RegisterView from "../components/Authentication/RegisterView";
import CalendarView from "../components/Calendar/CalendarView";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const RouterApp = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginView}
            isAuthenticated={!!uid}
          />

          <PublicRoute
            exact
            path="/register"
            component={RegisterView}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/"
            component={CalendarView}
            isAuthenticated={!!uid}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default RouterApp;
