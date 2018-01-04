/**
 * The Assigned Primary Image Container.
 * A component that renders the currently assigned PrimaryImage for a story.
 * Clicking the remove link will open up a modal to confirm PrimaryImage removal.
 */
import React from 'react'

import Image from '../../../components/Image'
import styles from './styles.css'

const buttonClasses = 'btn btn-link btn-sm text-danger'

const AssignedPrimaryImage = ({ filename, url, openRemoveConfirmModal, openEditImageModal }) => (
  <div>
    <h4 className="card-title">Primary Image</h4>
    <div className={styles.primaryImageWrapper}>
      <Image
        alt={filename}
        sourceUrl={url}
        title={filename}
      />
      <div className={styles.controls}>
        <button className="ml-2 btn btn-link btn-sm color-blue font-weight-bold" onClick={openEditImageModal}>Edit</button>
        <button className={buttonClasses} onClick={openRemoveConfirmModal}>Remove</button>
      </div>
    </div>
  </div>
)

AssignedPrimaryImage.propTypes = {
  filename: React.PropTypes.string,
  url: React.PropTypes.string,
  openRemoveConfirmModal: React.PropTypes.func,
  openEditImageModal: React.PropTypes.func,
}

export default AssignedPrimaryImage
