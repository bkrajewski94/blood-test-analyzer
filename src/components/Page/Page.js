import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
    flex-grow: 1;
    min-height: 100%;
`;

export const Page = (props) => (
    <PageWrapper>
        {props.children}
    </PageWrapper>
)