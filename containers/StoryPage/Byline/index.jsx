import React from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import crypto from 'crypto'

export default class Byline extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.state = {
      tags: this.props.value.toJS(),
      suggestions: [],
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
  }

  handleDelete (i) {
    const tags = this.state.tags
    tags.splice(i, 1)
    this.setState({ tags })
    this.props.onChange(this.state.tags)
  }

  handleAddition (tag) {
    const tags = this.state.tags
    const hash = crypto.createHash('sha1').update(tag).digest('hex')
    // Since we're not yet inserting byline tags, they don't have a unique id,
    // so we'll just use a hash (length can't be used, because if we delete a
    // tag and add another the new one can have the id of an existing one)
    tags.push({
      id: hash,
      text: tag,
    })

    this.setState({ tags })
    this.props.onChange(this.state.tags)
  }


  handleFilterSuggestions (textInputValue, possibleSuggestionsArray) {
    const lowerCaseQuery = textInputValue.toLowerCase()

    return possibleSuggestionsArray.filter((suggestion) => (
       suggestion.toLowerCase().includes(lowerCaseQuery)
    ))
  }

  handleDrag (tag, currPos, newPos) {
    /* eslint-disable prefer-const */
    let tags = this.state.tags

    // mutate array
    tags.splice(currPos, 1)
    tags.splice(newPos, 0, tag)
    // re-render
    this.setState({ tags })
  }

  render () {
    const { tags, suggestions } = this.state
    return (
      <div className="byline-component">
        <h4 className="card-title">Byline(s)</h4>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          autofocus={false}
          autocomplete
          handleFilterSuggestions={this.handleFilterSuggestions}
          handleDelete={this.handleDelete}
          handleDrag={this.handleDrag}
          handleAddition={this.handleAddition}
          placeholder=""
          delimiters={[9, 13, 188]}
          classNames={{
            tags: 'byline-container',
            tagInput: 'tag-input-container',
            tagInputField: 'tag-input',
            selected: 'tags-container',
            tag: 'editable-tag',
            remove: 'tag-remove',
            suggestions: 'hub-typeahead',
            activeSuggestion: 'tag-typeahead-active',
          }}
        />
        <small className="mr-auto text-muted">Separate bylines with comma, tab, or return.</small>
      </div>
    )
  }
}
