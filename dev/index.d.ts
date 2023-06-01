export {markhighlightHtml} from './lib/html.js'
export {markHighlight} from './lib/syntax.js'

declare module 'micromark-util-types' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface TokenTypeMap {
    highlightSequence: 'highlightSequence'
    highlightSequenceTemporary: 'highlightSequenceTemporary'
    highlight: 'highlight'
    highlightText: 'highlightText'
  }
}
