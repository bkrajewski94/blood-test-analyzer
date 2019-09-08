import React from "react";
import styled from "styled-components";

import { Page } from "../Page/Page";
import { errorTexts } from "../../utils/texts";
import { ReactComponent as ErrorIconSvg } from "../../assets/error.svg";

const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacingContentMobile};
  margin-bottom: ${({ theme }) => theme.spacingNormal};
  ${({ theme }) => theme.media.atTablet} {
    padding-top: ${({ theme }) => theme.spacingContent};
  }
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.h1`
  font-size: ${({ theme }) => theme.fontSizeLarge};
  color: ${({ theme }) => theme.colors.trout};
  text-align: center;
`;

const ErrorImage = styled(ErrorIconSvg)`
  display: block;
  height: auto;
  width: 100%;
  max-width: 450px;
  margin: ${({ theme }) => `${theme.spacing(4)} auto`};
`;

const Description = styled.h2`
  font-size: ${({ theme }) => theme.fontSizeMedium};
  color: ${({ theme }) => theme.colors.trout};
  text-align: center;
`;

export const ErrorPage = ({ description }) => {
  return (
    <Page>
      <Wrapper>
        <ContentWrapper>
          <Header>{errorTexts.errorHeader}</Header>
          <ErrorImage />
          <Description>{description}</Description>
        </ContentWrapper>
      </Wrapper>
    </Page>
  );
};
