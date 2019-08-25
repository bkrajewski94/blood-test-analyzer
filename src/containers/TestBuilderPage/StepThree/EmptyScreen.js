import React from "react";
import styled from "styled-components";

import { ReactComponent as EmptyIconSvg } from "../../../assets/testNoResults.svg";
import { Button } from "../../../components/ui-components/Button/Button";
import { texts } from "../../../utils/texts";

const Wrapper = styled.div`
    width: 90%;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${({ theme }) => theme.spacingContentMobile}; 
`;

const Paragraph = styled.div`
    font-size: ${({theme}) => theme.fontSizeMedium};
    color: ${({theme}) => theme.colors.trout};
    text-align: center;
    margin-top: ${({ theme }) => theme.spacingNormal};
`;

const Header = styled(Paragraph)`
    font-size: ${({theme}) => theme.fontSizeLarge};
    margin-top: 0;
`;

const EmptyIcon = styled(EmptyIconSvg)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  min-width: 270px;
  max-width: 450px;
  margin-top: ${({ theme }) => theme.spacingHuge};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  width: 100%;
`;

const ButtonWrapper = styled.div`
    text-align: center;
    margin-top: ${({theme}) => theme.spacingLarge};
`;

export const EmptyScreen = ({onClick}) => {
    return (
        <Wrapper>
            <Header>
                {texts.testBuilder.noResults}
            </Header>
            <Paragraph isBig>
                {texts.testBuilder.noResultsDescription}
            </Paragraph>
            <EmptyIcon />
            <ButtonWrapper>
                <Button isPrimary onClick={onClick}>
                    {texts.testBuilder.tryAgain}
                </Button>
            </ButtonWrapper>
        </Wrapper>
    )
}