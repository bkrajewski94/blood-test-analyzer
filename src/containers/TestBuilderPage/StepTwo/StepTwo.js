import React, { useState, useEffect, useRef } from "react";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";
import { TesseractWorker } from "tesseract.js";
import "react-image-gallery/styles/css/image-gallery.css";

import { BuilderHeader, ContentWrapper } from "../BuilderHeader/BuilderHeader";
import { Button } from "../../../components/ui-components/Button/Button";
import { HorizontalBar } from "../../../components/ui-components/HorizontalBar/HorizontalBar";
import { Tile } from "../../../components/ui-components/Tile/Tile";
import { ReactComponent as TrashBin } from "../../../assets/trash.svg";
import { texts } from "../../../utils/texts";
import styles from "./StepTwo.module.css";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Content = styled.div`
  padding-bottom: ${({ theme }) => theme.spacingContentMobile};
  ${({ theme }) => theme.media.atTablet} {
      padding-bottom: ${({ theme }) => theme.spacingContent};
  }
`;

const GalleryTile = styled(Tile)`
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacingNormal};
  position: relative;
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
`;

const TrashBinIcon = styled(TrashBin)`
  position: absolute;
  right: ${({ theme }) => theme.spacing(4.5)};
  bottom: ${({ theme }) => theme.spacing(1.75)};
  width: 30px;
  height: 30px;
  z-index: 5;
  fill: ${({ theme }) => theme.colors.torchRed};
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

const LoaderWrapperForHeader = styled.div`
  width: 50%;
  max-width: 500px;
  display: none;
  ${({ theme }) => theme.media.atDesktop} {
    display: block;
  }
`;

const LoaderWrapperForPage = styled.div`
  width: 75%;
  min-width: 250px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.spacingNormal};
  display: block;
  ${({ theme }) => theme.media.atDesktop} {
    display: none;
  }
`;

const countLoaderPercetageValue = (progress) => {
  if(progress.length > 0) {
    return Math.round(progress.reduce((a, b) => a + b, 0)/progress.length * 100) 
  } else {
    return 0
  }
}

export const StepTwo = ({
  files,
  toNextStepHandler,
  toPrevStepHandler,
  deleteImageHandler,
  readResultsHandler,
  recognitionStatus,
  setRecognitionStatus,
  RECOGNITION_STATUS_DICTIONARY
}) => {
  const gallery = useRef();
  const rejectTesseract = useRef(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    return () => {rejectTesseract.current = true};
  },[])

  const images = files.map(file => {
    return {
      original: file,
      thumbnail: file
    };
  });

  const tesseractRecognize = (file, i) => new Promise((resolve, reject) => {
    const worker = new TesseractWorker();
   
    worker.recognize(file, 'pol+eng')
      .progress(message => {
        if(message.status === "recognizing text" && !rejectTesseract.current) {
          setProgress(prevProgress => { 
            const actualProgress = [...prevProgress]; 
            actualProgress[i] = message.progress; 
            return actualProgress
          }); 
        }
        if(rejectTesseract.current) {
          worker.terminate();
        }
      })
      .then(result => {
        resolve(result.lines)
      })
      .catch(reject)
  });

  const doOCR = () => {
    setRecognitionStatus(RECOGNITION_STATUS_DICTIONARY.PROCESSING);
    Promise.all(files.map((file, i) => tesseractRecognize(file, i)))
      .then(results => {
        readResultsHandler(results.flat().map(result => result.text), 'diagnostyka');
      })
  }

  return (
    <Wrapper>
      <BuilderHeader>
        <Button onClick={toPrevStepHandler}>{texts.testBuilder.prevStep}</Button>
        {recognitionStatus === RECOGNITION_STATUS_DICTIONARY.READY && (
          <Button onClick={doOCR} isPrimary>
            {texts.testBuilder.startNow}
          </Button>
        )}
        {recognitionStatus === RECOGNITION_STATUS_DICTIONARY.PROCESSING && (
          <>
            <LoaderWrapperForHeader>
              <HorizontalBar percentageValue={countLoaderPercetageValue(progress)} />
            </LoaderWrapperForHeader>
            <Button disabled isPrimary>
              {texts.testBuilder.processing}
            </Button>
          </>
        )}
        {(recognitionStatus === RECOGNITION_STATUS_DICTIONARY.FINISHED || recognitionStatus === RECOGNITION_STATUS_DICTIONARY.SAVED) && (
          <Button onClick={toNextStepHandler} isPrimary>
            {texts.testBuilder.results}
          </Button>
        )}
      </BuilderHeader>
      <ContentWrapper>
        <Content>
          {recognitionStatus === RECOGNITION_STATUS_DICTIONARY.PROCESSING && (
            <LoaderWrapperForPage>
              <HorizontalBar percentageValue={countLoaderPercetageValue(progress)} />
            </LoaderWrapperForPage>
          )}
          <GalleryTile>
            <TrashBinIcon
              onClick={() =>
                deleteImageHandler(gallery.current.getCurrentIndex())
              }
            />
            <ImageGallery
              items={images}
              showBullets={true}
              showIndex={true}
              showThumbnails={false}
              lazyLoad={true}
              showPlayButton={false}
              useBrowserFullscreen={true}
              ref={i => (gallery.current = i)}
              onScreenChange = {fullScreenElement => !!fullScreenElement ? setFullScreen(true) : setFullScreen(false)}
              additionalClass={isFullScreen ? styles.imageGalleryFullscreen : null}
            />
          </GalleryTile>
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
};
