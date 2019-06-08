import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";
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

export const StepTwo = ({ files, toNextStepHandler, toPrevStepHandler, deleteImageHandler }) => {
  const gallery = useRef();
  const images = files.map(file => {
    return {
      original: file,
      thumbnail: file
    };
  });
  return (
    <Wrapper>
      <BuilderHeader>
        <Button onClick={toPrevStepHandler}>Prev step</Button>
        <Button onClick={toNextStepHandler} isPrimary>
          Start now!
        </Button>
      </BuilderHeader>
      <ContentWrapper>
        <GalleryTile>
          <TrashBinIcon onClick={() => deleteImageHandler(gallery.current.getCurrentIndex())}/>
          <ImageGallery
            items={images}
            showBullets={true}
            showIndex={true}
            showThumbnails={false}
            lazyLoad={true}
            showPlayButton={false}
            useBrowserFullscreen={true}
            ref={i => (gallery.current = i)}
            // onSlide={() => deleteImageHandler(gallery.current.getCurrentIndex())}
          />
        </GalleryTile>
      </ContentWrapper>
    </Wrapper>
  );
};
