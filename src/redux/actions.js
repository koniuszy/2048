import { GORIGHT } from "./constants"

export const goRight = content => {
  return {
    type: GORIGHT,
    payload: {
      content
    }
  }
}
