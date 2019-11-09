import React, {useMemo} from "react";
import styled from "styled-components";

import { Tile } from "../../components/ui-components/Tile/Tile";
import { PieChartComponent as PieChart } from "../../components/PieChart/PieChart";
import { LegendElement } from "../../components/Legend/LegendElement";

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 725px;
  margin: 0 auto;
  padding-bottom: ${({ theme }) => theme.spacingContentMobile};
  ${({ theme }) => theme.media.atTablet} {
    padding-bottom: ${({ theme }) => theme.spacingContent};
  }
`;

const PieChartTile = styled(Tile)`
  & + & {
    margin-top: ${({ theme }) => theme.spacingContentMobile};
  }
  ${({ theme }) => theme.media.atTablet} {
    & + & {
      margin-top: ${({ theme }) => theme.spacingContent};
    }
  }
  width: 100%;
`;

const PieChartSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PieChartWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacingBig};
  border: ${({ theme }) => `2px dashed ${theme.colors.athensGray}`};
  border-radius: 10px;
  padding-top: ${({ theme }) => theme.spacingSmall};
  padding-bottom: ${({ theme }) => theme.spacingSmall};
  ${({ theme }) => theme.media.atTablet} {
    margin-left: ${({ theme }) => theme.spacingMiniscule};
    margin-right: ${({ theme }) => theme.spacingMiniscule};
  }
`;

const PieChartTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizeLarge};
  font-family: ${({ theme }) => theme.fontDefault};
  color: ${({ theme }) => theme.colors.trout};
  margin-bottom: ${({ theme }) => theme.spacingLarge};
  text-align: center;
  font-family: ${({ theme }) => theme.fontHandWriting};
`;

const Legend = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: ${({ theme }) => `2px dashed ${theme.colors.athensGray}`};
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.spacingBig};
  padding-left: ${({ theme }) => theme.spacingNormal};
  padding-right: ${({ theme }) => theme.spacingNormal};
  ${({ theme }) => theme.media.atTablet} {
    margin-left: ${({ theme }) => theme.spacingMiniscule};
    margin-right: ${({ theme }) => theme.spacingMiniscule};
  }
`;

const getPieChartData = ranges =>
  ranges.map(element => ({
    name: element.description,
    value: 1, //every piece of pieChart must take the same amout of space - it can be changed to any value (proportion counts)
    color: element.color
  }));

const findClosestRange = (value, ranges) => {
  let index = 0;
  let error = 1;
  ranges.forEach((range, i) => {
    if (Math.abs(range.expectedValue - value) < error) {
      index = i;
      error = Math.abs(range.expectedValue - value);
    }
  });
  return index;
};

const getPointerAngle = (index, size) => {
  return ((360 / size) * index + (360 / size) * 0.5) * -1;
};

function getActiveIndexes(data) {
  return data.map(element => findClosestRange(element.value, element.ranges))
}

export const Results = ({data}) => {
  const activeIndexes = useMemo(() => getActiveIndexes(data), []);

  return(
    <ResultsWrapper>
      {data.map((element, index) => (
        <PieChartTile key={element.title.split(" ").join("")}>
          <PieChartTitle>{element.title}</PieChartTitle>
          <PieChartSection>
            <PieChartWrapper>
              <PieChart
                data={getPieChartData(element.ranges)}
                angle={getPointerAngle(
                  activeIndexes[index],
                  element.ranges.length
                )}
              />
            </PieChartWrapper>
            <Legend>
              {element.ranges.map((range, i) => (
                <LegendElement
                  key={range.color}
                  color={range.color}
                  title={range.description}
                  isActive={false}
                />
              ))}
            </Legend>
          </PieChartSection>
        </PieChartTile>
      ))}
    </ResultsWrapper>
  )
}