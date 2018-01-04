import { Raw, Plain } from 'slate'
import { Map, List } from 'immutable'

import constants from './constants'

import { isEmptyString, hasFieldLevelError } from '../../utils/validation'

/**
 * This is the initial state.
 *
 * Setting this informs Redux the shape of this slice of state allowing Redux to
 * give our reducer (and therefore our actions and selectors) only the slice of
 * state that it requires for it to do it's operations.
 *
 * Note: In order to get the full state from the store do that in
 * mapStateToProps or in a saga.
 *
 * @type {Object} The initial state object.
 */
const initialStoryState = new Map({
  headline: '',
  byline: new List([]),
  body: Plain.deserialize(''),
  primaryAudio: new Map({
    filename: '',
    filenameOnServer: '',
    url: '',
    duration: 0,
    audioUI: new Map({
      progress: 0,
      currentTime: 0,
      scrubberWidth: 0,
      audioElement: null,
      mouseDown: false,
      playing: false,
      displayTimestamp: false,
      mouseX: 0,
    }),
  }),
  primaryImage: new Map({
    filename: '',
    filenameOnServer: '',
    url: '',
    caption: '',
    credit: '',
    agency: '',
  }),
  validationErrors: new Map({
    errors: new Map({}),
    errorText: '',
  }),
})

/**
 * The story reducer method.
 *
 * @param {object} [state=initialStoryState] The initial state for the story container.
 * @param {string} action The action that is being taken.
 * @return {object} The new [and not modified] state object.
 */
const reducer = (state = initialStoryState, action) => {
  switch (action.type) {
    case constants.STORY_RESET:
      return initialStoryState

    case constants.STORY_BODY_CHANGED:
      return state.set('body', action.payload)

    case constants.STORY_HEADLINE_CHANGED:
      return state.set('headline', action.payload)

    case constants.STORY_BYLINE_CHANGED:
      return state.set('byline', new List(action.payload))

    case constants.STORY_PRIMARY_AUDIO_CHANGED:
      return state.mergeIn(['primaryAudio'], action.payload)

    case constants.STORY_PRIMARY_AUDIO_REMOVED:
      return state.mergeIn(['primaryAudio'], initialStoryState.get('primaryAudio'))

    case constants.STORY_PRIMARY_IMAGE_CHANGED:
      return state.mergeIn(['primaryImage'], action.payload)

    case constants.STORY_PRIMARY_IMAGE_REMOVED:
      return state.mergeIn(['primaryImage'], initialStoryState.get('primaryImage'))

    case constants.STORY_PRIMARY_IMAGE_METADATA_CAPTION_CHANGE:
    case constants.STORY_PRIMARY_IMAGE_METADATA_AGENCY_CHANGE:
    case constants.STORY_PRIMARY_IMAGE_METADATA_CREDIT_CHANGE:
      const section = ['primaryImage', action.payload.field]
      return state.mergeIn(section, action.payload.change)

    case constants.STORY_LOAD_SUCCEEDED:
      const { headline, byline, body, primaryAudio, primaryImage } = action.payload

      return state.merge({
        headline,
        byline,
        primaryAudio,
        primaryImage,
        body: Raw.deserialize(body, { terse: true }),
      })

    case constants.STORY_PRIMARY_IMAGE_METADATA_CHANGED:
      return state.mergeIn(['primaryImage'], action.payload)

    case constants.PRIMARY_AUDIO_DURATION_RESET:
      return state.setIn(['primaryAudio', 'duration'], action.payload)

    case constants.PRIMARY_AUDIO_CURRENT_TIME_CHANGED:
      return state.setIn(['primaryAudio', 'audioUI', 'currentTime'], action.payload)

    case constants.PRIMARY_AUDIO_SCRUBBER_PROGRESS_CHANGED:
      return state.setIn(['primaryAudio', 'audioUI', 'progress'], action.payload)

    case constants.PRIMARY_AUDIO_SCRUBBER_WIDTH_CHANGED:
      return state.setIn(['primaryAudio', 'audioUI', 'scrubberWidth'], action.payload)

    case constants.SET_PRIMARY_AUDIO_ELEMENT:
      return state.setIn(['primaryAudio', 'audioUI', 'audioElement'], action.payload)

    case constants.PRIMARY_AUDIO_TOGGLE_PLAY:
      return state.setIn(['primaryAudio', 'audioUI', 'playing'], action.payload)

    case constants.PRIMARY_AUDIO_TOGGLE_TIMESTAMP:
      return state.setIn(['primaryAudio', 'audioUI', 'displayTimestamp'], action.payload)

    case constants.PRIMARY_AUDIO_SET_X_POSITION:
      return state.setIn(['primaryAudio', 'audioUI', 'mouseX'], action.payload)

    case constants.STORY_VALIDATION_FAILED:
      const { errorText, errors } = action.payload
      return state.mergeIn(['validationErrors'], {
        errors,
        errorText,
      })

    case constants.STORY_VALIDATION_SUCCEEDED:
      return state.set('validationErrors', initialStoryState.get('validationErrors'))

    default:
      return state
  }
}

