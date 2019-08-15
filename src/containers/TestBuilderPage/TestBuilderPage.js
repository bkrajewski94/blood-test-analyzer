import React, { useState } from "react";

import { StepOne } from "./StepOne/StepOne";
import { StepTwo } from "./StepTwo/StepTwo";
import { StepThree } from "./StepThree/StepThree";
import { Page } from "../../components/Page/Page";
import { readDiagnostyka } from "./readDiagnostyka/readDiagnostyka";
import { firestore } from "../../firebase";

const RECOGNITION_STATUS_DICTIONARY = {
  READY: "ready",
  PROCESSING: "processing",
  FINISHED: "finished"
};

const StepThreeMocks = JSON.parse(
  '[{"value":0.0017112063713143719,"ranges":[{"description":"Anemia caused by B9 and B12 deficiency","expectedValue":0,"color":"#FFBB28"},{"description":"Anemia caused by B9, B12 and iron deficiency","expectedValue":0.25,"color":"#c42700"},{"description":"Anemia caused by iron deficiency","expectedValue":0.5,"color":"#FF8042"},{"description":"The value expected for a healthy person","expectedValue":0.75,"color":"#00C49F"},{"description":"Too high blood density","expectedValue":1,"color":"#0088FE"}],"title":"Red blood cels"},{"value":0.6288499015724472,"ranges":[{"description":"Severe immune system disorder","expectedValue":0,"color":"#c42700"},{"description":"Chronic/moderate immune sytem disorder","expectedValue":0.33,"color":"#FFBB28"},{"description":"The value expected for a healthy person","expectedValue":0.66,"color":"#00C49F"},{"description":"Acute/ongoing infection","expectedValue":1,"color":"#0088FE"}],"title":"White blood cells"},{"value":0.000014431421224568295,"ranges":[{"description":"Hypothyroidism","expectedValue":0,"color":"#FFBB28"},{"description":"The value expected for a healthy person","expectedValue":0.5,"color":"#00C49F"},{"description":"Hyperthyroidism","expectedValue":1,"color":"#FF8042"}],"title":"Thyriod"},{"value":1,"ranges":[{"description":"Type 1 diabetes","expectedValue":0,"color":"#c42700"},{"description":"The value expected for a healthy person","expectedValue":0.33,"color":"#00C49F"},{"description":"Insulin resistance","expectedValue":0.66,"color":"#FFBB28"},{"description":"Type 2 diabetes","expectedValue":1,"color":"#FF8042"}],"title":"Blood sugar"},{"value":0.9999999999988429,"ranges":[{"description":"The value expected for a healthy person","expectedValue":0,"color":"#00C49F"},{"description":"Active hashimoto disease","expectedValue":1,"color":"#c42700"}],"title":"Hashimoto"},{"value":2.777903598056023e-17,"ranges":[{"description":"The value expected for a healthy person","expectedValue":0,"color":"#00C49F"},{"description":"Active allergy","expectedValue":1,"color":"#FF8042"}],"title":"Allergies"}]'
);

export const TestBuilderPage = React.memo(props => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [step, setStep] = useState(1);
  const [recognitionStatus, setRecognitionStatus] = useState(
    RECOGNITION_STATUS_DICTIONARY.READY
  );
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
      case "diagnostyka":
        data = [...readDiagnostyka(results)];
    }
    setResults(data);
    setRecognitionStatus(RECOGNITION_STATUS_DICTIONARY.FINISHED);
  };

  const storeOnServerHandler = async () => {
   const docRef  = await firestore.collection(`users/${props.match.params.uid}/results`).add({
      StepThreeMocks
    });
  const doc = await docRef.get();
  }

  console.log(props);

  return (
    <Page>
      {/* {step === 1 && (
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
        <StepThree data={results} toPrevStepHandler={toPrevStepHandler} />
      )} */}
      <StepThree data={StepThreeMocks} toPrevStepHandler={toPrevStepHandler} storeOnServerHandler={storeOnServerHandler}/>
    </Page>
  );
});
