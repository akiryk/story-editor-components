import React from 'react'
import { connect } from 'react-redux'
import { getPrimaryAudioScrubberProgress } from '../../state/reducers'
import styles from './styles.css'

const Progress = ({ progress }) => (
  <div
    className={styles['progress-bar']}
    style={{
      width: `${progress}px`,
    }}
  ></div>
)

const mapStateToProps = (state) => ({
  progress: getPrimaryAudioScrubberProgress(state),
})

export default connect(
  mapStateToProps,
)(Progress)
