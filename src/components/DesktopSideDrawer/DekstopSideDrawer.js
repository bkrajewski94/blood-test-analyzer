import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { texts } from "../../utils/texts";
import { MenuElement, MenuItem } from "../MenuElements/MenuElements";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Add } from "../../assets/add.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as SignOut } from "../../assets/signOut.svg";
import firebase from "../../firebase";

const SideDrawerWrapper = styled.div`
  width: 230px;
  max-width: 230px;
  flex-basis: 230px;
  flex-shrink: 0;
  transition: margin 0.3s ease-out;
  display: block;
  margin-left: ${({ isOpen }) => (isOpen ? "0px" : "-230px")};
  background-color: ${({ theme }) => theme.colors.whiteLilac};
  border-right: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  padding-top: ${({ theme }) => theme.spacingBig};
`;

const SignOutElement = styled(MenuElement)`
  opacity: 0.7;
  &:hover {
    opacity: 0.9;
  }
`;

const signOutHandler = () => {
  firebase
    .auth()
    .signOut()
    .catch(error => {
      // console.log(error);
    });
};

const DesktopSideDrawer = props => {
  return (
    <SideDrawerWrapper isOpen={props.isOpen}>
      <MenuItem to="/home">
        <MenuElement
          icon={<Home />}
          text={texts.sidebar.home}
          withSpacingBottom
        />
      </MenuItem>
      <MenuItem to="/user">
        <MenuElement
          icon={<User />}
          text={texts.sidebar.user}
          withSpacingBottom
        />
      </MenuItem>
      <MenuItem to="/new-test">
        <MenuElement
          icon={<Add />}
          text={texts.sidebar.add}
          withSpacingBottom
        />
      </MenuItem>
      <MenuItem to="/results">
        <MenuElement
          icon={<List />}
          text={texts.sidebar.list}
          withSpacingBottom
        />
      </MenuItem>
      {props.authStatus ? (
        <SignOutElement
          icon={<SignOut />}
          text={texts.sidebar.signOut}
          withSpacingBottom
          onClick={signOutHandler}
        />
      ) : (
        <MenuItem to="/login">
          <MenuElement
            icon={<SignOut />}
            text={texts.sidebar.signIn}
            withSpacingBottom
          />
        </MenuItem>
      )}
    </SideDrawerWrapper>
  );
};

DesktopSideDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool.isRequired
};

export default withRouter(DesktopSideDrawer);
