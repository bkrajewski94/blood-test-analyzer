import React from "react";
import styled from "styled-components";

import { PageHeader } from "../../../components/PageHeader/PageHeader";

const BuilderHeaderWrapper = styled.div`
    padding-top: ${({theme}) => theme.spacingNormal};
    padding-bottom: ${({theme}) => theme.spacingNormal};
    display: flex;
    align-items: center;
    justify-content: ${({nextOnly}) => nextOnly ? 'flex-end' : 'center'};
    ${({theme, nextOnly}) => nextOnly || theme.media.atTablet} {
        justify-content: space-between; 
    }
`;

export const BuilderHeader = ({nextOnly, children}) => {
  return (
    <PageHeader>
        <BuilderHeaderWrapper nextOnly={nextOnly}>
            {children}
        </BuilderHeaderWrapper>
    </PageHeader>
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