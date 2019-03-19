import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";

import { theme } from "./utils/theme";
import { PageHeader } from "./components/PageHeader/PageHeader";
import MobileSideDrawer from "./components/MobileSideDrawer/MobileSideDrawer";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Assistant', sans-serif;
  }

  *, *::before, *::after{
    box-sizing: border-box;
  }
`;

const PageContent = styled.div`
  margin-top: 50px;
`;

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [showMobileSidebar, toggleMobileSidebar] = useState(false);

  const toggleMobileSidebarHandler = () => {
    toggleMobileSidebar(!showMobileSidebar);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <PageHeader toggleSidebar={toggleMobileSidebarHandler} />
        <Route
          path="/:page"
          render={() => {
            return (
              <MobileSideDrawer
                show={showMobileSidebar}
                toggleSidebar={toggleMobileSidebarHandler}
              />
            );
          }}
        />
        <PageContent>
          <Route
            path="/:page"
            render={() => {
              return (
                <Switch>
                  <Route path="/home" render={() => <h1>HOME</h1>} />
                  <Route path="/user" render={() => <h1>USER</h1>} />
                  <Route path="/new-test" render={() => <h1>LOAD TESTS</h1>} />
                  <Route
                    path="/results"
                    render={() => <h1>PREVIOUS RESULTS</h1>}
                  />
                  <Route path="/sign-out" render={() => <h1>SIGN OUT</h1>} />
                  <Route path="sign-in" render={() => <h1>SIGN In</h1>} />
                  <Redirect from="/" to="/home" />
                </Switch>
              );
            }}
          />
        </PageContent>
      </>
    </ThemeProvider>
  );
};

export default App;
