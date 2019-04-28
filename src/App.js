import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { theme } from "./utils/theme";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { RoutePageContent } from "./routes";
import MobileSideDrawer from "./components/MobileSideDrawer/MobileSideDrawer";
import DesktopSideDrawer from "./components/DesktopSideDrawer/DekstopSideDrawer";
import firebase from "./firebase";
import { signIn, signOut } from "./actions";
import { useToggleValue } from "./hooks/hooks";


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
  const [availableSidebar] = useState(() => {
    if (window.innerWidth <= theme.desktopWidth) {
      return "mobile";
    } else {
      return "desktop";
    }
  });

  useEffect(() => {
    const subscribeAuth = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if(user.emailVerified) {
          props.signIn();
        } else {
          firebase
          .auth()
          .signOut()
          .then(() => {
            props.history.push("/register/email-confirm")
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

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <PageHeader
          toggleSidebar={
            availableSidebar === "desktop"
              ? showDesktopSidebar.toggle
              : showMobileSidebar.toggle
          }
        />
        {availableSidebar === "mobile" && (
          <MobileSideDrawer
            isOpen={showMobileSidebar.value}
            onClose={showMobileSidebar.setFalse}
            authStatus={props.authStatus}
          />
        )}
        <PageContent>
          {availableSidebar === "desktop" && (
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
  )(App)
);
