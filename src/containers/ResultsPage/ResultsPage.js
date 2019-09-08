import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { firestore } from "../../firebase";
import { saveTestResult } from "../../actions";
import { Results } from "./Results";
import { Page } from "../../components/Page/Page";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/ui-components/Button/Button";
import { DeleteResultModal } from "./DeleteResultModal";
import { useToggleValue } from "../../hooks/hooks";
import { ErrorPage } from "../../components/ErrorPage/ErrorPage";
import { errorTexts, toastTexts } from "../../utils/texts";
import {
  displaySuccessMessage,
  displayErrorMessage
} from "../../components/toastMessages/toastMessages";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const ResultsWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-top: ${({ theme }) => theme.spacingMobileWithHeader};
  ${({ theme }) => theme.media.atTablet} {
    padding-top: ${({ theme }) => theme.spacingWithHeader};
  }
`;

const ResultsHeader = styled(PageHeader)`
  padding-top: ${({ theme }) => theme.spacingNormal};
  padding-bottom: ${({ theme }) => theme.spacingNormal};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.media.atTablet} {
    justify-content: space-between;
  }
`;

const ResultsPage = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const showModal = useToggleValue(false);

  useEffect(() => {
    if (props.testResults) {
      setIsLoading(false);
      return;
    }

    async function getPreviousResults() {
      try {
        const snapshot = await firestore
          .doc(
            `users/${props.match.params.uid}/results/${props.match.params.testId}`
          )
          .get();

        props.saveTestResult(
          props.match.params.testId,
          snapshot.data().results
        );
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    getPreviousResults();
  }, []);

  const deleteResultHandler = () => {
    firestore
      .doc(`users/${props.match.params.uid}/results/${props.match.params.testId}`)
      .delete()
      .then(() => {
        // setIsSubmitting(false);
        showModal.setFalse();
        displaySuccessMessage(toastTexts.deleted);
      })
      .catch((error) => {
        // setIsSubmitting(false);
        console.log(error);
        showModal.setFalse();
        displayErrorMessage(toastTexts.error);
      });
  }

  window.firestore = firestore;

  if (isLoading) return null;

  if (isError) {
    return (
      <ErrorPage description={errorTexts.result}/>
    )
  }

  return (
    <>
      {showModal.value && (
        <DeleteResultModal
          closeModalHandler={showModal.setFalse}
          deleteResultHandler={deleteResultHandler}
        />
      )}
      <Page>
        <Wrapper>
          <ResultsHeader>
            <Link to={`/${props.match.params.uid}/results`}>
              <Button>Back</Button>
            </Link>
            <Button isDangerous onClick={showModal.setTrue}>
              Delete
            </Button>
          </ResultsHeader>
          <ResultsWrapper>
            <Results data={props.testResults} />
          </ResultsWrapper>
        </Wrapper>
      </Page>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { testResults: state.testResults[ownProps.match.params.testId] };
};

export default connect(
  mapStateToProps,
  { saveTestResult }
)(ResultsPage);