// Selectors -------------------------------------------------------------------

/**
 * Get the (JSON) serialized form of the story state slice.
 * @param state
 */
const getSerialized = (state) => ({
  headline: getHeadline(state),
  byline: getByline(state),
  body: Raw.serialize(getBody(state), { terse: true }),
  primaryAudio: getPrimaryAudio(state),
  primaryImage: getPrimaryImage(state),
})

/**
 * Get the headline from the story state slice.
 * @param {object} state The state object on which to operate.
 * @return {string} The body of the story slice.
 */
const getHeadline = (state) => (
  state.get('headline')
)

/**
 * Get the byline from the story state slice.
 * @param {object} state The state object on which to operate.
 * @return {string} The byline from the state story.
 */
const getByline = (state) => (
  state.get('byline')
)

/**
 * Get the body from the story state slice.
 * @param {object} state The state object on which to operate.
 * @return {State} The body of the story slice.
 */
const getBody = (state) => (
  state.get('body')
)

/**
 * Get the Slate Editor state 'document' property.
 * This can be used determine the true length of body content.
 * @param state The state slice on which to operate.
 * @return {object} The value of the 'document' property within the Slate Editor state.
 */
const getBodyDocument = (state) => (
  state.getIn(['body', 'document'])
)

/**
 * Get the primaryAudio from the editor state slice.
 * @param {object} state The state slice on which to operate.
 * @return {object} The full primaryAudio object value from the editor.
 */
const getPrimaryAudio = (state) => (
  state.get('primaryAudio')
)

/**
 * Get the primaryAudio.filename from the primaryAudio state slice.
 * @param {object} state The state slice on which to operate.
 * @return {string} The current value for primaryAudio.filename from the editor.
 */
const getPrimaryAudioFilename = (state) => (
  state.getIn(['primaryAudio', 'filename'])
)

/**
 * Get the primaryAudio.url from the primaryAudio state slice.
 * @param {object} state The state slice on which to operate.
 * @return {string} The current value for primaryAudio.url from the editor.
 */
const getPrimaryAudioUrl = (state) => (
  state.getIn(['primaryAudio', 'url'])
)

/**
 * Get the primaryAudio.duration from the primaryAudio state slice.
 * @param {object} state The state slice on which to operate.
 * @return {string} The current value for primaryAudio.duration from the editor.
 */
const getPrimaryAudioDuration = (state) => (
  state.getIn(['primaryAudio', 'duration'])
)

/**
 * Get the primaryAudio.currentTime
 * @param {object} state
 * @return {Number} The current value for primaryAudio.currentTime.
 */
const getPrimaryAudioCurrentTime = (state) => (
  state.getIn(['primaryAudio', 'audioUI', 'currentTime'])
)

const getPrimaryAudioAudioElement = (state) => (
  state.getIn(['primaryAudio', 'audioUI', 'audioElement'])
)

/**
 * Get the progress of primaryAudio in relation to the width
 * of the scrubber (e.g. if audio has played 50% and scrubber is 200px
 * wide, progress would be 100)
 * @param {object} state
 * @return {Number} The current value for primaryAudio.currentTime.
 */
const getPrimaryAudioScrubberProgress = (state) => (
  state.getIn(['primaryAudio', 'audioUI', 'progress'])
)

/**
 * Get the primaryAudio scrubber width
 * @param {object} state
 * @return {Number} The current width of scrubber.
 */
const getPrimaryAudioScrubberWidth = (state) => (
  state.getIn(['primaryAudio', 'audioUI', 'scrubberWidth'])
)

const getPrimaryAudioPlayingStatus = (state) => (
  state.getIn(['primaryAudio', 'audioUI', 'playing'])
)

const getPrimaryAudioTimestampStatus = (state) => (
  state.getIn(['primaryAudio', 'audioUI', 'displayTimestamp'])
)

const getPrimaryAudioMouseX = (state) => (
  state.getIn(['primaryAudio', 'audioUI', 'mouseX'])
)

/**
 * Get the primaryAudio from the editor state slice.
 * @param {object} state The state slice on which to operate.
 * @return {object} The full primaryAudio object value from the editor.
 */
const getPrimaryImage = (state) => (
  state.get('primaryImage')
)

/**
 * Get the primaryImage.filename from the primaryImage state slice.
 * @param {object} state The state slice on which to operate.
 * @return {string} The current value for primaryImage.filename from the editor.
 */
const getPrimaryImageFilename = (state) => (
  state.getIn(['primaryImage', 'filename'])
)

/**
 * Get the primaryImage.url from the primaryImage state slice.
 * @param {object} state The state slice on which to operate.
 * @return {string} The current value for primaryImage.url from the editor.
 */
