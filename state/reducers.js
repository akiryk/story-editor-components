/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import story from './story/reducers'
import storyList from './list/reducers'
import audioUI from './audio/reducers'
import modal from './modal/reducers'
import assetStaging from './assetStaging/reducers'
import wizard from './wizard/reducer'
import CropperDucks from './cropper/reducer'

import { APP_WRAPPER_CHANGE_HEADING } from './constants'
import storyConstants from './story/constants'

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
})

const appWrapperInitialState = {
  pageTitle: 'Welcome to the app',
}

/**
 * Merge route into the global application state
 */
function routeReducer (state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      })

    default:
      return state
  }
}

/**
 * Reducer for the appWrapper container.
 * @param {object} [state=appWrapperInitialState] The state (inital or other).
 * @param {object} action The action.
 * @return {object} The new app wrapper state.
 */
const appWrapperReducer = (state = appWrapperInitialState, action) => {
  switch (action.type) {
    case APP_WRAPPER_CHANGE_HEADING:
      return {
        pageTitle: action.payload,
      }

    case storyConstants.STORY_RESET:
      return appWrapperInitialState

    default:
      return state
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer (asyncReducers) {
  return combineReducers({
    appWrapper: appWrapperReducer,
    route: routeReducer,
    story: story.reducer,
    storyList: storyList.reducer,
    audioUI: audioUI.audioUIReducer,
    modal: modal.reducer,
    assetStaging: assetStaging.reducer,
    wizardController: wizard.reducer,
    cropper: CropperDucks.reducer,
    ...asyncReducers,
  })
}

/**
 * Selector to get the appWrapper heading text.
 * @param {object} state The state.
 * @return {string} The new heading.
 */
export const getAppWrapperHeading = (state) => (
  state.get('appWrapper').pageTitle
)

export const getSerializedStory = (state) => (
  story.getSerialized(state.get('story'))
)

export const getHeadline = (state) => (
  story.getHeadline(state.get('story'))
)

export const getByline = (state) => (
  story.getByline(state.get('story'))
)

export const getBody = (state) => (
  story.getBody(state.get('story'))
)

export const getPrimaryAudio = (state) => (
  story.getPrimaryAudio(state.get('story'))
)

export const getPrimaryAudioFilename = (state) => (
  story.getPrimaryAudioFilename(state.get('story'))
)

export const getPrimaryAudioUrl = (state) => (
  story.getPrimaryAudioUrl(state.get('story'))
)

export const getPrimaryAudioDuration = (state) => (
  story.getPrimaryAudioDuration(state.get('story'))
)

export const getPrimaryAudioTimestampStatus = (state) => (
  story.getPrimaryAudioTimestampStatus(state.get('story'))
)

export const getPrimaryAudioMouseX = (state) => (
  story.getPrimaryAudioMouseX(state.get('story'))
)

export const getPrimaryAudioCurrentTime = (state) => (
  story.getPrimaryAudioCurrentTime(state.get('story'))
)

export const getPrimaryAudioScrubberWidth = (state) => (
  story.getPrimaryAudioScrubberWidth(state.get('story'))
)

export const getPrimaryAudioScrubberProgress = (state) => (
  story.getPrimaryAudioScrubberProgress(state.get('story'))
)

export const getPrimaryAudioAudioElement = (state) => (
  story.getPrimaryAudioAudioElement(state.get('story'))
)

export const getPrimaryAudioPlayingStatus = (state) => (
  story.getPrimaryAudioPlayingStatus(state.get('story'))
)

export const getPrimaryImage = (state) => (
  story.getPrimaryImage(state.get('story'))
)

export const getPrimaryImageFilename = (state) => (
  story.getPrimaryImageFilename(state.get('story'))
)

export const getPrimaryImageUrl = (state) => (
  story.getPrimaryImageUrl(state.get('story'))
)

export const getStories = (state) => (
  storyList.getStories(state)
)

export const getFilterStatus = (state, props) => (
  storyList.getFilterStatus(state, props.filter)
)

export const getFilterName = (props) => (
  storyList.getFilterName(props)
)

export const getPublishedStatus = (props) => (
  storyList.getPublishedStatus(props)
)

export const hasStoryBodyError = (state) => (
  story.hasBodyError(state.get('story'))
)

export const hasStoryHeadlineError = (state) => (
  story.hasHeadlineError(state.get('story'))
)

export const getStoryValidationErrors = (state) => (
  story.getValidationErrors(state.get('story'))
)

export const getStoryValidationErrorList = (state) => (
  story.getValidationErrorList(state.get('story'))
)

export const getStoryValidationErrorText = (state) => (
  story.getValidationErrorText(state.get('story'))
)

export const isModalOpen = (state) => (
  modal.isOpen(state.get('modal'))
)

export const isModalOverlayVisible = (state) => (
  modal.isOverlayVisible(state.get('modal'))
)

export const getModalComponentKey = (state) => (
  modal.getComponentKey(state.get('modal'))
)

export const getModalOptions = (state) => (
  modal.getOptions(state.get('modal'))
)

export const getModalClassNames = (state) => {
  console.log('lllslsl', modal.getClassNames(state))
  return modal.getClassNames(state)
}

export const getAssetStagingType = (state) => (
  assetStaging.getAssetType(state.get('assetStaging'))
)

export const getAssetStagingFilename = (state) => (
  assetStaging.getFilename(state.get('assetStaging'))
)

export const getAssetStagingFilenameOnServer = (state) => (
  assetStaging.getFilenameOnServer(state.get('assetStaging'))
)

export const getAssetStagingStatus = (state) => (
  assetStaging.getStatus(state.get('assetStaging'))
)

export const getAssetStagingUrl = (state) => (
  assetStaging.getUrl(state.get('assetStaging'))
)

export const getAssetStagingMetadata = (state) => (
  assetStaging.getMetadata(state.get('assetStaging'))
)

export const getAssetStagingProgress = (state) => (
  assetStaging.getProgress(state.get('assetStaging'))
)

export const getAssetStagingError = (state) => (
  assetStaging.getError(state.get('assetStaging'))
)
