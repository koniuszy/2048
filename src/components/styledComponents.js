import styled from "styled-components"
import media from "../media-query/media"

// width and height of Game Screen

export const GlobalCell = styled.div`
  width: 105px;
  height: 105px;
  border-radius: 5px;

  ${media.lessThan("small")`
    width: 58px;
    height: 58px;
  `}
`

export const ANIMATIONTIME = 250
