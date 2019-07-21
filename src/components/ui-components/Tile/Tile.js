import React from 'react';
import styled from 'styled-components';

const TileComponent = styled.div`
    /* width: 90%;
    max-width: 700px; */
    position: relative;
    overflow: hidden;
    border: ${({ theme }) => `1px solid ${theme.colors.athensGray}`}; 
    box-shadow: ${({ theme }) => theme.boxShadow}; 
    padding: ${({ theme }) => theme.spacingHuge}; 
    /* margin: ${({ theme }) => `${theme.spacingContentMobile} auto`}; 

    ${({theme}) => theme.media.atTablet}{
        margin: ${({ theme }) => `${theme.spacingContent} auto`}; 
    } */
    border-radius: 10px;
`;

export const Tile = ({children, className}) => {
    return(
        <TileComponent className={className} >
            {children}
        </TileComponent>
    )
}