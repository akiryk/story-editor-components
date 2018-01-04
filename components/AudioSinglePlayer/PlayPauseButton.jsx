import React from 'react'
import { connect } from 'react-redux'
import actions from '../../state/story/actions'
import {
  getPrimaryAudioPlayingStatus,
  getPrimaryAudioAudioElement,
  getPrimaryAudioDuration,
} from '../../state/reducers'

import styles from './styles.css'
import { constants, defaults } from './constants'
import keycodes from '../../utils/keycodes'

class PlayPauseButton extends React.Component {
  onClickHandler = () => {
    this.togglePlayPause()
  }

  onKeyUp = (e) => {
    switch (e.keyCode) {
      case keycodes.SPACEBAR:
        this.togglePlayPause()
        break
      case keycodes.ARROW_LEFT:
        this.step(constants.BACKWARD)
        break
      case keycodes.ARROW_RIGHT:
        this.step(constants.FORWARD)
        break
      default:
        break
    }
  }

  /**
   * Toggle audio on or off depending on state of play
   * in redux store
   */
  togglePlayPause = () => {
    if (this.props.isPlaying){
      this.props.togglePlayPause(false)
      this.props.audioElement.pause()
    } else {
      this.props.togglePlayPause(true)
      this.props.audioElement.play()
    }
  }

  /**
   * Increment audio forward or backward on arrow key events
   * @param {boolean} direction
   */
  step = (direction) => {
    this.props.onCurrentTimeChange((direction)
      ? this.props.audioElement.currentTime += defaults.STEP_INCREMENT
      : this.props.audioElement.currentTime -= defaults.STEP_INCREMENT)
    
    if (!this.props.isPlaying) {
      this.props.updatePlayer()
    }
  }
  

  // If audio is playing, return appropriate classname
  getIconClass = () => (
    this.props.isPlaying ? 'playing' : 'paused'
  )

  render = () => (
    <div
      className={`${styles['play-pause-stop']} ${styles[this.getIconClass()]}`}
      aria-label="Audio play/pause button"
      tabIndex="0"
      role="button"
      onClick={this.onClickHandler}
      onKeyUp={this.onKeyUp}
    >
      <svg width="36px" height="36px">
        <circle stroke="#0974AB" fill="#0974AB" cx="18" cy="18" r="17"></circle>
        <g className={`${styles['play-icon']}`}>
          <polygon
            fill="#FFFFFF"
            points="28 18 14 26 14 10"
          ></polygon>
        </g>
        <g className={`${styles['pause-icon']}`}>
          <rect
            fill="#fff"
            x="20px"
            y="10px"
            width="5"
            height="15"
            rx="0.5"
          ></rect>
          <rect
            fill="#fff"
            x="11px"
            y="10px"
            width="5"
            height="15"
            rx="0.5"
          ></rect>
        </g>
      </svg>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isPlaying: getPrimaryAudioPlayingStatus(state),
  audioElement: getPrimaryAudioAudioElement(state),
  duration: getPrimaryAudioDuration(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  togglePlayPause: (playing) => dispatch(actions.primaryAudioTogglePlay(playing)),
  onCurrentTimeChange: (newTime) => dispatch(actions.setCurrentTime(newTime)),
})

export default PlayPauseButton = connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton)
