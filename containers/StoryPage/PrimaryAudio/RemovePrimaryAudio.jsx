/**
 * The Primary Audio Remove Container.
 * The 'remove PrimaryAudio confirmation' modal body content.
 * This component is rendered within a modal and asks the user to firm the removal of PrimaryAudio
 * when they click the PrimaryAudio 'remove' link.
 */
import React from 'react'
import { connect } from 'react-redux'

import ModalBody from '../../Modal/ModalBody'
import modalActions from '../../../state/modal/actions'
import storyActions from '../../../state/story/actions'

import { getPrimaryAudioFilename, getPrimaryAudioUrl } from '../../../state/reducers'

// TODO: Do we actually need a confirmation dialogue?
const PrimaryAudioRemove = ({ filename, url, onRemove, onCancel }) => (
  <ModalBody
    heading="Confirm Primary Audio Removal"
    message={`Please click 'confirm' to remove the assigned primary audio (${filename || url}).`}
    onCancel={onCancel}
    onConfirm={onRemove}
    clickXtoCancel
  >
  </ModalBody>
)

PrimaryAudioRemove.propTypes = {
  filename: React.PropTypes.string,
  url: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onCancel: React.PropTypes.func,
}

const mapStatetoProps = (state) => ({
  filename: getPrimaryAudioFilename(state),
  url: getPrimaryAudioUrl(state),
})

const mapDispatchToProps = (dispatch) => ({
  onRemove: () => {
    dispatch(storyActions.storyPrimaryAudioRemove())
    dispatch(modalActions.modalClose())
  },
  onCancel: () => (dispatch(modalActions.modalClose())),
})

export default connect(mapStatetoProps, mapDispatchToProps)(PrimaryAudioRemove)
