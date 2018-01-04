/**
 * StoryPage container/page.
 */
import React from 'react'
import { State } from 'slate'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Body from './Body'
import Byline from './Byline'
import Headline from './Headline'
import PrimaryAudio from './PrimaryAudio'
import PrimaryImage from './PrimaryImage'
import Modal from '../Modal'

import actions from '../../state/story/actions'

import {
  getBody,
  getHeadline,
  getByline,
  hasStoryBodyError,
  hasStoryHeadlineError,
  getStoryValidationErrorText,
} from '../../state/reducers'

// eslint-disable-next-line react/prefer-stateless-function
class StoryPage extends React.PureComponent {
  static propTypes = {
    body: React.PropTypes.instanceOf(State).isRequired,
    headline: React.PropTypes.string.isRequired,
    byline: React.PropTypes.object.isRequired,
    onBodyChange: React.PropTypes.func.isRequired,
    onHeadlineChange: React.PropTypes.func.isRequired,
    onBylineChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    errorText: React.PropTypes.string.isRequired,
    hasBodyError: React.PropTypes.bool.isRequired,
    hasHeadlineError: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    body: {},
    headline: '',
    byline: {},
    onBodyChange: () => {},
    onHeadlineChange: () => {},
    onBylineChange: () => {},
    onSave: () => {},
    errorText: '',
    hasBodyError: false,
    hasHeadlineError: false,
  }

  render = () => (
    <div className="row">
      <div className="col-12 col-md-8">
        <Headline
          value={this.props.headline}
          onChangeHandler={this.props.onHeadlineChange}
          hasError={this.props.hasHeadlineError}
        />
        <Body
          value={this.props.body}
          onChangeHandler={this.props.onBodyChange}
          hasError={this.props.hasBodyError}
        />
      </div>
      <div className="col col-md-4">
        <div className="card mb-4">
          <div className="card-block d-flex justify-content-between">
            <div>
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={this.props.onSave}
              >Save
              </button>
              <div className="has-danger">
                <small className="form-control-feedback">
                  {this.props.errorText}
                </small>
              </div>
            </div>
          </div>
        </div>
        <PrimaryAudio />
        <PrimaryImage />
        <div className="card mb-4">
          <div className="card-block">
            <Byline value={this.props.byline} onChange={this.props.onBylineChange} />
          </div>
        </div>
      </div>
      <Modal />
    </div>
  )
}

const mapStateToProps = (state) => ({
  body: getBody(state),
  byline: getByline(state),
  headline: getHeadline(state),
  errorText: getStoryValidationErrorText(state),
  hasBodyError: hasStoryBodyError(state),
  hasHeadlineError: hasStoryHeadlineError(state),
})

const mapDispatchToProps = (dispatch, router) => ({
  onBodyChange: (body) => dispatch(actions.storyBodyChanged(body)),
  onBylineChange: (tags) => (dispatch(actions.storyBylineChanged(tags))),
  onHeadlineChange: (event) => (dispatch(actions.storyHeadlineChanged(event.target.value))),
  onSave: () => dispatch(actions.storySaveRequested(router.params.id)),
})

// Refer to the readme section "Using the @connect decorator"
// https://github.com/npr/station-content-editor/wiki/react-redux#container-aka-connect-method
// http://stackoverflow.com/questions/32646920/whats-the-at-symbol-in-the-redux-connect-decorator
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StoryPage)
)
