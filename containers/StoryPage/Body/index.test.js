import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Editor, Plain } from 'slate'
import RichTextMenu from '@npr/slate-rich-text-toolbar-plugin'


describe('StoryPage component', () => {
  it('renders Editor correctly', () => {
    const renderer = new ReactShallowRenderer()
    renderer.render(
      <Editor
        schema={{}}
        className="story-body"
        placeholder="Write or copy/paste your story here..."
        state={Plain.deserialize('')}
        onChange={(x) => (2 * x)}
        plugins={[]}
      />
    )
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })

  it('renders RichTextMenu correctly', () => {
    const renderer = new ReactShallowRenderer()
    renderer.render(
      <RichTextMenu
        editorState={{}}
        onEditorChange={(x) => (2 * x)}
        primaryButtons={[{ foo: 'bar' }]}
        dropdownButtons={[]}
        moreButtons={[{ foo: 'bar' }]}
        moreIcon={'foobar'}
        closeIcon={'control icons close'}
      />
    )
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
