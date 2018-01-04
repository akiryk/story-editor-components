import { List, Map } from 'immutable'

import constants from './constants'

const initialState = new Map({
  stories: new List(),
  filters: new Map({
    audio: false,
    image: false,
    byline: false,
    nobyline: false,
    body: false,
    published: false,
    unpublished: false,
  }),
})

/**
 * Storylist Reducer.
 * @param {object} [state=initialState] The intial state structure.
 * @param {object} action The action.
 * @return {object}
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.STORY_LIST_SUCCEEDED:
      return state.mergeIn(['stories'], action.payload)

    case constants.TOGGLE_CHECKBOX_FILTER:
      return state.setIn(
        ['filters', action.payload],
        !state.getIn(['filters', action.payload])
      )

    case constants.TOGGLE_RADIOBUTTON_FILTER:
      let filters = state.get('filters')
      filters = filters.set(action.payload.filter, !filters.get(action.payload.filter))
      action.payload.siblings.forEach((filter) => {
        filters = filters.set(filter, false)
      })
      return state.mergeIn(['filters'], filters)

    default:
      return state
  }
}

/**
 * Determine if a particular filter is currently selected
 * so that UI can highlight the active filters
 * @param {object} state, frozen by immutable.js
 * @param {string} filter
 * @return {boolean}
 */
const getFilterStatus = (state, filter) => (
  state.getIn(['storyList', 'filters', filter])
)

/**
 * @param {object} props
 * @return {string} name of the filter
 */
const getFilterName = (props) => (
  props.filter
)

/**
 * Filter out stories from state
 * TODO: Update this set of filters with ones we actually want to use.
 * E.g. do we care about filtering by 'body' or 'nobyline'?
 * @param {array} nextState, a list of story objects
 * @param {string} filterName
 * @return {array} of story objects
 */
const applyFilter = (state, filterName) => {
  switch (filterName) {
    case 'audio' :
      return state.filter((story) => story.primaryAudio.url)

    case 'image':
      return state.filter((story) => story.primaryImage.url)

    case 'byline':
      return state.filter((story) => story.byline.length)

    case 'body':
      return state.filter((story) => story.body.nodes.length > 3)

    case 'published':
      return state.filter(
        (story) => {
          const storyapi = story.publishState.storyapi || story.publishState['story api']
          return storyapi.status === 'published'
        }
      )

    case 'unpublished':
      return state.filter(
        (story) => {
          const storyapi = story.publishState.storyapi || story.publishState['story api']
          return storyapi.status === 'unpublished'
        }
      )

    case 'nobyline':
      return state.filter((story) => !story.byline.length)

    default:
      return state
  }
}
/**
 * Update the state of visible stories based on the enabled filters.
 * Start by looping through the list of filters (e.g. 'published',
 * 'audio', 'image') and checking whether each is true. If so,
 * apply that filter. Finally, return the updated version of state.
 * @param {array} stories
 * @param {object} filters
 * @return {array} list of stories
 */
const getFilteredStories = (stories, filters) => {
  let nextState = [...stories]
  Object.keys(filters).forEach((filter) => {
    if (filters[filter]) {
      nextState = applyFilter(nextState, filter)
    }
  })
  return nextState
}
/**
 * @param {object} state
 * @return {array} visible stories
 */
const getStories = (state) => {
  const filters = state.getIn(['storyList', 'filters'])
  const stories = state.getIn(['storyList', 'stories'])
  const filteredStories = getFilteredStories(stories.toJS(), filters.toJS())
  return filteredStories
}

export default {
  reducer,
  getStories,
  getFilterStatus,
  getFilterName,
}
