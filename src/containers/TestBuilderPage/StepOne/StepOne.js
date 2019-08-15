import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { connect } from "react-redux";

import { theme } from "../../../utils/theme";
import { ReactComponent as AddFilesImage } from "../../../assets/addFiles.svg";
import { Button } from "../../../components/ui-components/Button/Button"
import { texts } from "../../../utils/texts";
import { BuilderHeader, ContentWrapper } from "../BuilderHeader/BuilderHeader";


const Wrapper = styled.div`
  color: ${({theme}) => theme.colors.trout};
  position: relative;
  height: 100%;
`;

const Paragraph = styled.div`
    font-size: ${({theme, isBig}) => isBig ? theme.fontSizeMedium : theme.fontSizeNormal};
    text-align: center;
    padding-top: ${({theme}) => theme.spacingNormal};
`;

const Header = styled(Paragraph)`
    font-size: ${({theme, isBig}) => isBig ? theme.fontSizeLarge : theme.fontSizeBig};
    padding-top: 0; 
`;

const Image = styled(AddFilesImage)`
  display: block;
  height: auto;
  width: 80%;
  max-width: 270px;
`;

const ImageWrapper = styled.div`
    padding-top: ${({theme}) => theme.spacingHuge};
    padding-bottom: ${({theme}) => theme.spacingHuge};
    width: 90%;
    max-width: 370px;
    border-width: 2px;
    border-style: dashed;
    border-color: ${props => getColor(props)};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border .24s ease-in-out;
    margin-left: auto;
    margin-right: auto;
`;

const ButtonWrapper = styled.div`
    text-align: center;
    margin-top: ${({theme}) => theme.spacingLarge};
`;

const DropZone = styled.div`
    width: 90%;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    padding-top: ${({theme}) => theme.spacingLarge};
    padding-bottom: ${({theme}) => theme.spacingLarge};
    text-align: center;
`;

const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizeSmall};
  margin-top: ${({ theme }) => theme.spacingSmall};
  text-align: center;
  color: ${({ theme }) => theme.colors.torchRed};
`;

const getColor = (props) => {
    if (props.isDragReject) {
        return theme.colors.torchRed;
    }
    if (props.isDragActive) {
        return theme.colors.japaneseLaurel;
    }
    return theme.colors.athensGray;
  }

 const StepOneComponent = props => {
  const { getRootProps, getInputProps, open, isDragActive, isDragReject } = useDropzone({
    accept: 'image/jpeg, image/png',
    noClick: props.displayMode === 'mobile' ? false : true,
    noKeyboard: true,
    maxSize: 52428800,
    onDrop: (acceptedFiles, rejectedFiles) => {
        const ImageList = acceptedFiles.map(file => window.URL.createObjectURL(file));
        props.setAcceptedFiles(ImageList);    
        props.setRejectedFiles(rejectedFiles);
    }
  });

   const ErrorMessageContent = (rejectedFiles) => {
       const fileNames = rejectedFiles.map(file => file.name);
       return `Ooops! Files: ${fileNames.join(', ')} were rejected. It may be due to wrong data format (supported: jpg, png), or excessive total file size (max 50MB)`
   }

  return (
    <Wrapper>
        <BuilderHeader nextOnly>
            <Button disabled={props.disabled} onClick={props.toNextStepHandler} isPrimary>
                {texts.testBuilder.nextStep}
            </Button>
        </BuilderHeader>
        <ContentWrapper>
        {props.displayMode === 'mobile' && (
            <>
                <Header >{texts.testBuilder.newTest}</Header>
                <Paragraph>{texts.testBuilder.selectResults}</Paragraph>
                <div className="container">
                    <DropZone {...getRootProps()}>
                        <ImageWrapper>
                            <Image />
                        </ImageWrapper>
                        {props.rejectedFiles.length > 0 &&
                            <ErrorMessage>{ErrorMessageContent(props.rejectedFiles)}</ErrorMessage>
                        }
                    <input {...getInputProps()} />
                    </DropZone>
                </div>
            </>
        )}
        {props.displayMode === 'desktop' && (
            <>
                <Header isBig>{texts.testBuilder.startTest}</Header>
                <Paragraph isBig>{texts.testBuilder.dragDrop}</Paragraph>
                <div className="container">
                    <DropZone {...getRootProps()}>
                        <ImageWrapper isDragActive={isDragActive} isDragReject={isDragReject}>
                            <Image />
                        </ImageWrapper>
                        {props.rejectedFiles.length > 0 &&
                            <ErrorMessage>{ErrorMessageContent(props.rejectedFiles)}</ErrorMessage>
                        }
                    <input {...getInputProps()} />
                    <ButtonWrapper>
                        <Button type="button" onClick={open} isPrimary>
                            {texts.testBuilder.select}
                        </Button>
                    </ButtonWrapper>
                    </DropZone>
                </div>
            </>
        )}
        </ContentWrapper>
    </Wrapper>
  );
};

const mapStateToProps = state => {
    return { displayMode: state.displayMode }
}

export const StepOne = connect(mapStateToProps)(StepOneComponent)
