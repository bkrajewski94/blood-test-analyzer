import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

export const RoutePageContent = () => (
  <Switch>
    <Route path="/home" render={() => <h1>HOME</h1>} />
    <Route path="/user" render={() => <h1>USER</h1>} />
    <Route path="/new-test" render={() => <h1>LOAD TESTS</h1>} />
    <Route path="/results" render={() => <h1>PREVIOUS RESULTS</h1>} />
    <Route path="/sign-out" render={() => <h1>SIGN OUT</h1>} />
    <Route path="/sign-in" render={() => <h1>SIGN In</h1>} />
    <Redirect from="/" to="/home" />
  </Switch>
);