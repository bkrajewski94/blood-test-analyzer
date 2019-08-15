import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { BackDrop } from "../BackDrop/BackDrop";

const ModalComponent = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: ${({ theme }) => theme.zIndexModal};
  transform: translate(-50%, -50%);
`;

export const Modal = ({ children, closeModalHandler }) => {
  return ReactDOM.createPortal(
    <>
      <ModalComponent>{children}</ModalComponent>
      <BackDrop onClick={closeModalHandler} />
    </>,
    document.querySelector("#modal")
  );
};
