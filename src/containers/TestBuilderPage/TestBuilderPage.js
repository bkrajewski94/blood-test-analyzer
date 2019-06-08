import React, { useState } from "react";

import { StepOne } from "./StepOne/StepOne";
import { StepTwo } from "./StepTwo/StepTwo";
import { Page } from "../../components/Page/Page";

export const TestBuilderPage = React.memo(props => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [step, setStep] = useState(1);

  const toNextStepHandler = () => {
    setStep(prevStep => prevStep + 1);
  };

  const toPrevStepHandler = () => {
    setStep(prevStep => prevStep - 1);
  };

  const deleteImageHandler = (index) => {
    const filesArray = [...acceptedFiles]
    filesArray.splice(index, 1);
    if(filesArray.length === 0) {
        setStep(1);
    }
    setAcceptedFiles(filesArray);
  }

  return (
    <Page>
      {step === 1 &&
        <StepOne
          setAcceptedFiles={setAcceptedFiles}
          setRejectedFiles={setRejectedFiles}
          rejectedFiles={rejectedFiles}
          disabled={acceptedFiles.length === 0}
          toNextStepHandler={toNextStepHandler}
        />
      }
      {step === 2 &&
        <StepTwo 
        files={acceptedFiles}
        toNextStepHandler={toNextStepHandler}
        toPrevStepHandler={toPrevStepHandler}
        deleteImageHandler={deleteImageHandler}
        />
      }
      {step === 3 &&
        <div>STEP 3 PLACEHOLDER</div>
      }
    </Page>
  );
});
