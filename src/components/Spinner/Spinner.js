import React from "react";
import styled from "styled-components";

const SpinnerComponent = styled.svg`
  animation: rotate 1s linear infinite;
  width: 100px;
  height: 100px;

  & .path {
    stroke: #b71414;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const SpinnerWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Spinner = () => (
    <SpinnerComponent viewBox="0 0 50 50">
        <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
        />
    </SpinnerComponent>
);

