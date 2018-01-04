/**
 * Add Primary Image Container.
 * This component renders the 'Add Image' button displayed when no PrimaryImage is assigned.
 * When the 'Add Image' button is clicked, the AssetPicker modal is triggered, to allow for an
 * image file to be uploaded and assigned as primary image.
 */
import React from 'react'

const AddPrimaryImage = ({ openAssetPickerModal }) => (
  <div className="container">
    <div className="row">
      <h4 className="card-title">Primary Image</h4>
    </div>
    <div className="row">
      <button className="btn btn-sm btn-secondary" onClick={openAssetPickerModal} >
        Add Image
      </button>
    </div>
  </div>
)

AddPrimaryImage.propTypes = {
  openAssetPickerModal: React.PropTypes.func.isRequired,
}

export default AddPrimaryImage
