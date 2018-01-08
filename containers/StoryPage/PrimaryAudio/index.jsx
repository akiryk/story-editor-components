/**
 * The Primary Audio component.
 * This component renders an'add audio' button or the currently assigned primary audio for a story.
 */
import React from 'react'
import { connect } from 'react-redux'

// Components.
import AssignedPrimaryAudio from './AssignedPrimaryAudio'
import AddPrimaryAudio from './AddPrimaryAudio'

// State.
import modalActions from '../../../state/modal/actions'
import modalContentComponents from '../../Modal/modalComponentsMap'
import { getPrimaryAudioFilename, getPrimaryAudioUrl } from '../../../state/reducers'

// Config.
import audioSteps from '../../../config/PrimaryAudioWizard'

const PrimaryAudio = ({
  filename,
  url,
  openRemoveConfirmModal,
  openAssetPickerModal,
}) => (
  <div className="card mb-4">
    <div className="card-block d-flex justify-content-between">
      {file || url ?
        <AssignedPrimaryAudio
          filename={filename}
          url={url}
          openRemoveConfirmModal={openRemoveConfirmModal}
        />
        : <AddPrimaryAudio openAssetPickerModal={openAssetPickerModal} />
      }
    </div>
  </div>
)

PrimaryAudio.propTypes = {
  filename: React.PropTypes.string,
  url: React.PropTypes.string,
  openRemoveConfirmModal: React.PropTypes.func,
  openAssetPickerModal: React.PropTypes.func,
}

PrimaryAudio.defaultProps = {
  filename: '',
  url: '',
  openRemoveConfirmModal: () => {},
  openAssetPickerModal: () => {},
}

const mapStatetoProps = (state) => ({
  filename: getPrimaryAudioFilename(state),
  url: getPrimaryAudioUrl(state),
})

const mapDispatchToProps = (dispatch) => ({
  openAssetPickerModal: () => {
    dispatch(modalActions.modalOpen(
      modalContentComponents.AUDIO_COMPONENT_WIZARD_KEY,
      ['modal-dialog', 'other-audio-class'], {
        heading: 'Primary Audio',
        steps: audioSteps,
      })
    )
  },
  openRemoveConfirmModal: () => {
    dispatch(modalActions.modalOpen(modalContentComponents.REMOVE_PRIMARY_AUDIO_COMPONENT_KEY))
  },
})

export default connect(mapStatetoProps, mapDispatchToProps)(PrimaryAudio)
