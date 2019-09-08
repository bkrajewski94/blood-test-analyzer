import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from 'react-router-dom';

import {
  Table,
  TableRow,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableCell
} from "../../components/Table/Table";
import { Page } from "../../components/Page/Page";
import { ReactComponent as TrashBin } from "../../assets/trash.svg";
import { ReactComponent as OpenDocumentIcon } from "../../assets/openDocument.svg";
import { ResultsEmptyScreen } from "./ResultsEmptyScreen";
import { firestore } from "../../firebase";
import { DeleteResultModal } from "../ResultsPage/DeleteResultModal";
import {
  displaySuccessMessage,
  displayErrorMessage
} from "../../components/toastMessages/toastMessages";
import { toastTexts } from "../../utils/texts";

const TableWrapper = styled.div`
  width: 90%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ theme }) => theme.spacingContentMobile};
  ${({ theme }) => theme.media.atTablet} {
    margin-top: ${({ theme }) => theme.spacingContent};
  }
`;

const DeleteButton = styled(TrashBin)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  fill: ${({ theme }) => theme.colors.torchRed};
`;

const OpenButtonIcon = styled(OpenDocumentIcon)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  fill: ${({ theme }) => theme.colors.japaneseLaurel};
`;

const OpenButton = styled(Link).attrs({
  children: <OpenButtonIcon />
})`
`;

export const PreviousResultsPage = props => {
  const [data, setData] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const unsubscribe = firestore
      .collection(`users/${props.match.params.uid}/resultsSummary`)
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const previousData = snapshot.docs.map(doc => {
            const id = doc.id;
            const { createdAt, resultId } = doc.data();
            return {
              id,
              data: {
                createdAt: moment
                  .unix(createdAt.seconds)
                  .format("YYYY-MM-DD (HH:mm)"),
                resultId
              }
            }
        });
        setData(previousData);
        setIsLoading(false);
      });

    return unsubscribe;
  },[])

  const onStartTestHandler = () => {
    props.history.push(`/${props.match.params.uid}/new-test`);
  };

  const onDeleteButtonClick = (id) => {
    setIdToDelete(id);
    setShowModal(true);
  }

  const closeModalHandler = () => {
    setIdToDelete("");
    setShowModal(false);
  }

  const deleteResultHandler = () => {
    console.log(`users/${props.match.params.uid}/resultsSummary/${idToDelete}`);
    firestore
      .doc(`users/${props.match.params.uid}/resultsSummary/${idToDelete}`)
      .delete()
      .then(() => {
        // setIsSubmitting(false);
        closeModalHandler();
        displaySuccessMessage(toastTexts.deleted);
      })
      .catch((error) => {
        // setIsSubmitting(false);
        console.log(error);
        closeModalHandler();
        displayErrorMessage(toastTexts.error);
      });
  }

  if(isLoading) return null;

  return (
    <>
      {showModal && (
          <DeleteResultModal
            closeModalHandler={closeModalHandler}
            deleteResultHandler={deleteResultHandler}
          />
      )}
      <Page>
          {data.length ? (
              <TableWrapper>
                  <Table>
                      <TableHeader center>
                          <TableRow>
                              <TableHeaderCell width="50%">
                                  Date:
                              </TableHeaderCell>
                              <TableHeaderCell>
                                  Inspect:
                              </TableHeaderCell>
                              <TableHeaderCell>
                                  Delete:
                              </TableHeaderCell>
                          </TableRow>
                      </TableHeader>
                      <TableBody center>
                          {data.map(element => (
                              <TableRow key={element.id}>
                                  <TableCell>
                                      {element.data.createdAt}
                                  </TableCell>
                                  <TableCell relative hover>
                                      <OpenButton to={`/${props.match.params.uid}/results/${element.data.resultId}`} />
                                  </TableCell>
                                  <TableCell relative hover>
                                      <DeleteButton onClick={() => onDeleteButtonClick(element.id)}/>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableWrapper> 
          ) : (
              <ResultsEmptyScreen onClick={onStartTestHandler} />
          )}
      </Page>
    </>
  );
};
