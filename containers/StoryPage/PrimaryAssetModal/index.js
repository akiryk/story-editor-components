/**
 * A modal step controller.
 *
 * Assumes each step handles it's own state does not make any judgements on that
 * therefore keeping this modal controller flexible. Uses Redux for it's own
 * internal state management.
 */
import React from 'react'
import { connect } from 'react-redux'

// Components.
import WizardController from '../../Modal/Wizard/WizardController'
import ModalBody from '../../Modal/ModalBody'

// State.
import modalActions from '../../../state/modal/actions'
import wizardActions from '../../../state/wizard/actions'
import assetStaging from '../../../state/assetStaging/actions'

class Steps extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    options: React.PropTypes.shape({
      new: React.PropTypes.boolean,
      heading: React.PropTypes.string,
      steps: React.PropTypes.object,
    }),
  }

  static defaultProps = {
    onClose: () => {},
    options: {},
  }

  modalSettings = {
    heading: this.props.options.heading,
    confirmBtnText: 'Next',
    displayCancel: false,
    clickXtoCancel: true,
    onCancel: this.props.onClose,
  }

  render = () => (
    <ModalBody {...this.modalSettings}>
      <WizardController stepsConfig={this.props.options.steps} />
    </ModalBody>
  )
}

const cleanup = (dispatch) => {
  dispatch(wizardActions.resetWizard())
  dispatch(assetStaging.resetUploads())
  dispatch(modalActions.modalClose())
}

const mapDispatchToProps = (dispatch) => ({
  onClose: () => (cleanup(dispatch)),
})

export default connect(null, mapDispatchToProps)(Steps)
