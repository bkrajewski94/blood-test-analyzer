import React from "react";
import styled from "styled-components";

const Background = styled.div`
  height: ${({ theme }) => theme.spacingNormal};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.frenchGray};
  position: relative;
  border-radius: 5px;
`;

const Fill = styled.div`
  height: 100%;
  width: ${({ percentageValue }) => `${percentageValue}%`};
  background-color: ${({ theme }) => theme.colors.japaneseLaurel};
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px;
  transition: width 0.2s ease-out;
`;

const Value = styled.div`
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.white};
`;

export const HorizontalBar = React.memo(function HorizontalBar({
  percentageValue
}) {
  return (
    <Background>
      <Fill percentageValue={percentageValue} />
      <Value>{percentageValue}%</Value>
    </Background>
  );
});
