import { takeEvery, takeLatest } from 'redux-saga'
import { call, select, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import {
  watchStorySaveRequested,
  watchLoadStory,
  watchChangesToValidatedStoryFields,
  reValidateErroneousStory,
  loadRequested,
  saveRequested,
  validateStory,
} from './sagas'
import { getSerializedStory } from '../reducers'
import { getStoryByID, saveStory } from '../../api/story'
import storyConstants from './constants'
import { APP_WRAPPER_CHANGE_HEADING } from '../constants'


describe('story sagas', () => {
  it('should watch for saves', () => {
    const generator = watchStorySaveRequested()
    const expectedCall = call(takeEvery, storyConstants.STORY_SAVE_REQUESTED, saveRequested)

    let next = generator.next()
    expect(next.value).toEqual(expectedCall)

    next = generator.next()
    expect(next.done).toEqual(true)
  })

  it('should watch for loads', () => {
    const generator = watchLoadStory()
    const expectedCall = call(takeLatest, storyConstants.STORY_LOAD_REQUESTED, loadRequested)

    let next = generator.next()
    expect(next.value).toEqual(expectedCall)

    next = generator.next()
    expect(next.done).toEqual(true)
  })

  it('should watchChangesToValidatedStoryFields', () => {
    const generator = watchChangesToValidatedStoryFields()
    const expectedCall = call(
      takeLatest,
      [
        storyConstants.STORY_BODY_CHANGED,
        storyConstants.STORY_HEADLINE_CHANGED,
      ],
      reValidateErroneousStory
    )

    let next = generator.next()
    expect(next.value).toEqual(expectedCall)

    next = generator.next()
    expect(next.done).toEqual(true)
  })

  it('should save a story', () => {
    const generator = saveRequested({ payload: 12345 })

    let next = generator.next()
    let expectedCall = call(validateStory)
    expect(next.value).toEqual(expectedCall)

    next = generator.next(expectedCall)
    expectedCall = select(getSerializedStory)
    expect(next.value).toEqual(expectedCall)

    const serializedStory = select(getSerializedStory)
    next = generator.next(serializedStory)
    expectedCall = call(saveStory, serializedStory, 12345)
    expect(next.value).toEqual(expectedCall)

    next = generator.next(12345)
    expectedCall = call(browserHistory.push, '/editor/12345')
    expect(next.value).toEqual(expectedCall)

    next = generator.next()
    expect(next.done).toEqual(true)
  })

  it('should load a story', () => {
    const generator = loadRequested({ payload: 67890 })

    let next = generator.next()
    let expectedCall = call(getStoryByID, 67890)
    expect(next.value).toEqual(expectedCall)

    next = generator.next({ headline: 'foobar' })
    expectedCall = put({
      type: storyConstants.STORY_LOAD_SUCCEEDED,
      payload: { headline: 'foobar' },
    })
    expect(next.value).toEqual(expectedCall)

    next = generator.next()
    expectedCall = put({
      type: APP_WRAPPER_CHANGE_HEADING,
      payload: 'Editing: foobar',
    })
    expect(next.value).toEqual(expectedCall)

    next = generator.next()
    expect(next.done).toEqual(true)
  })

  it('should redirect to /editor if a load fails', () => {
    const generator = loadRequested({ payload: 67890 })

    let next = generator.next()
    let expectedCall = call(getStoryByID, 67890)
    expect(next.value).toEqual(expectedCall)

    next = generator.throw(new Error('something went wrong'))
    expectedCall = call(browserHistory.push, '/editor')
    expect(next.value).toEqual(expectedCall)

    next = generator.next()
    expect(next.done).toEqual(true)
  })
})
