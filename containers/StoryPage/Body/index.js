/**
 * SlateJS Editor based Story Body component.
 */
import React from 'react'
import { Editor, State } from 'slate'

// import RichTextMenu, {
//   getRichTextSchema,
//   createRichTextPlugin,
// } from '@npr/slate-rich-text-toolbar-plugin'
// import '@npr/slate-rich-text-toolbar-plugin/dist/RichTextToolbar.css'

// import {
//   storytextPrimary,
//   storytextDropdown,
//   storytextMore,
//   controlIcons,
// } from '../RichTextToolbarConfig'

// import Html from '../../../serializer/html'

import styles from './styles.css'

class Body extends React.PureComponent {
  static propTypes = {
    onChangeHandler: React.PropTypes.func.isRequired,
    value: React.PropTypes.instanceOf(State).isRequired,
    hasError: React.PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
    this.editorField = null
  }

  componentWillReceiveProps = (nextProps) => {
    const errorHighlightChange = this.props.hasError !== nextProps.hasError

    if (errorHighlightChange) {
      this.editorField.focus()
    }
  }

  render = () => (
    <div>
      <Editor
        className={`story-body ${this.props.hasError ? styles['story-body-placeholder'] : ''}`}
        placeholder="Write or copy/paste your story here..."
        state={this.props.value}
        onChange={this.props.onChangeHandler}
        ref={(editorField) => { this.editorField = editorField }}
      />
    </div>
  )
}

export default Body

