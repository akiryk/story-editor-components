/**
 * The Assigned Primary Audio Container.
 * A component that renders the currently assigned PrimaryAudio for a story.
 * A HTML5 Audio tag and remove link are rendered.
 * Clicking the remove link will open up a modal to confirm PrimaryAudio removal.
 */
import React from 'react'

import Audio from '../../../components/Audio'

const AssignedPrimaryAudio = ({ filename, url, openRemoveConfirmModal }) => (
  <div className="container">
    <div className="row">
      <h4 className="card-title">Primary Audio</h4>
    </div>
    <div className="row">
      <Audio title={filename || url} sourceDesc={filename || url} sourceUrl={url} />
    </div>
    <div className="row">
      <button className="btn btn-sm btn-link ml-auto text-danger" onClick={openRemoveConfirmModal}>Remove</button>
    </div>
  </div>
)

AssignedPrimaryAudio.propTypes = {
  filename: React.PropTypes.string,
  url: React.PropTypes.string,
  openRemoveConfirmModal: React.PropTypes.func,
}

export default AssignedPrimaryAudio
