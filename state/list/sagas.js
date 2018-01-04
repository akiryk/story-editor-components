import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'

import actions from './constants'
import { getStories } from '../../api/story'

/**
 * Spawn a new task for every STORY_LIST_REQUESTED task.
 *
 * @return {Generator}
 */
export function* watchStoryListRequested () {
  yield takeLatest(actions.STORY_LIST_REQUESTED, loadStoriesListRequested)
}

/**
 * Stories were loaded successfully.
 * @return {Generator} [description]
 */
function* loadStoriesListRequested () {
  const stories = yield call(fetchStoriesList)
  yield put({
    type: actions.STORY_LIST_SUCCEEDED,
    payload: stories,
  })
}

/**
 * Get a list of documents from the API.
 * @return {array[object]}
 */
const fetchStoriesList = () => (
  getStories({ limit: 20 })
)

/**
 * Default Export.
 * A root Saga that runs each parent Saga asynchronously.
 */
export default function* storyListSagas () {
  yield [
    fork(watchStoryListRequested),
  ]
}
