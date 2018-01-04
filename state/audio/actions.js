import constants from './constants'

const setDuration = (duration) => ({
  type: constants.DURATION_RESET,
  payload: duration,
})

export default {
  setDuration,
}
