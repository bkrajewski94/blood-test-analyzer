import React from "react";
import styled from "styled-components";

import { texts } from "../../../utils/texts";
import { ReactComponent as EmailConfirmImage } from "../../../assets/emailConfirm.svg";


const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Paragraph = styled.div`
    font-size: ${({theme, isBig}) => isBig ? theme.fontSizeMedium : theme.fontSizeNormal};
    color: ${({theme}) => theme.colors.trout};
    text-align: center;
    margin-top: ${({theme}) => theme.spacingNormal};
`;

const Header = styled(Paragraph)`
    font-size: ${({theme}) => theme.fontSizeLarge};
    margin-top: ${({ theme }) => theme.spacingContentMobile}; 
    ${({theme}) => theme.media.atTablet}{
        margin-top: ${({ theme }) => theme.spacingContent}; 
    }
`;

const Footer = styled(Paragraph)`
    margin-top: auto;
    margin-bottom: ${({theme}) => theme.spacingContentMobile};
`;

const Image = styled(EmailConfirmImage)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: auto;
  min-width: 270px;
  max-width: 500px;
  margin-top: ${({ theme }) => theme.spacingHuge};
`;

export const ResetConfirm = () => {
    return(
        <Wrapper>
            <Header>{texts.authentication.almostThere}</Header>
            <Paragraph isBig>{texts.authentication.emailSent}</Paragraph>
            <Image/>
            <Footer>{texts.authentication.resetEmail}</Footer>
        </Wrapper>
    )
}