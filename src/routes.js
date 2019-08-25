import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { HomePage } from "./containers/HomePage/HomePage";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { RegisterPage } from "./containers/RegisterPage/RegisterPage";
import { EmailConfirm } from "./components/EmailConfirm/EmailConfirm";
import { ResetPasswordPage } from "./containers/ResetPasswordPage/ResetPasswordPage";
import { ResetConfirm } from "./components/ResetPassword/ResetConfirm/ResetConfirm";
import { TestBuilderPage } from "./containers/TestBuilderPage/TestBuilderPage";
import { PreviousResultsPage } from "./containers/PreviousResultsPage/PreviousResultsPage";

export const RoutePageContent = ({ authStatus }) => {
  if (authStatus) {
    return (
      <Switch>
        <Route path="/home" render={() => <HomePage />} />
        <Route path="/user" render={() => <h1>USER</h1>} />
        <Route path="/:uid/new-test" render={props => <TestBuilderPage {...props}/>} />
        <Route path="/:uid/results" render={props => <PreviousResultsPage {...props} />} />
        <Redirect from="/" to="/home" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/home" render={() => <HomePage />} />
        <Route path="/sign-out" render={() => <h1>SIGN OUT</h1>} />
        <Route path="/login" render={props => <LoginPage {...props} />} />
        <Route
          exact
          path="/register"
          render={props => <RegisterPage {...props} />}
        />
        <Route
          path="/register/email-confirm"
          render={props => <EmailConfirm {...props} />}
        />
        <Route
          exact
          path="/reset-password"
          render={props => <ResetPasswordPage {...props} />}
        />
        <Route
          path="/reset-password/sent"
          render={props => <ResetConfirm {...props} />}
        />
        <Redirect exact from="/" to="/home" />
        <Redirect from="/" to="/login" />
      </Switch>
    );
  }
};
