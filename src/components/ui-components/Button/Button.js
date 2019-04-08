import React from 'react';
import styled from 'styled-components';

const ButtonComponent = styled.button`
    padding: ${({ theme }) => `${theme.spacingTiny} ${theme.spacingLarge}`};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizeNormal};
    border: ${({isPrimary, theme}) => isPrimary ? `3px solid ${theme.colors.japaneseLaurelDark}` : `3px solid ${theme.colors.frenchGray}`};
    border-radius: 5px;
    background-color: ${({isPrimary, theme}) => isPrimary ? theme.colors.japaneseLaurel: theme.colors.white};
    color: ${({isPrimary, theme}) => isPrimary ? theme.colors.white : theme.colors.frenchGray};
    margin-left: ${({ theme }) => theme.spacingNormal}; 
    margin-right: ${({ theme }) => theme.spacingNormal}; 
    opacity: ${({disabled}) => disabled ? '0.7' : '1'};
`;

export const Button = ({children, isPrimary, type, disabled, ...otherProps}) => {
    console.log(otherProps);
    return(
        <ButtonComponent isPrimary={isPrimary} type={type} disabled={disabled} {...otherProps}>
            {children}
        </ButtonComponent>
    )
}