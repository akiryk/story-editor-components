import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import Headline from './index'


describe('StoryPage component', () => {
  it('renders Headline correctly', () => {
    const tree = ReactTestRenderer.create(
      <Headline
        value="This is a headline"
        onChangeHandler={(x) => (2 * x)}
        hasError={false}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
