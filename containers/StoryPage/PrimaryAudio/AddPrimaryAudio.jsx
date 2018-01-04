/**
 * Add Primary Audio Container.
 * This component renders the 'Add Audio' button displayed when no PrimaryAudio is assigned.
 * When the 'Add Audio' button is clicked, the AudioAssetPicker modal is triggered, to allow for an
 * audio file to be uploaded and assigned as primary audio.
 */
import React from 'react'

const AddPrimaryAudio = ({ openAssetPickerModal }) => (
  <div className="container">
    <div className="row">
      <h4 className="card-title">Primary Audio</h4>
    </div>
    <div className="row">
      <button className="btn btn-sm btn-secondary" onClick={openAssetPickerModal} >
        Add Audio
      </button>
    </div>
  </div>
)

AddPrimaryAudio.propTypes = {
  openAssetPickerModal: React.PropTypes.func.isRequired,
}

export default AddPrimaryAudio
