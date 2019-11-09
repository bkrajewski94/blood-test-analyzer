import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import styled from "styled-components";

import { ReactComponent as PointerComponent } from "../../assets/pointer.svg";

const PieChartWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PointerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: ${({ angle }) => `rotate(${angle}deg)`};
`;

const Pointer = styled(PointerComponent)`
  position: absolute;
  left: 50%;
  top: 23px;
  transform: translateX(-50%);
`;

export const PieChartComponent = ({data, angle}) => {
  return (
    <PieChartWrapper>
      <PieChart width={200} height={200}>
        <Pie
          data={data} 
          cx={95} 
          cy={95} 
          outerRadius={100} 
          fill="#8884d8"
          isAnimationActive={false}
          startAngle={90}
          endAngle={450}
          dataKey="value"
        >
          {
            data.map((entry) => <Cell key={entry.name} fill={entry.color}/>) //entry needed for colors to work properly
          }
        </Pie>
      </PieChart>
      <PointerWrapper angle={angle}>
        <Pointer />
      </PointerWrapper>
    </PieChartWrapper>
  );
}