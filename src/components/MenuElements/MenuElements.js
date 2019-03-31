import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ElementWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: ${({ theme, withSpacingTop }) => withSpacingTop ? theme.spacingBig : theme.spacingSmall};
    padding-bottom: ${({ theme, withSpacingBottom }) => withSpacingBottom ? theme.spacingBig : theme.spacingSmall};
    color: ${({ theme }) => theme.colors.trout}; 
    border-bottom: ${({ theme, withBorder }) => withBorder ? `1px solid ${theme.colors.athensGray}` : 'none'};
    cursor: pointer;
`;

const IconWrapper = styled.div`
    width: 25px;
    height: 25px;
    margin-right: ${({ theme }) => theme.spacingSmall};
    margin-left: ${({ theme }) => theme.spacingBig};
`;

const MenuItemComponent = styled(NavLink)`
  text-decoration: none;
  display: block;
  opacity: 0.7;
  &:hover {
    opacity: 0.9;
  }
  &.active {
    opacity: 1;
  }
`;

export const MenuItem = ({to, children}) => (
    <MenuItemComponent to={to}>
        {children}
    </MenuItemComponent>
)


MenuItem.propTypes = {
    to: PropTypes.string.isRequired,
}

export const MenuElement = ({icon, text, withSpacingBottom, withSpacingTop, withBorder}) => {
    return(
    <ElementWrapper withSpacingBottom={withSpacingBottom} withSpacingTop={withSpacingTop} withBorder={withBorder} >
        <IconWrapper>{icon}</IconWrapper>
        {text}
    </ElementWrapper>
    )
}

MenuElement.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    withSpacingBottom: PropTypes.bool,
    withSpacingTop: PropTypes.bool,
    withBorder: PropTypes.bool,
}
