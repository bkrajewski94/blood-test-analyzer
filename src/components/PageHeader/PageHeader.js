import styled from "styled-components";

export const PageHeader = styled.div`
    width: 100%;
    border-radius: 0 0 10px 10px;
    border-bottom: 2px solid #247c03;
    box-shadow: ${({theme}) => theme.boxShadow};
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${({theme}) => theme.colors.white};
    z-index: 10;
`;