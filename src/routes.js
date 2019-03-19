import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MobileSideDrawer from "./components/MobileSideDrawer/MobileSideDrawer";

export const RouteMobileSidebar = ({
  showMobileSidebar,
  toggleMobileSidebarHandler
}) => (
  <Route
    path="/:page"
    render={() => {  //not working with component={<MobileSideDrawer.../>}
      return (
        <MobileSideDrawer
          show={showMobileSidebar}
          toggleSidebar={toggleMobileSidebarHandler}
        />
      );
    }}
  />
);

export const RedirectHome = () => <Redirect from="/" to="/home" />;

export const RoutePageContent = () => (
  <Switch>
    <Route
      path="/:page"
      render={() => {
        return (
          <Switch>
            <Route path="/home" render={() => <h1>HOME</h1>} />
            <Route path="/user" render={() => <h1>USER</h1>} />
            <Route path="/new-test" render={() => <h1>LOAD TESTS</h1>} />
            <Route path="/results" render={() => <h1>PREVIOUS RESULTS</h1>} />
            <Route path="/sign-out" render={() => <h1>SIGN OUT</h1>} />
            <Route path="/sign-in" render={() => <h1>SIGN In</h1>} />
          </Switch>
        );
      }}
    />
    <RedirectHome />
  </Switch>
);
