import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";

import { texts } from "../../utils/texts";
import { BackDrop } from "../BackDrop/BackDrop";
import { MenuElement } from "./MenuElement/MenuElement";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Add } from "../../assets/add.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as SignOut } from "../../assets/signOut.svg";

const SideDrawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 75%;
  background-color: ${({ theme }) => theme.colors.white};
  transition: transform 0.3s ease-out;
  transform: translateX(${({ show }) => (show ? "0" : "-100%")});
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DrawerHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.whiteLilac};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacingBig};
  padding-bottom: ${({ theme }) => theme.spacingBig};
  box-shadow: 0px 5px 11px -3px rgba(0, 0, 0, 0.1);
`;

const Paragraph = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.colors.trout};
  font-size: ${({ theme }) => theme.fontSizeBig};
  font-family: ${({ theme, handWritten }) =>
    handWritten ? theme.fontHandWriting : theme.fontDefault};
  margin-top: ${({ theme, withMargin }) =>
    withMargin ? theme.spacingSmall : 0};
  margin-bottom: 0;
`;

const MenuItem = styled(NavLink)`
  text-decoration: none;
  opacity: 0.7;
  &.active {
    opacity: 1;
  }
`;

const MobileSideDrawer = ({ show, toggleSidebar, ...props }) => {
  props.history.listen(() => {
    toggleSidebar();
  });

  return ReactDOM.createPortal(
    <>
      <SideDrawer show={show}>
        <DrawerHeader>
          <Paragraph>Welcome!</Paragraph>
          <Paragraph handWritten withMargin>
            Name Surname
          </Paragraph>
        </DrawerHeader>
        <MenuItem to="/home">
          <MenuElement
            icon={<Home />}
            text={texts.sidebar.home}
            withSpacingTop
          />
        </MenuItem>
        <MenuItem to="/user">
          <MenuElement
            icon={<User />}
            text={texts.sidebar.user}
            withSpacingBottom
            withBorder
          />
        </MenuItem>
        <MenuItem to="/new-test">
          <MenuElement icon={<Add />} text={texts.sidebar.add} withSpacingTop />
        </MenuItem>
        <MenuItem to="/results">
          <MenuElement icon={<List />} text={texts.sidebar.list} />
        </MenuItem>
        <MenuItem to="/sign-out">
          <MenuElement icon={<SignOut />} text={texts.sidebar.signOut} />
        </MenuItem>
      </SideDrawer>
      {show && <BackDrop onClick={toggleSidebar} />}
    </>,
    document.querySelector("#mobileSideDrawer")
  );
};

MobileSideDrawer.propTypes = {
  show: PropTypes.bool.isRequired
};

export default withRouter(MobileSideDrawer);
