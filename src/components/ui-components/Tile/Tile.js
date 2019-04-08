import React from 'react';
import styled from 'styled-components';

const TileComponent = styled.div`
    width: 100%;
    max-width: 700px;
    position: relative;
    overflow: hidden;
    border: ${({ theme }) => `1px solid ${theme.colors.athensGray}`}; 
    box-shadow: ${({ theme }) => theme.boxShadow}; 
    padding: 40px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
`;

export const Tile = ({children}) => {
    return(
        <TileComponent >
            {children}
        </TileComponent>
    )
}