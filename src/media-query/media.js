import { generateMedia } from "styled-media-query"

const media = generateMedia({
  xLarge: "1400px",
  large: "1024px",
  medium: "768px",
  small: "600px",
  xSmall: "420px"
})

export default media

// https://github.com/morajabi/styled-media-query
