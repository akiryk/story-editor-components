import { APP_WRAPPER_CHANGE_HEADING } from 'state/constants'
import constants from './constants'

/**
 * Action creator that dispatches a heading change for the StoryList container.
 * @return {obect} A change heading event and the title payload.
 */
export const setListPageHeading = () => ({
  type: APP_WRAPPER_CHANGE_HEADING,
  payload: 'Story List',
})

export const toggleCheckboxFilters = (filter) => ({
  type: constants.TOGGLE_CHECKBOX_FILTER,
  payload: filter,
})

export const toggleRadioButtonFilters = (props) => ({
  type: constants.TOGGLE_RADIOBUTTON_FILTER,
  payload: {
    filter: props.filter,
    siblings: props.siblings,
  },
})

/**
 * Method to create a story list requested action
 * @return {obect} A story list requested action.
 */
export default function storyListRequested () {
  return {
    type: constants.STORY_LIST_REQUESTED,
  }
}
