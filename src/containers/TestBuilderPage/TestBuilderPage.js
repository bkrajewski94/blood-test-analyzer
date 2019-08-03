import React, { useState } from "react";

import { StepOne } from "./StepOne/StepOne";
import { StepTwo } from "./StepTwo/StepTwo";
import { StepThree } from "./StepThree/StepThree";
import { Page } from "../../components/Page/Page";
import { readDiagnostyka } from "./readDiagnostyka/readDiagnostyka";

const recognitionStatusLibrary = ['ready', 'processing', 'finished'];
const RECOGNITION_STATUS_DICTIONARY = {
  READY: 'ready',
  PROCESSING: 'processing',
  FINISHED: 'finished',
};

export const TestBuilderPage = React.memo(props => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [step, setStep] = useState(1);
  const [recognitionStatus, setRecognitionStatus] = useState(RECOGNITION_STATUS_DICTIONARY.READY);
  const [results, setResults] = useState({});

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
      case 'diagnostyka':
        data = [...readDiagnostyka(results)];
    }
    setResults(data);
    setRecognitionStatus(RECOGNITION_STATUS_DICTIONARY.FINISHED);
  };

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
      {step === 3 && <StepThree data={results} />}
    </Page>
  );
});