const getPrimaryImageUrl = (state) => (
  state.getIn(['primaryImage', 'url'])
)

const getMetadataCaption = (state) => (
  state.get('story').getIn(['primaryImage', 'caption'])
)

const getMetadataCredit = (state) => (
  state.get('story').getIn(['primaryImage', 'credit'])
)

const getMetadataAgency = (state) => (
  state.get('story').getIn(['primaryImage', 'agency'])
)

/**
 * A helper for the getValidationErrors selector.
 * Evaluates whether the headline for the current story is missing.
 * @param {object} state The state slice on which to operate.
 * @return {boolean} A flag indicating whether or not a story headline is missing/empty.
 */
const isHeadlineMissing = (state) => (
  isEmptyString(state.get('headline'))
)

/**
 * A helper for the getValidationErrors selector.
 * Evaluates whether the body for the current story is missing.
 * @param {object} state The state slice on which to operate.
 * @return {boolean} A flag indicating whether or not a story body is missing/empty.
 */
const isBodyMissing = (state) => (
  getBodyDocument(state).length === 0
)

/**
 * A validation helper which validates the current story & returns latest validation errors.
 * @param {object} state The state slice on which to operate.
 * @return {object} An object containing the latest errors for a story.
 *                  Errors are organized into arrays of errors per field.
 *                  Each property in this object is a story field-name, e.g. {headline:, body:}.
 *                  This object will only contain properties for erroneous field-names.
 *                  The value of each field-name property will be an associated array of errors.
 *                  Error arrays will be populated with error type strings, e.g. 'MISSING_CONTENT'.
 */
const getValidationErrors = (state) => {
  // This object determines the validation checks we will perform.
  // For each validation check, a test (isValid) and the name/type (errorType) is defined.
  const validationChecks = {
    headline: [
      {
        isValid: !isHeadlineMissing(state),
        errorType: constants.ERROR_TYPES.MISSING,
      },
    ],
    body: [
      {
        isValid: !isBodyMissing(state),
        errorType: constants.ERROR_TYPES.MISSING,
      },
    ],
  }

  const errorsFound = {}

  // Iterate through the validation checks and check to see if each test passed.
  Object.keys(validationChecks).forEach((fieldToValidate) => {
    validationChecks[fieldToValidate].forEach((test) => {
      if (!test.isValid) {
        errorsFound[fieldToValidate] = errorsFound[fieldToValidate] || []
        if (errorsFound[fieldToValidate].indexOf(test.errorType) < 0) {
          errorsFound[fieldToValidate].push(test.errorType)
        }
      }
    })
  })

  return errorsFound
}

/**
 * Selector which uses a validation helper to evaluate the latest list of validation errors for the
 * current story, in order to determine whether or not the body field value is erroneous.
 * @param {object} state The state slice on which to operate.
 * @return {boolean} A flag to indicate whether or not a story's body field value is erroneous.
 */
const hasBodyError = (state) => (
  hasFieldLevelError('body', getValidationErrorList(state))
)

/**
 * Selector which uses a validation helper to evaluate the latest list of validation errors for the
 * current story, in order to determine whether or not the headline field value is erroneous.
 * @param {object} state The state slice on which to operate.
 * @return {boolean} A flag to indicate whether or not a story's headline field value is erroneous.
 */
const hasHeadlineError = (state) => (
  hasFieldLevelError('headline', getValidationErrorList(state))
)

/**
 * Get the list of validation errors from the current story state.
 * @param {object} state The state slice on which to operate.
 * @return {Immutable.Map} An Immutable.Map of errors (Immutable.List) per story field.
 */
const getValidationErrorList = (state) => (
  state.getIn(['validationErrors', 'errors'])
)

/**
 * Get the validation error text from the current story state.
 * @param {object} state The state slice on which to operate.
 * @return {string} A validation error message string.
 */
const getValidationErrorText = (state) => state.getIn(['validationErrors', 'errorText'])

export default {
  reducer,
  getSerialized,
  getHeadline,
  getByline,
  getBody,
  getPrimaryAudio,
  getPrimaryAudioFilename,
  getPrimaryAudioUrl,
  getPrimaryAudioDuration,
  getPrimaryAudioCurrentTime,
  getPrimaryAudioScrubberProgress,
  getPrimaryAudioScrubberWidth,
  getPrimaryAudioAudioElement,
  getPrimaryAudioPlayingStatus,
  getPrimaryImage,
  getPrimaryImageFilename,
  getPrimaryImageUrl,
  getMetadataCaption,
  getMetadataCredit,
  getMetadataAgency,
  getPrimaryAudioTimestampStatus,
  getPrimaryAudioMouseX,
  getValidationErrors,
  getBodyDocument,
  hasBodyError,
  hasHeadlineError,
  getValidationErrorText,
  getValidationErrorList,
}
