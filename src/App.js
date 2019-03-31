import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";

import { theme } from "./utils/theme";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { RoutePageContent } from "./routes";
import MobileSideDrawer from "./components/MobileSideDrawer/MobileSideDrawer";
import DesktopSideDrawer from "./components/DesktopSideDrawer/DekstopSideDrawer";

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
  margin-top: ${({ theme }) => theme.components.headerHeight};
  display: flex;
  height: 100%;
`;

const App = () => {
  const [showMobileSidebar, toggleMobileSidebar] = useState((false));
  const [showDesktopSidebar, toggleDesktopSidebar] = useState(true);
  const [availableSidebar] = useState(() => {
    if (!window.matchMedia("(min-width: 750px)").matches) {
      return 'mobile'
    } else {
      return 'desktop'
    }
  })

  const toggleMobileSidebarHandler = () => {
    toggleMobileSidebar(!showMobileSidebar);
  };

  const toggleDesktopSidebarHandler = () => {
    toggleDesktopSidebar(!showDesktopSidebar);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <PageHeader toggleSidebar={availableSidebar === 'desktop' ? toggleDesktopSidebarHandler : toggleMobileSidebarHandler} />
        <MobileSideDrawer
          show={showMobileSidebar}
          toggleSidebar={toggleMobileSidebarHandler}
          isAvailable={availableSidebar === 'mobile' ? true : false}
        />
        <PageContent>
          <DesktopSideDrawer isOpen={showDesktopSidebar} isAvailable={availableSidebar === 'desktop' ? true : false}/>
          <RoutePageContent />
        </PageContent>
      </>
    </ThemeProvider>
  );
};

export default App;
