import React from "react";
import styled from "styled-components";

const InputComponent = styled.input`
  border: ${({ theme }) => `2px solid ${theme.colors.frenchGray}`};
  border-radius: 4px;
  margin-top: ${({ theme }) => theme.spacingNormal};
  margin-bottom: ${({ theme }) => theme.spacingNormal};
  outline: none;
  padding: ${({ theme }) => `${theme.spacingTiny} ${theme.spacingNormal}`};
  transition: 0.3s;
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizeNormal};
  color: ${({ theme }) => theme.colors.trout};
  &:focus {
    border-color: ${({ isCorrect, theme }) =>
      isCorrect ? theme.colors.japaneseLaurel : theme.colors.thunderbird};
    box-shadow: ${({ isCorrect, theme }) =>
      isCorrect
        ? `0 0 8px 0 ${theme.colors.japaneseLaurel}`
        : `0 0 8px 0 ${theme.colors.thunderbird}}`};
  }
`;
export const Input = ({ type, placeholder, isCorrect, ...otherProps }) => {
  return (
      <InputComponent
        type={type}
        placeholder={placeholder}
        isCorrect={isCorrect}
        {...otherProps}
      />
  );
};
