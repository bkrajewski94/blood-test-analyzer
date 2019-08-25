import React from "react";
import styled from "styled-components";

import { ReactComponent as EmptyIconSvg } from "../../assets/noPreviousData.svg";
import { Button } from "../../components/ui-components/Button/Button";
import { previousResults } from "../../utils/texts";

const Wrapper = styled.div`
    width: 90%;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${({ theme }) => theme.spacingContentMobile}; 
    margin-bottom: ${({ theme }) => theme.spacingContentMobile}; 
    ${({theme}) => theme.media.atTablet}{
        margin-top: ${({ theme }) => theme.spacingContent}; 
    }
`;

const Paragraph = styled.div`
    font-size: ${({theme}) => theme.fontSizeMedium};
    color: ${({theme}) => theme.colors.trout};
    text-align: center;
    margin-top: ${({ theme }) => theme.spacingNormal};
`;

const Header = styled(Paragraph)`
    font-size: ${({theme}) => theme.fontSizeLarge};
`;

const EmptyIcon = styled(EmptyIconSvg)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  min-width: 270px;
  max-width: 500px;
  margin-top: ${({ theme }) => theme.spacingHuge};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  width: 100%;
`;

const ButtonWrapper = styled.div`
    text-align: center;
    margin-top: ${({theme}) => theme.spacingLarge};
`;

export const ResultsEmptyScreen = ({onClick}) => {
    return (
        <Wrapper>
            <Header>
                {previousResults.noResults}
            </Header>
            <Paragraph isBig>
                {previousResults.noResultsDescription}
            </Paragraph>
            <EmptyIcon />
            <ButtonWrapper>
                <Button isPrimary onClick={onClick}>
                    {previousResults.newTest}
                </Button>
            </ButtonWrapper>
        </Wrapper>
    )
}