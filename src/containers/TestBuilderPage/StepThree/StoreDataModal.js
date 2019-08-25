import React from "react";
import styled from "styled-components";

import { Modal } from "../../../components/Modal/Modal";
import { ReactComponent as StoreImage } from "../../../assets/store.svg";
import { texts } from "../../../utils/texts";
import { Button } from "../../../components/ui-components/Button/Button";

const ModalComponent = styled.div`
  width: 90vw;
  max-width: 600px;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${({theme}) => `${theme.spacingBig} ${theme.spacingNormal}`};
  ${({theme}) => theme.media.atTablet}{
    padding: ${({theme}) => `${theme.spacingHuge} ${theme.spacingNormal}`};
    }
`;

const StoreImageComponent = styled(StoreImage)`
  display: none;
  ${({ theme }) => theme.media.atMobileVertical} {
    display: block;
  }
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: auto;
  min-width: 150px;
  max-width: 300px;
`;

const Text = styled.div`
    font-size: ${({theme}) => theme.fontSizeNormal};
    color: ${({theme}) => theme.colors.trout};
    text-align: center;
    margin-top: ${({theme}) => theme.spacingNormal};
`;

const Title = styled(Text)`
    font-size: ${({theme}) => theme.fontSizeMedium};
    font-weight: 600;
    ${({ theme }) => theme.media.atMobileVertical} {
        margin-top: ${({theme}) => theme.spacingLarge};
    } 
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${({theme}) => theme.spacingBig};
    ${({theme}) => theme.media.atTablet} {
        margin-top: ${({theme}) => theme.spacingLarge};
    }
`;

const ModalButton = styled(Button)`
    margin: 0;
    & + & {
        margin-left: ${({theme}) => theme.spacingNormal};
    }
    width: 120px;
`;

export const StoreDataModal = ({ closeModalHandler, storeOnServerHandler }) => {
  return (
    <Modal closeModalHandler={closeModalHandler}>
      <ModalComponent>
        <StoreImageComponent />
        <Title>{texts.testBuilder.storeTitle}</Title>
        <Text>{texts.testBuilder.storeDescription}</Text>
        <ButtonsWrapper>
            <ModalButton onClick={closeModalHandler}>{texts.testBuilder.cancel}</ModalButton>
            <ModalButton onClick={storeOnServerHandler} isPrimary>{texts.testBuilder.save}</ModalButton>
        </ButtonsWrapper>
      </ModalComponent>
    </Modal>
  );
};
