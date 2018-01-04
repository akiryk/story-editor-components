import storyActions from './actions'
import storyConstants from './constants'

describe('story actions', () => {
  it('should create an action to change headline', () => {
    const headline = 'story headline'
    const expectedAction = {
      type: storyConstants.STORY_HEADLINE_CHANGED,
      payload: headline,
    }

    expect(storyActions.storyHeadlineChanged(headline)).toEqual(expectedAction)
  })

  it('should create an action to change body', () => {
    const body = 'story body'
    const expectedAction = {
      type: storyConstants.STORY_BODY_CHANGED,
      payload: body,
    }

    expect(storyActions.storyBodyChanged(body)).toEqual(expectedAction)
  })

  it('should create an action to change byline', () => {
    const byline = 'story byline'
    const expectedAction = {
      type: storyConstants.STORY_BYLINE_CHANGED,
      payload: byline,
    }
    expect(storyActions.storyBylineChanged(byline)).toEqual(expectedAction)
  })

  it('should create an action to request a save', () => {
    const storyId = '12345'
    const expectedAction = {
      type: storyConstants.STORY_SAVE_REQUESTED,
      payload: storyId,
    }

    expect(storyActions.storySaveRequested(storyId)).toEqual(expectedAction)
  })

  it('should create an action to request a load', () => {
    const storyId = '12345'
    const expectedAction = {
      type: storyConstants.STORY_LOAD_REQUESTED,
      payload: storyId,
    }

    expect(storyActions.storyLoadRequested(storyId)).toEqual(expectedAction)
  })

  it('should create an action to reset a story', () => {
    const expectedAction = {
      type: storyConstants.STORY_RESET,
    }

    expect(storyActions.storyReset()).toEqual(expectedAction)
  })
})
