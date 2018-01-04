import { Raw, Plain } from 'slate'
import { List, Map } from 'immutable'

import createReducer, {
  getAppWrapperHeading,
  getSerializedStory,
  getHeadline,
  getByline,
  getBody,
  getPrimaryAudio,
  getPrimaryImage,
  getStoryValidationErrorList,
  getStoryValidationErrorText,
  hasStoryBodyError,
  hasStoryHeadlineError,
  getModalClassNames,
} from './reducers'
import { APP_WRAPPER_CHANGE_HEADING } from './constants'
import storyConstants from './story/constants'
import storyActions from './story/actions'

import modalConstants from './modal/constants'

const rootReducer = createReducer()

const initialState = rootReducer(undefined, {})
const errors = new Map({
  headline: new List([storyConstants.ERROR_TYPES.MISSING]),
  body: new List([storyConstants.ERROR_TYPES.MISSING]),
})
const errorText = storyConstants.ERROR_MESSAGES.REQUIRED_FIELDS
const validationFailure = rootReducer(
  initialState, storyActions.storyValidationFailed(errors, errorText)
)
const validationSuccess = rootReducer(initialState, storyActions.storyValidationSucceeded())

describe('appWrapper reducers and selectors', () => {
  it('should return the correct default appWrapper heading', () => {
    expect(getAppWrapperHeading(initialState)).toEqual('Welcome to the app')
  })

  it('should handle APP_WRAPPER_CHANGE_HEADING', () => {
    const newHeading = 'new app wrapper heading'
    const nextState = rootReducer(
      initialState, {
        type: APP_WRAPPER_CHANGE_HEADING,
        payload: newHeading,
      })

    expect(getAppWrapperHeading(nextState)).toEqual(newHeading)
  })

  it('should handle STORY_RESET', () => {
    const nextState = rootReducer(initialState, {
      type: storyConstants.STORY_RESET,
    })

    expect(getAppWrapperHeading(nextState)).toEqual('Welcome to the app')
  })
})

describe('modal reducers and selectors', () => {
  it('should return expected initial state', () => {
    expect(getModalClassNames(initialState)).toEqual(['', 'modal-dialog'])
  })

  it('should handle MODAL_OPEN', () => {
    const nextState = rootReducer(
        initialState, {
          type: modalConstants.MODAL_OPEN,
          payload: {
            componentKey: 'PrimaryImage',
            classNames: ['test-class'],
          },
        }
    )
    expect(JSON.stringify(getModalClassNames(nextState))).toEqual(JSON.stringify(['', 'test-class']))
  })
})

describe('story reducers and selectors', () => {
  it('should return the initial state', () => {
    expect(getSerializedStory(initialState)).toEqual({
      headline: '',
      byline: new List([]),
      body: Raw.serialize(getBody(initialState), { terse: true }),
      primaryAudio: getPrimaryAudio(initialState),
      primaryImage: getPrimaryImage(initialState),
    })
  })

  it('should handle STORY_RESET', () => {
    const nextState = rootReducer(
      initialState, {
        type: storyConstants.STORY_RESET,
      }
    )

    expect(getSerializedStory(nextState)).toEqual({
      headline: '',
      byline: new List([]),
      body: Raw.serialize(getBody(initialState), { terse: true }),
      primaryAudio: getPrimaryAudio(initialState),
      primaryImage: getPrimaryImage(initialState),
    })
  })

  it('should handle STORY_BODY_CHANGED', () => {
    const newBody = 'new body text'
    const nextState = rootReducer(
      initialState, {
        type: storyConstants.STORY_BODY_CHANGED,
        payload: Plain.deserialize(newBody),
      }
    )

    expect(Plain.serialize(getBody(nextState))).toEqual(newBody)
  })

  it('should handle STORY_HEADLINE_CHANGED', () => {
    const newHeadline = 'new headline text'
    const nextState = rootReducer(
      initialState, {
        type: storyConstants.STORY_HEADLINE_CHANGED,
        payload: newHeadline,
      }
    )

    expect(getHeadline(nextState)).toEqual(newHeadline)
  })

  it('should handle STORY_BYLINE_CHANGED', () => {
    const newByline = new List([{ id: 1, value: 'Jon Stewart' }])
    const nextState = rootReducer(
      initialState, {
        type: storyConstants.STORY_BYLINE_CHANGED,
        payload: newByline,
      }
    )

    expect(getByline(nextState)).toEqual(newByline)
  })

  it('should handle STORY_LOAD_SUCCEEDED', () => {
    const loadedHeadline = 'loaded headline text'
    const loadedByline = new List([{ id: 1, value: 'Jon Stewart' }])
    const loadedBody = Raw.serialize(Plain.deserialize('loaded body text'), { terse: true })
    const loadedPrimaryAudio = undefined
    const loadedPrimaryImage = undefined

    const nextState = rootReducer(
      initialState, {
        type: storyConstants.STORY_LOAD_SUCCEEDED,
        payload: {
          headline: loadedHeadline,
          byline: loadedByline,
          body: loadedBody,
          primaryAudio: loadedPrimaryAudio,
          primaryImage: loadedPrimaryImage,
        },
      }
    )

    expect(getSerializedStory(nextState)).toEqual({
      headline: loadedHeadline,
      byline: loadedByline,
      body: loadedBody,
      primaryAudio: loadedPrimaryAudio,
      primaryImage: loadedPrimaryImage,
    })
  })

  describe('should handle STORY_VALIDATION_FAILED and related validation selectors', () => {
    it('should getStoryValidationErrorList', () => {
      expect(getStoryValidationErrorList(validationFailure)).toEqual(errors)
    })
    it('should getStoryValidationErrorText', () => {
      expect(getStoryValidationErrorText(validationFailure)).toEqual(errorText)
    })
    it('should return hasStoryBodyError = true', () => {
      expect(hasStoryBodyError(validationFailure)).toEqual(true)
    })
    it('should return hasStoryHeadlineError = true', () => {
      expect(hasStoryHeadlineError(validationFailure)).toEqual(true)
    })
  })

  describe('should handle STORY_VALIDATION_SUCCEEDED and related validation selectors', () => {
    it('should getStoryValidationErrorList (empty)', () => {
      expect(getStoryValidationErrorList(validationSuccess)).toEqual(new Map({}))
    })
    it('should getStoryValidationErrorText(empty string)', () => {
      expect(getStoryValidationErrorText(validationSuccess)).toEqual('')
    })
    it('should return hasStoryBodyError = false', () => {
      expect(hasStoryBodyError(validationSuccess)).toEqual(false)
    })
    it('should return hasStoryHeadlineError = false', () => {
      expect(hasStoryHeadlineError(validationSuccess)).toEqual(false)
    })
  })
})

