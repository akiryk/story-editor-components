import { Type } from '../../serializer/html'
import icons from '../../svg/Icons'

const {
  arrowIcon,
  boldIcon,
  bulletsIcon,
  closeIcon,
  italicIcon,
  linkIcon,
  numbersIcon,
  quoteIcon,
  subscriptIcon,
  superscriptIcon,
} = icons

const MARK = 'mark'
const BLOCK = 'block'
const LINK = 'link'
const DROPDOWN = 'dropdown'

const RichTextButtons = {
  BLOCKQUOTE: {
    buttonType: BLOCK,
    type: Type.HTML_BLOCKQUOTE,
    icon: quoteIcon,
  },
  BOLD: {
    buttonType: MARK,
    type: Type.HTML_BOLD,
    icon: boldIcon,
  },
  ITALIC: {
    buttonType: MARK,
    type: Type.HTML_ITALIC,
    icon: italicIcon,
  },
  LINK: {
    buttonType: LINK,
    type: Type.HTML_LINK,
    icon: linkIcon,
  },
  ORDERED_LIST: {
    buttonType: BLOCK,
    type: Type.HTML_ORDERED_LIST,
    icon: numbersIcon,
  },
  PARAGRAPH_DROPDOWN: {
    buttonType: DROPDOWN,
    type: Type.HTML_PARAGRAPH,
    icon: arrowIcon,
    text: 'paragraph',
  },
  SUBSCRIPT: {
    buttonType: MARK,
    type: Type.HTML_SUBSCRIPT,
    icon: subscriptIcon,
  },
  SUPERSCRIPT: {
    buttonType: MARK,
    type: Type.HTML_SUPERSCRIPT,
    icon: superscriptIcon,
  },
  UNORDERED_LIST: {
    buttonType: BLOCK,
    type: Type.HTML_UNORDERED_LIST,
    icon: bulletsIcon,
  },
}

export default RichTextButtons

export const storytextPrimary = [
  RichTextButtons.BOLD,
  RichTextButtons.ITALIC,
  RichTextButtons.UNORDERED_LIST,
  RichTextButtons.ORDERED_LIST,
  RichTextButtons.BLOCKQUOTE,
  RichTextButtons.LINK,
]

export const storytextDropdown = [
  RichTextButtons.PARAGRAPH_DROPDOWN,
]

export const storytextMore = [
  RichTextButtons.SUBSCRIPT,
  RichTextButtons.SUPERSCRIPT,
]

export const teaserPrimary = [
  RichTextButtons.BOLD,
  RichTextButtons.ITALIC,
]

export const controlIcons = {
  more: arrowIcon,
  close: closeIcon,
}
