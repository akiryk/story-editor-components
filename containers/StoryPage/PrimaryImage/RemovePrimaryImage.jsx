/**
 * The Primary Image Remove Container.
 * The 'remove PrimaryImage confirmation' modal body content.
 * This component is rendered within a modal and asks the user to firm the removal of PrimaryImage
 * when they click the PrimaryImage 'remove' link.
 */
import React from 'react'
import { connect } from 'react-redux'

import ModalBody from '../../Modal/ModalBody'
import modalActions from '../../../state/modal/actions'
import storyActions from '../../../state/story/actions'

import { getPrimaryImageFilename, getPrimaryImageUrl } from '../../../state/reducers'

// TODO: Do we actually need a confirmation dialogue?
const RemovePrimaryImage = ({ filename, url, onRemove, onCancel }) => (
  <ModalBody
    heading="Confirm Primary Image Removal"
    message={`Please click 'confirm' to remove the assigned primary image (${filename || url}).`}
    onCancel={onCancel}
    onConfirm={onRemove}
    clickXtoCancel
  >
  </ModalBody>
)

RemovePrimaryImage.propTypes = {
  filename: React.PropTypes.string,
  url: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onCancel: React.PropTypes.func,
}

const mapStatetoProps = (state) => ({
  filename: getPrimaryImageFilename(state),
  url: getPrimaryImageUrl(state),
})

const mapDispatchToProps = (dispatch) => ({
  onRemove: () => {
    dispatch(storyActions.storyPrimaryImageRemove())
    dispatch(modalActions.modalClose())
  },
  onCancel: () => (dispatch(modalActions.modalClose())),
})

export default connect(mapStatetoProps, mapDispatchToProps)(RemovePrimaryImage)
