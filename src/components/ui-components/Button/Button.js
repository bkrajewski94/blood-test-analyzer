import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const ButtonComponent = styled.button`
    padding: ${({ theme }) => `${theme.spacingTiny} ${theme.spacingLarge}`};
    font-size: ${({ theme }) => theme.fontSizeNormal};
    border: ${({isPrimary, theme}) => isPrimary ? `3px solid ${theme.colors.japaneseLaurelDark}` : `3px solid ${theme.colors.trout}`};
    border-radius: 5px;
    background-color: ${({isPrimary, theme}) => isPrimary ? theme.colors.japaneseLaurel: theme.colors.white};
    color: ${({isPrimary, theme}) => isPrimary ? theme.colors.white : theme.colors.trout};
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