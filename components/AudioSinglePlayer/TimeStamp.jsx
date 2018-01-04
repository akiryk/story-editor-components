import React from 'react'
import { connect } from 'react-redux'
import actions from '../../state/story/actions'
import {
  getPrimaryAudioTimestampStatus,
  getPrimaryAudioMouseX,
  getPrimaryAudioDuration,
  getPrimaryAudioScrubberWidth,
} from '../../state/reducers'
import { formatDuration } from './Utilities'
import styles from './styles.css'

const TimestampComponent = ({
  displayStatus,
  mouseX,
  scrubberWidth,
  duration}) => {
  const getTimeAtMouseX = () => {
    const time = (mouseX / scrubberWidth) * duration
    if (time > duration) {
      return duration
    }
    if (time < 0) {
      return 0
    }
    return time
  }

  if (displayStatus) {
    return (
      <div className={styles.timeContainer} style={{ left: `${mouseX}px` }}>
        <div className={styles.currentTime}>{formatDuration(getTimeAtMouseX())}</div>
      </div>
    )
  }

  return null
}

const mapStateToProps = (state) => ({
  displayStatus: getPrimaryAudioTimestampStatus(state),
  mouseX: getPrimaryAudioMouseX(state),
  duration: getPrimaryAudioDuration(state),
  scrubberWidth: getPrimaryAudioScrubberWidth(state),
})

export const Timestamp = connect(mapStateToProps)(TimestampComponent)
