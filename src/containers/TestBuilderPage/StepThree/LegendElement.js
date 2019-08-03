import React from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding-top: ${({ theme }) => theme.spacingTiny};
    padding-bottom: ${({ theme }) => theme.spacingTiny};
`;

const ColorBox = styled.div`
    width: ${({isActive}) => isActive ? '30px' : '20px'};
    min-width: ${({isActive}) => isActive ? '30px' : '20px'};
    height: ${({isActive}) => isActive ? '16px' : '12px'};
    border-radius: 3px;
    background-color: ${({color}) => color};
`;

const TitleBox = styled.div`
    margin-left: ${({ theme }) => theme.spacingSmall};
    color: ${({ theme }) => theme.colors.trout};
    font-size: ${({ theme }) => theme.fontSizeMedium};
    font-weight: ${({isActive}) => isActive && 600};
`;

export const LegendElement = ({title, color, isActive}) => (
    <Wrapper>
        <ColorBox color={color} isActive={isActive}/>
        <TitleBox isActive={isActive}>{title}</TitleBox>
    </Wrapper>
);