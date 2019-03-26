import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from 'styled-reset'


import { theme } from "./utils/theme";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { RoutePageContent } from "./routes";
import MobileSideDrawer from "./components/MobileSideDrawer/MobileSideDrawer";

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    font-family: ${({ theme }) => theme.fontDefault};;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const PageContent = styled.div`
  margin-top: ${({ theme }) => theme.components.headerHeight};
`;

const App = () => {
  const [showMobileSidebar, toggleMobileSidebar] = useState(false);

  const toggleMobileSidebarHandler = () => {
    toggleMobileSidebar(!showMobileSidebar);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <PageHeader toggleSidebar={toggleMobileSidebarHandler} />
        <MobileSideDrawer show={showMobileSidebar} toggleSidebar={toggleMobileSidebarHandler}/>
        <PageContent>
          <RoutePageContent />
        </PageContent>
      </>
    </ThemeProvider>
  );
};

export default App;
