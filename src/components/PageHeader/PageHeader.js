import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import bloodIcon from "../../assets/bloodIcon.png";

const HeaderWrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.components.headerHeight};
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.thunderbird};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonBar = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacingMiniscule};
  margin-bottom: ${({ theme }) => theme.spacingMiniscule};
`;

const ButtonBox = styled.div`
  margin-left: ${({ theme }) => theme.spacingNormal};
`;

const Logo = styled.div`
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${({bgImage}) => bgImage});
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: ${({theme}) => theme.spacingTiny};
`;

export const PageHeader = ({ toggleSidebar }) => {
  return (
    <HeaderWrapper>
      <ButtonBox onClick={toggleSidebar}>
        <ButtonBar />
        <ButtonBar />
        <ButtonBar />
      </ButtonBox>
      <Logo bgImage={bloodIcon}/>
    </HeaderWrapper>
  );
};


PageHeader.propTypes = {
  toggleSidebar: PropTypes.func
}