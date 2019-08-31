import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell
} from "../../components/Table/Table";
import { Page } from "../../components/Page/Page";
import { ReactComponent as TrashBin } from "../../assets/trash.svg";
import { ReactComponent as OpenDocumentIcon } from "../../assets/openDocument.svg";
import { ResultsEmptyScreen } from "./ResultsEmptyScreen";
import { firestore } from "../../firebase";

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

const OpenButton = styled(OpenDocumentIcon)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  fill: ${({ theme }) => theme.colors.japaneseLaurel};
`;

export const PreviousResultsPage = props => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPreviousResults() {
      const previousData = [];
      try {
        const snapshot = await firestore
          .collection(`users/${props.match.params.uid}/resultsSummary`)
          .orderBy("createdAt", "desc")
          .get();
        snapshot.forEach(doc => {
          const id = doc.id;
          const { createdAt, resultId } = doc.data();
          previousData.push({
            id,
            data: {
              createdAt: moment
                .unix(createdAt.seconds)
                .format("YYYY-MM-DD (HH:mm)"),
              resultId
            }
          });
        });
        setData(previousData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    getPreviousResults();
  }, []);

  const onStartTestHandler = () => {
    props.history.push(`/${props.match.params.uid}/new-test`);
  };

  if(isLoading) return null;

  return (
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
                                    <OpenButton onClick={() => console.log(element.data.resultId)}/>
                                </TableCell>
                                <TableCell relative hover>
                                    <DeleteButton onClick={() => console.log(element.data.resultId)}/>
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
  );
};
