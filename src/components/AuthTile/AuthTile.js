import { Tile } from "../ui-components/Tile/Tile";
import styled from "styled-components";

export const AuthTile = styled(Tile)`
    width: 90%;
    max-width: 700px;
    margin: ${({ theme }) => `${theme.spacingContentMobile} auto`}; 
    ${({theme}) => theme.media.atTablet}{
        margin: ${({ theme }) => `${theme.spacingContent} auto`}; 
    }
`;
