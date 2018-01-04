/**
 * Audio Single Player Component.
 * A component that customizes an HTML5 audio player
 */
import React from 'react'
import { connect } from 'react-redux'
import actions from '../../state/story/actions'
import {
  getPrimaryAudioDuration,
  getPrimaryAudioScrubberWidth,
  primaryAudioTogglePlay,
  primaryAudioToggleTimestamp,
} from '../../state/reducers'

import PlayPauseButton from './PlayPauseButton'
import { Timestamp } from './TimeStamp'
import Scrubber from './Scrubber'
import { Playhead } from './Playhead'
import { defaults } from './constants'
import { formatDuration } from './Utilities'
import styles from './styles.css'

class AudioSinglePlayer extends React.Component {
  componentDidMount = () => {
    this.audioElement = document.createElement('audio')
    this.props.setAudioElement(this.audioElement)
    this.loadSrc()

    this.setControlsLeft()

    this.audioElement.setAttribute('id', 'ce-audio')

    this.audioElement.addEventListener('loadedmetadata', () => {
      this.props.onDurationChange(this.audioElement.duration)
    })

    this.audioElement.addEventListener('play', () => {
      this.timer = setInterval(this.updateScrubberUI, defaults.TICKER_INCREMENT)
    })

    this.audioElement.addEventListener('pause', () => {
      clearInterval(this.timer)
    })

    this.audioElement.addEventListener('ended', () => {
      clearInterval(this.timer)
      this.props.onProgressChange(defaults.INITIAL_PROGRESS)
      this.props.togglePlayPause(false)
      this.audioElement.currentTime = defaults.INITIAL_PROGRESS
    })
  }

  /**
   * Track mouse movement in order to display the timestamp below scrubber
   */
  onMouseMove = (e) => {
    this.props.toggleTimestamp(true)
    this.props.setMouseX(e.clientX - this.controlsXPos)
  }

  /**
   * Track mouse leave in order to stop displaying the timestamp
   * when user is no longer hovering over the scrubber controls
   */
  onMouseLeave = () => {
    this.props.toggleTimestamp(false)
  }

  /**
   * Track location of the div for scrubber, playhead, and timestamp
   */
  setControlsLeft = () => {
    this.controlsXPos = this.controlsEl.getBoundingClientRect().left
  }

  /**
   * When audio is playing, call this method every quarter second
   * to update the state. Otherwise, the scrubber or the play/pause button
   * component call this when there is a UI change. Using an interval
   * seems smoother than the HTMLMediaElement timeupdate event.
   */
  updateScrubberUI = () => {
    const amountPlayed = this.props.scrubberWidth * (this.audioElement.currentTime / this.props.duration)
    this.props.onProgressChange(amountPlayed)
  }

  /**
   * Load source for audio.
   * This is called at the the end of componentDidMount
   */
  loadSrc = () => {
    this.audioElement.src = this.props.src
    this.audioElement.load()
  }

  render = () => (
    <div className={`${styles['player-basic']}`}>
      <div
        className={`${styles.controls}`}
        aria-label="audio player controls"
      >
        <PlayPauseButton updatePlayer={this.updateScrubberUI} />
      </div>
      <div className={`${styles.track}`}>
        <div
          onMouseLeave={this.onMouseLeave}
          onMouseMove={this.onMouseMove}
          ref={(el) => {this.controlsEl = el }}
        >
          <Timestamp />
          <Scrubber updatePlayer={this.updateScrubberUI} />
          <Playhead updatePlayer={this.updateScrubberUI} />
        </div>
      </div>
      <div
        className={styles.duration}
      >
        {formatDuration(this.props.duration)}
      </div>
    </div>
  )
}

AudioSinglePlayer.propTypes = {
  src: React.PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  duration: getPrimaryAudioDuration(state),
  scrubberWidth: getPrimaryAudioScrubberWidth(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  onDurationChange: (duration) => dispatch(actions.setDuration(duration)),
  onCurrentTimeChange: (newTime) => dispatch(actions.setCurrentTime(newTime)),
  onProgressChange: (newProgress) => dispatch(actions.updateScrubberProgress(newProgress)),
  setAudioElement: (audioElement) => dispatch(actions.setPrimaryAudioElement(audioElement)),
  togglePlayPause: (playing) => dispatch(actions.primaryAudioTogglePlay(playing)),
  toggleTimestamp: (show) => dispatch(actions.primaryAudioToggleTimestamp(show)),
  setMouseX: (xPos) => dispatch(actions.primaryAudioMouseXPosition(xPos)),
})

export default AudioSinglePlayer = connect(mapStateToProps, mapDispatchToProps)(AudioSinglePlayer);
