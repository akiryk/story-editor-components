/**
 * The Scrubber Component.
 * This is the horizontal bar representing duration of a media file
 * Users can click on it do change location of the playhead.
 */

import React from 'react'
import { connect } from 'react-redux'
import actions from '../../state/story/actions'
import {
  getPrimaryAudioPlayingStatus,
  getPrimaryAudioAudioElement,
  getPrimaryAudioDuration,
  getPrimaryAudioScrubberWidth,
} from '../../state/reducers'
import ProgressBar from './ProgressBar'
import styles from './styles.css'

class Scrubber extends React.Component {

  componentDidMount = () => {
    this.props.setScrubberWidth(this.scrubberEl.offsetWidth)
  }

  /**
   * Function quick desc.
   * 
   * Move the audio file's playhead to the new currentTime then tell the redux
   * store the new time. Lastly update position of scrubber and playhead
   *
   * @param {Event} e The event object
   */
  onClickHandler = (e) => {
    let marginLeft = e.clientX - this.scrubberEl.getBoundingClientRect().left
    const scrubberWidth = this.props.scrubberWidth
    if (marginLeft < 0) {
      marginLeft = 0
    } else if (marginLeft > scrubberWidth) {
      marginLeft = scrubberWidth
    }
    const percent = marginLeft / scrubberWidth
    const newTime = this.props.duration * percent
    this.props.audioElement.currentTime = newTime
    this.props.onCurrentTimeChange(newTime)
    if (!this.props.isPlaying) {
      this.props.updatePlayer()
    }
  }

  getScrubberEl = (el) => (this.scrubberEl = el)

  render = () => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.scrubber}
      ref={this.getScrubberEl}
      onClick={this.onClickHandler}
    >
      <ProgressBar />
    </div>
  )
}

const mapStateToProps = (state) => ({
  isPlaying: getPrimaryAudioPlayingStatus(state),
  audioElement: getPrimaryAudioAudioElement(state),
  duration: getPrimaryAudioDuration(state),
  scrubberWidth: getPrimaryAudioScrubberWidth(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  setScrubberWidth: (scrubberWidth) => dispatch(actions.storyPrimaryAudioScrubberWidthChanged(scrubberWidth)),
  onCurrentTimeChange: (newTime) => dispatch(actions.setCurrentTime(newTime)),
})

export default Scrubber = connect(mapStateToProps, mapDispatchToProps)(Scrubber)
