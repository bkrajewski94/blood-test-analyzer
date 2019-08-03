import React from 'react';
import styled from 'styled-components';

const TileComponent = styled.div`
    position: relative;
    overflow: hidden;
    border: ${({ theme }) => `1px solid ${theme.colors.athensGray}`}; 
    box-shadow: ${({ theme }) => theme.boxShadow}; 
    padding: ${({ theme }) => theme.spacingHuge}; 
    border-radius: 10px;
`;

export const Tile = ({children, className}) => {
    return(
        <TileComponent className={className} >
            {children}
        </TileComponent>
    )
}