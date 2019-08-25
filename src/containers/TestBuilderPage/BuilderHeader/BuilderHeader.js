import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
    width: 100%;
    padding-top: ${({theme}) => theme.spacingNormal};
    padding-bottom: ${({theme}) => theme.spacingNormal};
    display: flex;
    align-items: center;
    justify-content: ${({nextOnly}) => nextOnly ? 'flex-end' : 'center'};
    ${({theme, nextOnly}) => nextOnly || theme.media.atTablet}{
        justify-content: space-between; 
    }
    border-radius: 0 0 10px 10px;
    border-bottom: 2px solid #247c03;
    box-shadow: ${({theme}) => theme.boxShadow};
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${({theme}) => theme.colors.white};
    z-index: 10;
`;

export const BuilderHeader = ({nextOnly, children}) => {
  return (
    <HeaderWrapper nextOnly={nextOnly}>
        {children}
    </HeaderWrapper>
  );
};


export const ContentWrapper = styled.div`
    padding-top: ${({theme}) => theme.spacingMobileWithHeader};
    ${({ theme }) => theme.media.atTablet} {
        padding-top: ${({theme}) => theme.spacingWithHeader};
    }
    height: 100%;
    overflow-y: auto;
`;