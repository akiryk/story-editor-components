/**
 * The Primary Image component.
 * This component renders an'add Image' button or the currently assigned primary Image for a story.
 */
import React from 'react'
import { connect } from 'react-redux'

// Components.
import AssignedPrimaryImage from './AssignedPrimaryImage'
import AddPrimaryImage from './AddPrimaryImage'

// State.
import modalActions from '../../../state/modal/actions'
import modalContentComponents from '../../Modal/modalComponentsMap'
import { getPrimaryImageFilename, getPrimaryImageUrl } from '../../../state/reducers'

// Config.
import imageSteps from '../../../config/PrimaryImageWizard'

const PrimaryImage = ({
  filename,
  url,
  openRemoveConfirmModal,
  openAssetPickerModal,
  openEditModal,
}) => (
  <div className="card mb-4">
    <div className="card-block">
      {filename || url ?
        <AssignedPrimaryImage
          filename={filename}
          url={url}
          openRemoveConfirmModal={openRemoveConfirmModal}
          openEditImageModal={openEditModal}
        /> : <AddPrimaryImage openAssetPickerModal={openAssetPickerModal} />
      }
    </div>
  </div>
)

PrimaryImage.propTypes = {
  filename: React.PropTypes.string,
  url: React.PropTypes.string,
  openRemoveConfirmModal: React.PropTypes.func,
  openAssetPickerModal: React.PropTypes.func,
  openEditModal: React.PropTypes.func,
}

PrimaryImage.defaultProps = {
  filename: '',
  url: '',
  openRemoveConfirmModal: () => {},
  openAssetPickerModal: () => {},
  openEditModal: () => {},
}

const mapStatetoProps = (state) => ({
  filename: getPrimaryImageFilename(state),
  url: getPrimaryImageUrl(state),
})

const getImageEditSteps = (isNew = false) => {
  const imageStepsCopy = imageSteps

  if (isNew) {
    delete imageStepsCopy.mainPaths.upload
  }

  return imageStepsCopy
}

const mapDispatchToProps = (dispatch) => ({
  openAssetPickerModal: () => {
    dispatch(modalActions.modalOpen(
        modalContentComponents.IMAGE_COMPONENT_WIZARD_KEY,
        ['modal-dialog','other-image-class'], {
          heading: 'Primary Image',
          steps: getImageEditSteps(false),
        })
    )
  },
  openEditModal: () => {
    dispatch(modalActions.modalOpen(modalContentComponents.IMAGE_COMPONENT_WIZARD_KEY, {
      heading: 'Primary Image',
      steps: getImageEditSteps(true),
    }))
  },
  openRemoveConfirmModal: () => {
    dispatch(modalActions.modalOpen(modalContentComponents.REMOVE_PRIMARY_IMAGE_COMPONENT_KEY))
  },
})

export default connect(mapStatetoProps, mapDispatchToProps)(PrimaryImage)
