import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";

import { texts } from "../../utils/texts";
import { BackDrop } from "../BackDrop/BackDrop";
import { MenuElement, MenuItem } from "../MenuElements/MenuElements";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Add } from "../../assets/add.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as SignOut } from "../../assets/signOut.svg";
import firebase from "../../firebase";

const SideDrawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 75%;
  max-width: 250px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: transform 0.3s ease-out;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  z-index: ${({ theme }) => theme.zIndexModal};
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

const SignOutElement = styled(MenuElement)`
  opacity: 0.7;
  &:hover {
    opacity: 0.9;
  }
`;

const MobileSideDrawer = ({ isOpen, onClose, ...props }) => {
  useEffect(() => {
    const subscribe = props.history.listen(() => {
      onClose();
    });
    return subscribe; //unsubscribes at every preupdate
  }, [isOpen]);

  const signOutHandler = () => {
    firebase
      .auth()
      .signOut()

      .catch(error => {
        // console.log(error);
      });
  };

  return ReactDOM.createPortal(
    <>
      <SideDrawer isOpen={isOpen} >
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
      </SideDrawer>
      {isOpen && <BackDrop onClick={onClose} />}
    </>,
    document.querySelector("#mobileSideDrawer")
  );
};

MobileSideDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  authStatus: PropTypes.bool.isRequired
};

export default withRouter(MobileSideDrawer);
