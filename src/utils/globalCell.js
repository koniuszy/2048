import styled from 'styled-components'
import media from '../media-query/media'

export const GlobalCell = styled.div`
  width: 105px;
  height: 105px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;

  ${media.lessThan('small')`
    width: 58px;
    height: 58px;
  `}
`
