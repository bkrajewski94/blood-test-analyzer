import React, { useState } from "react";

import { StepOne } from "./StepOne/StepOne";
import { StepTwo } from "./StepTwo/StepTwo";
import { Page } from "../../components/Page/Page";
import { readDiagnostyka } from "./readDiagnostyka/readDiagnostyka";
import { ReactComponent as Test} from "../../assets/test.svg";

const recognitionStatusLibrary = ['ready', 'processing', 'finished']

export const TestBuilderPage = React.memo(props => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [step, setStep] = useState(1);
  const [recognitionStatus, setRecognitionStatus] = useState(recognitionStatusLibrary[0]);
  const [results, setResults] = useState({});

  const toNextStepHandler = () => {
    setStep(prevStep => prevStep + 1);
  };

  const toPrevStepHandler = () => {
    step === 2 && setRecognitionStatus(recognitionStatusLibrary[0]);
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
        data = {...readDiagnostyka(results)};
    }
    setResults(data);
    setRecognitionStatus(recognitionStatusLibrary[2]);
  };

  return (
    <Page>
      {step === 1 && (
        // <StepOne
        //   setAcceptedFiles={setAcceptedFiles}
        //   setRejectedFiles={setRejectedFiles}
        //   rejectedFiles={rejectedFiles}
        //   disabled={acceptedFiles.length === 0}
        //   toNextStepHandler={toNextStepHandler}
        // />
        <Test />
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
          recognitionStatusLibrary={recognitionStatusLibrary}
        />
      )}
      {step === 3 && <div>STEP 3 PLACEHOLDER</div>}
    </Page>
  );
});
