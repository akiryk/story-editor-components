/**
 * The Playhead Component.
 * This component renders a 'playhead' element that users can
 * drag to change currenttime for the media playback.
 * TODO: Update jslint to fix bug with jsx-ally
 * See https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/214
 */

import React from 'react'
import { connect } from 'react-redux'
import actions from '../../state/story/actions'
import {
  getPrimaryAudioPlayingStatus,
  getPrimaryAudioScrubberProgress,
  getPrimaryAudioAudioElement,
  getPrimaryAudioDuration,
  getPrimaryAudioScrubberWidth,
  getPrimaryAudioCurrentTime,
} from '../../state/reducers'
import { defaults } from './constants'
import { formatDuration } from './Utilities'
import styles from './styles.css'

class PlayheadWidget extends React.Component {
  initialMouseDownXPos = defaults.INITIAL_PROGRESS
  initialPlayheadXPos = defaults.INITIAL_PROGRESS

  /**
   * On mousedown events, first capture the position of the mouse and the
   * playhead. Then start listening for mousemove and mouseup events. 
   * The mousemove handler uses the initial mouse and playhead
   * positions to update the audio file's current time.
   * 
   * @param (Event) e, the mouse event object
   */
  onMouseDown = (e) => {
    this.props.audioElement.pause()
    this.initialMouseDownXPos = e.clientX
    this.initialPlayheadXPos = this.props.progress || 0
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseUp = () => {
    const progress = this.props.progress ? this.props.progress : 0
    const percent = progress / this.props.scrubberWidth
    const newTime = this.props.duration * percent
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    this.props.audioElement.currentTime = newTime
    this.props.onCurrentTimeChange(newTime)
    if (!this.props.isPlaying) {
      this.props.updatePlayer()
    } else {
      this.props.audioElement.play()
    }
  }

  /**
   * Under some circumstances, the mouseup event doesn't fire.
   * Listening for dragend assures the playhead stops being dragged
   * when user is done dragging.
   */
  onDragEnd = () => {
    this.onMouseUp()
  }

  /**
   * Update the audio file's current time based on the mouse position
   * relative to the scrubber. 
   *
   * @param {Event} e, the mouse event object
   */
  onMouseMove = (e) => {
    const newMouseX = this.getMouseXPos(e.clientX)
    const percent = newMouseX / this.props.scrubberWidth
    const newTime = this.props.duration * percent
    this.props.audioElement.currentTime = newTime
    this.props.onCurrentTimeChange(newTime)
    this.props.updatePlayer()
  }

  /**
   * Calculate mouse x position relative to the scrubber. If mouse is out of
   * bounds, reset to the left or the right.
   * 
   * @param (Number) xPosition, the mouse x position
   * @return (Number) newXPos, the x position relative to scrubber.
   */
  getMouseXPos = (xPosition) => {
    let newXPos = (xPosition - this.initialMouseDownXPos) + this.initialPlayheadXPos
    if (newXPos < 0) {
      newXPos = 0
    }
    if (newXPos >= this.props.scrubberWidth) {
      newXPos = this.props.scrubberWidth - 1
    }
    return newXPos
  }

  render = () => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.playhead}
      onMouseDown={this.onMouseDown}
      onMouseOut={this.onMouseOut}
      onDragEnd={this.onDragEnd}
      style={{ left: `${this.props.progress}px` }}
    >
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => ({
  onCurrentTimeChange: (newTime, newProgress) => {
    dispatch(actions.setCurrentTime(newTime))
    dispatch(actions.updateScrubberProgress(newProgress))
  },
})

const mapStateToProps = (state) => ({
  duration: getPrimaryAudioDuration(state),
  currentTime: getPrimaryAudioCurrentTime(state),
  scrubberWidth: getPrimaryAudioScrubberWidth(state),
  progress: getPrimaryAudioScrubberProgress(state),
  audioElement: getPrimaryAudioAudioElement(state),
  isPlaying: getPrimaryAudioPlayingStatus(state),
})

export const Playhead = connect(mapStateToProps, mapDispatchToProps)(PlayheadWidget);

