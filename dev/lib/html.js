/**
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 */

// To do: next major: expose function instead of object.

/**
 * Extension for `micromark` that can be passed in `htmlExtensions`, to
 * support highlight mark when serializing to HTML.
 *
 * @type {HtmlExtension}
 */
export const markhighlightHtml = {
  enter: {
    highlight() {
      this.tag('<mark>')
    }
  },
  exit: {
    highlight() {
      this.tag('</mark>')
    }
  }
}
