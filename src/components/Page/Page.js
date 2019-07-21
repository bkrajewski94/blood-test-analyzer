import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
    flex-grow: 1;
    height: 100%;
    overflow-y: auto;
`;

export const Page = (props) => (
    <PageWrapper>
        {props.children}
    </PageWrapper>
)