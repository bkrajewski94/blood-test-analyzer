import React from "react";
import styled, { css } from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.trout};
  border: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.whiteLilac};
  text-align: ${({ center }) => (center ? "center" : "left")};
`;

export const TableRow = styled.tr`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
`;

export const TableHeaderCell = styled.th`
  padding-top: ${({ theme }) => theme.spacingNormal};
  padding-bottom: ${({ theme }) => theme.spacingNormal};
  border-left: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  width: ${({ width }) => width};
`;

export const TableBody = styled.tbody`
  text-align: ${({ center }) => (center ? "center" : "left")};
`;

export const TableCell = styled.td`
  padding-top: ${({ theme }) => theme.spacingNormal};
  padding-bottom: ${({ theme }) => theme.spacingNormal};
  border-left: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  position: ${({ relative }) => relative && "relative"};
  ${({ hover }) =>
    hover &&
    css`
      cursor: pointer;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    `}
`;
