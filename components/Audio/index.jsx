/**
 * Audio Component.
 * A component that renders a HTML5 Audio tag.  Source description can be rendered optionally.
 */
import React from 'react'
import AudioSinglePlayer from '../AudioSinglePlayer'

const Audio = ({ sourceDesc, sourceUrl, title }) => (
  <AudioSinglePlayer src={sourceUrl} sourceDesc={sourceDesc} title={title} />
)

Audio.propTypes = {
  sourceDesc: React.PropTypes.string,
  sourceUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
}

export default Audio
