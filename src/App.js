import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import Login from "./containers/Login";
import Routes from "config/routes";
import { withAuth as AuthWrapper } from "wrappers/auth";
import "./App.css";
import "./styles/login.css";
import configureStore from "store/store";

const store = configureStore();

const Loading = () => <div>Loading ...</div>;

const LoginContainerLoader = Loadable({
  loader: () => import("./containers/Login"),
  loading: Loading
});

const RegisterContainerLoader = Loadable({
  loader: () => import("containers/Register"),
  loading: Loading
});

const DashboardContainer = Loadable({
  loader: () => import("containers/Dashboard"),
  loading: Loading
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Router>
            <Switch>
              <Route
                exact
                path={Routes.login}
                component={LoginContainerLoader}
              />
              <Route
                exact
                path={Routes.register}
                component={RegisterContainerLoader}
              />
              <Route
                exact
                path={Routes.dashboard}
                component={AuthWrapper(DashboardContainer)}
              />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
