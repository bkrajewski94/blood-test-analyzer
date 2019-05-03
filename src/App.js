import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withSize } from "react-sizeme";

import { theme } from "./utils/theme";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { RoutePageContent } from "./routes";
import MobileSideDrawer from "./components/MobileSideDrawer/MobileSideDrawer";
import DesktopSideDrawer from "./components/DesktopSideDrawer/DekstopSideDrawer";
import firebase from "./firebase";
import { signIn, signOut } from "./actions";
import { useToggleValue } from "./hooks/hooks";
import { Spinner, SpinnerWrapper } from "./components/Spinner/Spinner";

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    font-family: ${({ theme }) => theme.fontDefault};
    height: 100%;
  }

  #root, html {
    height: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const PageContent = styled.div`
  padding-top: ${({ theme }) => theme.components.headerHeight};
  display: flex;
  height: 100%;
`;

const App = props => {
  const showMobileSidebar = useToggleValue(false);
  const showDesktopSidebar = useToggleValue(true);

  const [isUserDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    const subscribeAuth = firebase.auth().onAuthStateChanged(function(user) {
      if(!isUserDataLoaded) {
        setUserDataLoaded(true);
      }

      if (user) {
        if (user.emailVerified) {
          props.signIn();
        } else {
          firebase
            .auth()
            .signOut()
            .then(() => {
              props.history.push("/register/email-confirm");
            })
            .catch(error => {
              // console.log(error);
            });
        }
      } else {
        if (props.authStatus) {
          //to prevent redirect at page start
          props.signOut();
          props.history.push("/sign-out");
        }
      }
    });
    return subscribeAuth;
  }, [props.authStatus]);

  const displayMode = props.size.width <= theme.desktopWidth ? "mobile" : "desktop";


  //As soon as i add this conditional content rendering in any kind of form (here or directly inside return()) 
  //react-sizeme stops passing new props on window size change after refresh of the page 
  //it works well when first loading the page, but after it's refreshed react size-me is no longer reacting to window resolution changes.
  // Any thoughts on that?
  
  if(!isUserDataLoaded) { 
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>         
        </>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <PageHeader
          toggleSidebar={
            displayMode === "desktop"
              ? showDesktopSidebar.toggle
              : showMobileSidebar.toggle
          }
        />
        {displayMode === "mobile" && (
          <MobileSideDrawer
            isOpen={showMobileSidebar.value}
            onClose={showMobileSidebar.setFalse}
            authStatus={props.authStatus}
          />
        )}
        <PageContent>
          {displayMode === "desktop" && (
            <DesktopSideDrawer
              isOpen={showDesktopSidebar.value}
              authStatus={props.authStatus}
            />
          )}
          <RoutePageContent authStatus={props.authStatus} />
        </PageContent>
      </>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return { authStatus: state.authStatus };
};

export default withRouter(
  connect(
    mapStateToProps,
    { signIn, signOut }
  )(withSize()(App))
);
