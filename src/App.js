import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { theme } from "./utils/theme";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { RouteMobileSidebar, RoutePageContent } from "./routes";

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
  margin-top: ${({ headerHight }) => headerHight};
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
        <RouteMobileSidebar
          showMobileSidebar={showMobileSidebar}
          toggleMobileSidebarHandler={toggleMobileSidebarHandler}
        />
        <PageContent headerHight={theme.components.headerHight} >
          <RoutePageContent />
        </PageContent>
      </>
    </ThemeProvider>
  );
};

export default App;
