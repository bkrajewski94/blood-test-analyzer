import React, { useEffect, useRef } from "react";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";
import Tesseract from "tesseract.js";
import "react-image-gallery/styles/css/image-gallery.css";

import { BuilderHeader, ContentWrapper } from "../BuilderHeader/BuilderHeader";
import { Button } from "../../../components/ui-components/Button/Button";
import { Tile } from "../../../components/ui-components/Tile/Tile";
import { ReactComponent as TrashBin } from "../../../assets/trash.svg";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const GalleryTile = styled(Tile)`
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacingNormal};
  position: relative;
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

export const StepTwo = ({
  files,
  toNextStepHandler,
  toPrevStepHandler,
  deleteImageHandler,
  readResultsHandler,
  recognitionStatus,
  setRecognitionStatus,
  recognitionStatusLibrary
}) => {
  const gallery = useRef();
  const rejectTesseract = useRef(false);

  useEffect(() => {
    return () => {rejectTesseract.current = true};
  },[])

  const images = files.map(file => {
    return {
      original: file,
      thumbnail: file
    };
  });

  const tesseractRecognize = file => new Promise((resolve, reject) => {
    const { TesseractWorker } = Tesseract;
    const worker = new TesseractWorker();
   
    worker.recognize(file, 'pol+eng')
      .progress(message => {
        console.log(message.progress);
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
    setRecognitionStatus(recognitionStatusLibrary[1]);
    Promise.all(files.map(file => tesseractRecognize(file)))
      .then(results => {
        readResultsHandler(results.flat().map(result => result.text), 'diagnostyka');
      })
  }
  
  return (
    <Wrapper>
      <BuilderHeader>
        <Button onClick={toPrevStepHandler}>Prev step</Button>
        {recognitionStatus === recognitionStatusLibrary[0] && (
          <Button onClick={doOCR} isPrimary>
            Start now!
          </Button>
        )}
        {recognitionStatus === recognitionStatusLibrary[1] && (
          <Button disabled isPrimary>
            Processing
          </Button>
        )}
        {recognitionStatus === recognitionStatusLibrary[2] && (
          <Button onClick={toNextStepHandler} isPrimary>
            See results
          </Button>
        )}
      </BuilderHeader>
      <ContentWrapper>
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
          />
        </GalleryTile>
      </ContentWrapper>
    </Wrapper>
  );
};
