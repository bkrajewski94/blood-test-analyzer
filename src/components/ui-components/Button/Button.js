import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const ButtonComponent = styled.button`
    padding: ${({ theme }) => `${theme.spacingTiny} ${theme.spacingLarge}`};
    font-size: ${({ theme }) => theme.fontSizeNormal};
    border: ${({isPrimary, isDangerous, theme}) => {
        if(isPrimary) return `3px solid ${theme.colors.japaneseLaurelDark}`;
        if(isDangerous) return `3px solid ${theme.colors.thunderbird}`;
        return `3px solid ${theme.colors.trout}`
    }};
    border-radius: 5px;
    background-color: ${({isPrimary, isDangerous, theme}) => {
        if(isPrimary) return theme.colors.japaneseLaurel;
        if(isDangerous) return theme.colors.thunderbird;
        return theme.colors.white
    }};
    color: ${({isPrimary, isDangerous, theme}) => isPrimary || isDangerous ? theme.colors.white : theme.colors.trout};
    margin-left: ${({ theme }) => theme.spacingNormal}; 
    margin-right: ${({ theme }) => theme.spacingNormal}; 
    opacity: ${({disabled}) => disabled ? '0.5' : '1'};
    cursor: ${({disabled}) => disabled || 'pointer'};
`;

export const Button = ({children, isPrimary, type, disabled, ...otherProps}) => {
    return(
        <ButtonComponent isPrimary={isPrimary} type={type} disabled={disabled} {...otherProps}>
            {children}
        </ButtonComponent>
    )
}

Button.propTypes = {
    isPrimary: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
}