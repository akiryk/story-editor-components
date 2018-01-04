import actionConstants from './constants'

/**
 * Dispatched when the story's slate state has changed.
 * @param {Slate} state A Slate state object representing current state
 * @return {object} A new story action object.
 */
const storyBodyChanged = (state) => ({
  type: actionConstants.STORY_BODY_CHANGED,
  payload: state,
})

/**
 * Dispatch a new headline value.
 * @param {string} newHeadline The new headline value to update.
 * @return {object} A new story action object.
 */
const storyHeadlineChanged = (newHeadline) => ({
  type: actionConstants.STORY_HEADLINE_CHANGED,
  payload: newHeadline,
})

/**
 * Dispatch the Story byline change.
 * @param {[type]} bylineValue The updated byline value.
 * @return {object} A new story action object.
 */
const storyBylineChanged = (bylineValue) => ({
  type: actionConstants.STORY_BYLINE_CHANGED,
  payload: bylineValue,
})

/**
 * Dispatch the editor primaryAudio change.
 * @param {object} primaryAudioValue The updated primaryAudio value (object).
 * @return {object} A new story action object.
 */
const storyPrimaryAudioChanged = (primaryAudioValue) => ({
  type: actionConstants.STORY_PRIMARY_AUDIO_CHANGED,
  payload: primaryAudioValue,
})

/**
 * Dispatch an action to trigger the removal of primaryImage from a story.
 * @return {object} A new story action object.
 */
const storyPrimaryAudioRemove = () => ({
  type: actionConstants.STORY_PRIMARY_AUDIO_REMOVED,
})

/**
 * Dispatch the editor PrimaryImage change.
 * @param  {object} primaryImageValue The updated primaryAudio value (object).
 * @return {object} A new story action object.
 */
const storyPrimaryImageChanged = (primaryImageValue) => ({
  type: actionConstants.STORY_PRIMARY_IMAGE_CHANGED,
  payload: primaryImageValue,
})

/**
 * Dispatch the editor PrimaryImage meta data change.
 * @param  {object} metadata The updated primaryAudio value.
 * @return {object} A new story action object.
 */
const storyPrimaryImageMetadataChanged = (metadata) => ({
  type: actionConstants.STORY_PRIMARY_IMAGE_METADATA_CHANGED,
  payload: metadata,
})

/**
 * Dispatch an action to trigger the removal of primaryImage from a story.
 * @return {object} A new story action object.
 */
const storyPrimaryImageRemove = () => ({
  type: actionConstants.STORY_PRIMARY_IMAGE_REMOVED,
})

/**
 * Dispatch an action to trigger the update of the primary image caption.
 * @param {string} newCaption A new primary image caption.
 * @return {object} A new story action object.
 */
const storyPrimaryImageMetadataCaptionChanged = (newCaption) => ({
  type: actionConstants.STORY_PRIMARY_IMAGE_METADATA_CAPTION_CHANGE,
  payload: newCaption,
})

/**
 * Dispatch an action to trigger the update of the primary image agency.
 * @param {string} newAgency A new primary image caption.
 * @return {object} A new story action object.
 */
const storyPrimaryImageMetadataAgencyChanged = (newAgency) => ({
  type: actionConstants.STORY_PRIMARY_IMAGE_METADATA_AGENCY_CHANGE,
  payload: newAgency,
})

/**
 * Dispatch an action to trigger the update of the primary image credit.
 * @param {string} newCredit A new primary image credit.
 * @return {object} A new story action object.
 */
const storyPrimaryImageMetadataCreditChanged = (newCredit) => ({
  type: actionConstants.STORY_PRIMARY_IMAGE_METADATA_CREDIT_CHANGE,
  payload: newCredit,
})

/**
 * Dispatch an action to trigger a full save.
 * @param storyId
 * @return {object} A new story action object.
 */
const storySaveRequested = (storyId) => ({
  type: actionConstants.STORY_SAVE_REQUESTED,
  payload: storyId,
})

/**
 * Dispatch a story validation success action so that existing errors are cleared from story state
 * and therefore also cleared within the UI (to inform the user), if required.
 * @return {object} A new story action object.
 */
