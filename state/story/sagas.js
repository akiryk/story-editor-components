import { takeEvery, takeLatest } from 'redux-saga'
import { call, fork, select, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import { getStoryByID, saveStory } from '../../api/story'
import constants from './constants'
import {
  getSerializedStory,
  getStoryValidationErrors,
  getStoryValidationErrorList,
} from '../reducers'
import { isRequiredFieldsError } from '../../utils/validation'
import {
  APP_WRAPPER_CHANGE_HEADING,
  APP_WRAPPER_DEFAULT_HEADING,
} from '../constants'
import actions from './actions'

/**
 * When ready save.
 *
 * @return {Generator}
 */
export function* watchStorySaveRequested () {
  yield call(
    takeEvery,
    constants.STORY_SAVE_REQUESTED,
    saveRequested
  )
}

/**
 * Saga responsible for invoking re-validation of erroneous stories when any of their validated
 * fields change.
 */
export function* watchChangesToValidatedStoryFields () {
  yield call(
    takeLatest,
    [
      constants.STORY_BODY_CHANGED,
      constants.STORY_HEADLINE_CHANGED,
    ],
    reValidateErroneousStory
  )
}

/**
 * Saga to load a story.
 *
 * @return {Generator} A story object within the promise.
 */
export function* watchLoadStory () {
  yield call(
    takeLatest,
    constants.STORY_LOAD_REQUESTED,
    loadRequested
  )
}

/**
 * The Generator method to setup the save on click.
 *
 * @return {Generator/Iterator} Get the story to save.
 */
export function* saveRequested (action) {
  const isStoryValid = yield call(validateStory)

  if (isStoryValid) {
    const storyId = action.payload
    const story = yield select(getSerializedStory)
    const id = yield call(
      saveStory,
      story,
      storyId
    )
    yield call(
      browserHistory.push,
      `/editor/${id}`
    )
  }
}

/**
 * When a change is made to a validated field for a story that previously failed validation
 * (one that has validation errors), re-validate it to update/clear errors.
 */
export function* reValidateErroneousStory () {
  const errors = yield select(getStoryValidationErrorList)
  if (errors.count()) {
    yield call(validateStory)
  }
}

/**
 * Validate a story by calling the getStoryValidationErrors selector and retrieving the latest
 * validation errors (if any) based on the latest state.  Update story state with new validation
 * errors and error message text.
 *
 * @return {boolean} A flag to indicate whether the story validation failed or succeeded.
 */
export function* validateStory () {
  const storyErrors = yield select(getStoryValidationErrors)
  const hasValidationErrors = Object.keys(storyErrors).length > 0

  if (hasValidationErrors) {
    const errorText = isRequiredFieldsError(storyErrors, constants.REQUIRED_FIELDS)
      ? constants.ERROR_MESSAGES.REQUIRED_FIELDS
      : constants.ERROR_MESSAGES.INVALID_FIELDS

    yield put(actions.storyValidationFailed(storyErrors, errorText))
    return false
  }

  yield put(actions.storyValidationSucceeded())
  return true
}

/**
 * A story load event is requested.
 * @param {string} action Fetch and load a story from the API.
 *
 * @return {Generator} Return an object.
 */
export function* loadRequested (action) {
  let story = null

  try {
    story = yield call(
      getStoryByID,
      action.payload
    )
  } catch (error) {
    // eslint-disable-next-line
    console.dir('Failed to fetch story: ', error)
    yield call(
      browserHistory.push,
      '/editor'
    )
    return
  }

  yield put({
    type: constants.STORY_LOAD_SUCCEEDED,
    payload: story,
  })

  const pageHeading = story.headline ? `Editing: ${story.headline}` : APP_WRAPPER_DEFAULT_HEADING

  // Change the page title.
  yield put({
    type: APP_WRAPPER_CHANGE_HEADING,
    payload: pageHeading,
  })
}

/**
 * Default Export.
 * A root Saga that runs each parent Saga asynchronously.
 */
export default function* storySagas () {
  yield [
    fork(watchStorySaveRequested),
    fork(watchLoadStory),
    fork(watchChangesToValidatedStoryFields),
  ]
}
