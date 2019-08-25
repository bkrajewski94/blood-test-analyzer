import React from "react";
import styled from "styled-components";
import moment from "moment";

import {Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell} from "../../components/Table/Table";
import { Page } from "../../components/Page/Page";
import { ReactComponent as TrashBin } from "../../assets/trash.svg";
import { ReactComponent as OpenDocumentIcon } from "../../assets/openDocument.svg";
import { ResultsEmptyScreen } from "./ResultsEmptyScreen";

const TableWrapper = styled.div`
    width: 90%;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${({ theme }) => theme.spacingContentMobile}; 
    ${({theme}) => theme.media.atTablet}{
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

export const PreviousResultsPage = (props) => {

    const onStartTestHandler = () => {
        props.history.push(`/${props.match.params.uid}/new-test`);
    }

    return (
        <Page>
            <ResultsEmptyScreen onClick={onStartTestHandler}/>
            {/* <TableWrapper>
                <Table>
                    <TableHeader center>
                        <TableRow>
                            <TableHeaderCell width="33%">
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
                        <TableRow>
                            <TableCell>
                                {moment().format('YYYY-MM-DD (HH:mm)')}
                            </TableCell>
                            <TableCell relative hover>
                                <OpenButton />
                            </TableCell>
                            <TableCell relative hover>
                                <DeleteButton />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {moment().format('YYYY-MM-DD (HH:mm)')}
                            </TableCell>
                            <TableCell relative hover>
                                <OpenButton />
                            </TableCell>
                            <TableCell relative hover>
                                <DeleteButton />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {moment().format('YYYY-MM-DD (HH:mm)')}
                            </TableCell>
                            <TableCell relative hover>
                                <OpenButton />
                            </TableCell>
                            <TableCell relative hover>
                                <DeleteButton />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {moment().format('YYYY-MM-DD (HH:mm)')}
                            </TableCell>
                            <TableCell relative hover>
                                <OpenButton />
                            </TableCell>
                            <TableCell relative hover>
                                <DeleteButton />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableWrapper> */}
        </Page>
    )
}
