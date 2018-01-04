import { Map } from 'immutable'

import constants from './constants'

const initialAudioState = new Map({
  duration: 0,
  progress: 0,
  currentTime: 0,
})

/**
 * Reducer for audio filters
 * This is not the reducer for the AudioSinglePlayer component!
 * For AudioSinglePlayer, see reducers in state/story/
 * @param {object} state
 * @param {object} action with a payload of types
 * @return {object} updated version of state
 */
const audioUIReducer = (state = initialAudioState, action) => {
  switch (action.type) {
    case constants.AUDIO_RESET:
      return initialAudioState

    case constants.AUDIO_DURATION_RESET:
      return state.set('duration', action.payload)

    case constants.PROGRESS_CHANGED:
      return state

    case constants.CURRENT_TIME_CHANGED:
      return state

    default:
      return state
  }
}

const getDuration = (state) => (
  state.getIn(['audioUI', 'duration'])
)

export default {
  audioUIReducer,
  getDuration,
}
