import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BackDropContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0.4;
    z-index: 10;
`;

export const BackDrop = ({onClick}) => (
    <BackDropContainer onClick={onClick}/>
)

BackDropContainer.propTypes = {
    onClick: PropTypes.func.isRequired
}