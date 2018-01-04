/**
 * Story specific Headline stateless component.
 */
import React from 'react'

const Headline = ({ value, onChangeHandler, hasError }) => (
  <div className={`form-group ${hasError ? 'has-danger' : ''}`}>
    <input
      type="text"
      placeholder="Write a headline"
      className={`form-control story-headline ${hasError ? 'placeholder-danger' : ''}`}
      onChange={onChangeHandler}
      value={value}
    />
  </div>
)

Headline.propTypes = {
  onChangeHandler: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  hasError: React.PropTypes.bool,
}

export default Headline

