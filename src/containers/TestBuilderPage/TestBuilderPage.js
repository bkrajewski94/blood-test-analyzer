import React, { useState } from "react";

import { StepOne } from "./StepOne/StepOne";
import { StepTwo } from "./StepTwo/StepTwo";
import { StepThree } from "./StepThree/StepThree";
import { Page } from "../../components/Page/Page";
import { readDiagnostyka } from "./readDiagnostyka/readDiagnostyka";
import { firestore } from "../../firebase";
import {
  displaySuccessMessage,
  displayErrorMessage
} from "../../components/toastMessages/toastMessages";
import { useToggleValue } from "../../hooks/hooks";
import { toastTexts } from "../../utils/texts";

const RECOGNITION_STATUS_DICTIONARY = {
  READY: "ready",
  PROCESSING: "processing",
  FINISHED: "finished",
  SAVED: "saved"
};

export const TestBuilderPage = React.memo(props => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [step, setStep] = useState(1);
  const [recognitionStatus, setRecognitionStatus] = useState(
    RECOGNITION_STATUS_DICTIONARY.READY
  );
  const [results, setResults] = useState({});
  const showSaveResultsModal = useToggleValue(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toNextStepHandler = () => {
    setStep(prevStep => prevStep + 1);
  };

  const toPrevStepHandler = () => {
    step === 2 && setRecognitionStatus(RECOGNITION_STATUS_DICTIONARY.READY);
    setStep(prevStep => prevStep - 1);
  };

  const deleteImageHandler = index => {
    const filesArray = [...acceptedFiles];
    filesArray.splice(index, 1);
    if (filesArray.length === 0) {
      setStep(1);
    }
    setAcceptedFiles(filesArray);
  };

  const readResultsHandler = (results, pattern) => {
    let data = {};
    switch (pattern) {
      case "diagnostyka":
        data = [...readDiagnostyka(results)];
    }
    setResults(data);
    setRecognitionStatus(RECOGNITION_STATUS_DICTIONARY.FINISHED);
  };

  const storeOnServerHandler = () => {
    setIsSubmitting(true);
    showSaveResultsModal.setFalse();
    firestore
      .collection(`users/${props.match.params.uid}/results`)
      .add({
        results
      })
      .then(() => {
        setRecognitionStatus(RECOGNITION_STATUS_DICTIONARY.SAVED);
        setIsSubmitting(false);
        displaySuccessMessage(toastTexts.saved);
      })
      .catch(() => {
        setIsSubmitting(false);
        displayErrorMessage(toastTexts.error);
      });
  };

  const onCompleteHandler = () => {
    props.history.push(`/${props.match.params.uid}/results`);
  }

  return (
    <Page>
      {step === 1 && (
        <StepOne
          setAcceptedFiles={setAcceptedFiles}
          setRejectedFiles={setRejectedFiles}
          rejectedFiles={rejectedFiles}
          disabled={acceptedFiles.length === 0}
          toNextStepHandler={toNextStepHandler}
        />
      )}
      {step === 2 && (
        <StepTwo
          files={acceptedFiles}
          toNextStepHandler={toNextStepHandler}
          toPrevStepHandler={toPrevStepHandler}
          deleteImageHandler={deleteImageHandler}
          readResultsHandler={readResultsHandler}
          recognitionStatus={recognitionStatus}
          setRecognitionStatus={setRecognitionStatus}
          RECOGNITION_STATUS_DICTIONARY={RECOGNITION_STATUS_DICTIONARY}
        />
      )}
      {step === 3 && (
        <StepThree 
          data={results} 
          toPrevStepHandler={toPrevStepHandler} 
          storeOnServerHandler={storeOnServerHandler}
          showModal={showSaveResultsModal}
          recognitionStatus={recognitionStatus}
          RECOGNITION_STATUS_DICTIONARY={RECOGNITION_STATUS_DICTIONARY}
          onCompleteHandler={onCompleteHandler}
          isSubmitting={isSubmitting}
          />
      )}
    </Page>
  );
});
