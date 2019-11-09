import React from "react";
import styled from "styled-components";

import { BuilderHeader, ContentWrapper } from "../BuilderHeader/BuilderHeader";
import { Button } from "../../../components/ui-components/Button/Button";
import { texts } from "../../../utils/texts";
import { StoreDataModal } from "./StoreDataModal";
import { EmptyScreen } from "./EmptyScreen";
import { Results } from "../../ResultsPage/Results";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const StepThree = ({
  data,
  toPrevStepHandler,
  storeOnServerHandler,
  showModal,
  onCompleteHandler,
  recognitionStatus,
  RECOGNITION_STATUS_DICTIONARY,
  isSubmitting,
  onTryAgainHandler
}) => {

  return (
    <>
      {showModal.value && (
        <StoreDataModal
          closeModalHandler={showModal.setFalse}
          storeOnServerHandler={storeOnServerHandler}
        />
      )}
      <Wrapper>
        <BuilderHeader>
          <Button onClick={toPrevStepHandler}>
            {texts.testBuilder.prevStep}
          </Button>
          {recognitionStatus === RECOGNITION_STATUS_DICTIONARY.SAVED ? (
            <Button onClick={onCompleteHandler} isPrimary>
              {texts.testBuilder.complete}
            </Button>
          ) : (
            <Button
              disabled={isSubmitting || !data || !data.length}
              onClick={showModal.setTrue}
              isPrimary
            >
              {texts.testBuilder.store}
            </Button>
          )}
        </BuilderHeader>
        <ContentWrapper>
          {!data || !data.length ? (
            <EmptyScreen onClick={onTryAgainHandler} />
          ) : (
            <Results data={data} />
          )}
        </ContentWrapper>
      </Wrapper>
    </>
  );
};
