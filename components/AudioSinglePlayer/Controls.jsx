import React from 'react'
import { Playhead } from './Playhead'
import Timestamp from './Timestamp'
import Scrubber from './Scrubber'
import styles from './styles.css'

class Controls extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      mouseX: 0,
      display: false,
      mouseIsOver: false,
    }
  }

  componentDidMount = () => {
    this.setControlsLeft(this.controlsEl.getBoundingClientRect().left)
  }

  onMouseMove = (e) => {
    this.setState({
      mouseX: e.clientX - this.controlsXPos,
      display: true,
    })
  }

  onMouseLeave = () => {
    this.setState({
      display: false,
    })
  }

  setControlsLeft = (controlsXPos) => {
    this.controlsXPos = controlsXPos
  }

  getTimeAtMouseX = () => {
    return this.props.getTimeAtMouseX(this.state.mouseX)
  }

  getControlsElement = (el) => (this.controlsEl = el)

  render = () => (
    <div
      onMouseLeave={this.onMouseLeave}
      onMouseMove={this.onMouseMove}
      ref={this.getControlsElement}
    >
      <Timestamp
        display={this.state.display}
        getTimeAtMouseX={this.getTimeAtMouseX}
        xPos={this.state.mouseX}
      />
      <Scrubber
      />
      <Playhead
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        updateProgress={this.props.updateProgress}
        duration={this.props.duration}
        progress={this.props.progress}
        scrubberWidth={this.props.scrubberWidth}
      />
    </div>
  )
}



export default Controls