const storyValidationSucceeded = () => ({
  type: actionConstants.STORY_VALIDATION_SUCCEEDED,
})

/**
 * Dispatch a story validation failure action so that new errors are added to the story state.
 * @param errors
 * @param errorText
 * @return {object} A new story action object.
 */
const storyValidationFailed = (errors, errorText) => ({
  type: actionConstants.STORY_VALIDATION_FAILED,
  payload: {
    errors,
    errorText,
  },
})

/**
 * Dispatch an action to trigger a story to load.
 * @param {string} [storyId=null] The story id to retrieve from the API.
 * @return {object} A new story action object.
 */
const storyLoadRequested = (storyId) => ({
  type: actionConstants.STORY_LOAD_REQUESTED,
  payload: storyId,
})

/**
 * Dispatch story loaded event.
 * @param {object} story The story state.
 * @return {object} The action to dispatch.
 */
const storyLoadSucceeded = (story) => ({
  type: actionConstants.STORY_LOAD_SUCCEEDED,
  payload: story,
})

/**
 * Update the URL retrieved after successfully staging an asset.
 * @param {string} filenameOnServer If the asset was uploaded, this is the new filename returned
 *                                  by the API.
 * @param {string} url The URL for an uploaded or external asset.
 * @returns {object} A new assetStaging action object.
 */
const assetStagingSucceeded = (filenameOnServer, url) => ({
  type: actionConstants.SUCCESSFUL,
  payload: { filenameOnServer, url },
})

/**
 * Dispatch story loaded event.
 * @return {object} The action to dispatch.
 */
const storyReset = () => ({
  type: actionConstants.STORY_RESET,
})

const setDuration = (duration) => ({
  type: actionConstants.PRIMARY_AUDIO_DURATION_RESET,
  payload: duration,
})

const setCurrentTime = (currentTime) => ({
  type: actionConstants.PRIMARY_AUDIO_CURRENT_TIME_CHANGED,
  payload: currentTime,
})

const updateScrubberProgress = (progress) => ({
  type: actionConstants.PRIMARY_AUDIO_SCRUBBER_PROGRESS_CHANGED,
  payload: progress,
})

const storyPrimaryAudioScrubberWidthChanged = (scrubberWidth) => ({
  type: actionConstants.PRIMARY_AUDIO_SCRUBBER_WIDTH_CHANGED,
  payload: scrubberWidth,
})

const setPrimaryAudioElement = (audioElement) => ({
  type: actionConstants.SET_PRIMARY_AUDIO_ELEMENT,
  payload: audioElement,
})

const primaryAudioTogglePlay = (bool) => ({
  type: actionConstants.PRIMARY_AUDIO_TOGGLE_PLAY,
  payload: bool,
})

const primaryAudioToggleTimestamp = (bool) => ({
  type: actionConstants.PRIMARY_AUDIO_TOGGLE_TIMESTAMP,
  payload: bool,
})

const primaryAudioMouseXPosition = (xPos) => ({
  type: actionConstants.PRIMARY_AUDIO_SET_X_POSITION,
  payload: xPos,
})

export default {
  storyBodyChanged,
  storySaveRequested,
  storyHeadlineChanged,
  storyBylineChanged,
  storyPrimaryAudioChanged,
  storyPrimaryAudioRemove,
  storyPrimaryAudioScrubberWidthChanged,
  storyPrimaryImageChanged,
  storyPrimaryImageRemove,
  storyPrimaryImageMetadataChanged,
  storyPrimaryImageMetadataCaptionChanged,
  storyPrimaryImageMetadataAgencyChanged,
  storyPrimaryImageMetadataCreditChanged,
  storyLoadRequested,
  storyLoadSucceeded,
  assetStagingSucceeded,
  storyReset,
  setDuration,
  setCurrentTime,
  updateScrubberProgress,
  setPrimaryAudioElement,
  primaryAudioTogglePlay,
  primaryAudioToggleTimestamp,
  primaryAudioMouseXPosition,
  storyValidationSucceeded,
  storyValidationFailed,
}
