# micromark-extension-mark-highlight

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[micromark][] extensions to support mark [highlight][].

## Contents

- [micromark-extension-mark-highlight](#micromark-extension-mark-highlight)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [When to use this](#when-to-use-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`markHighlight()`](#markhighlight)
          - [Returns](#returns)
    - [`markhighlightHtml`](#markhighlighthtml)
  - [HTML](#html)
  - [Types](#types)
  - [Compatibility](#compatibility)
  - [Security](#security)
  - [Related](#related)
  - [Contribute](#contribute)
  - [License](#license)

## What is this?

This package contains extensions that add support for hightlight to [`micromark`][micromark].

## When to use this

This project is useful when you want to support highlight mark in markdown.

You can use these extensions when you are working with [`micromark`][micromark].

When you need a syntax tree, you can combine this package with
[`mdast-util-mark-highlight`][mdast-util-mark-highlight].

All these packages are used [`remark-mark-highlight`][remark-mark-highlight], which focusses on making
it easier to transform content by abstracting these internals away.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+), install with [npm][]:

```sh
npm install micromark-extension-mark-highlight
```

In Deno with [`esm.sh`][esmsh]:

```js
import {markHighlight, markhighlightHtml} from 'https://esm.sh/micromark-extension-mark-highlight@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {markHighlight, markhighlightHtml} from 'https://esm.sh/micromark-extension-mark-highlight@1?bundle'
</script>
```

## Use

```js
import {micromark} from 'micromark'
import {
  markHighlight,
  markhighlightHtml
} from 'micromark-extension-mark-highlight'

const output = micromark('Some ~highlight~.', {
  extensions: [markHighlight()],
  htmlExtensions: [markhighlightHtml]
})

console.log(output)
```

Yields:

```html
<p>Some <mark>highlight</mark></p>.
```

## API

This package exports the identifiers
[`markHighlight`][api-mark-highlight] and
[`markhighlightHtml`][api-mark-highlight].
There is no default export.

The export map supports the [`development` condition][development].
Run `node --conditions development module.js` to get instrumented dev code.
Without this condition, production code is loaded.

### `markHighlight()`

Create an extension for `micromark` to enable mark highlight syntax.

###### Returns

Extension for `micromark` that can be passed in `extensions`, to
enable mark highlight syntax ([`Extension`][micromark-extension]).

### `markhighlightHtml`

Extension for `micromark` that can be passed in `htmlExtensions`, to support
mark highlight when serializing to HTML
([`HtmlExtension`][micromark-html-extension]).


## HTML

When tilde sequences match, they together relate to the `<mark>` element in
HTML.
See [*§ 4.5.23 The mark element*][html-mark] in the HTML spec for more info.

Sequences are matched together to form highlight based on which character
they contain, how long they are, and what character occurs before and after
each sequence.
Otherwise they are turned into data.

## Types

This package is fully typed with [TypeScript][].

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+.
Our projects sometimes work with older versions, but this is not guaranteed.

These extensions work with `micromark` version 3+.

## Security

This package is safe.

## Related

## Contribute

See [`contributing.md` in `micromark/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/micromark/micromark-extension-gfm-strikethrough/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-gfm-strikethrough/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-gfm-strikethrough.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-gfm-strikethrough

[downloads-badge]: https://img.shields.io/npm/dm/micromark-extension-gfm-strikethrough.svg

[downloads]: https://www.npmjs.com/package/micromark-extension-gfm-strikethrough

[size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-extension-gfm-strikethrough.svg

[size]: https://bundlephobia.com/result?p=micromark-extension-gfm-strikethrough

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/micromark/micromark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/micromark/.github/blob/main/contributing.md

[support]: https://github.com/micromark/.github/blob/main/support.md

[coc]: https://github.com/micromark/.github/blob/main/code-of-conduct.md

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[development]: https://nodejs.org/api/packages.html#packages_resolving_user_conditions

[micromark]: https://github.com/micromark/micromark

[micromark-html-extension]: https://github.com/micromark/micromark#htmlextension

[micromark-extension]: https://github.com/micromark/micromark#syntaxextension

[micromark-extension-gfm]: https://github.com/micromark/micromark-extension-gfm

[mdast-util-gfm-strikethrough]: https://github.com/syntax-tree/mdast-util-gfm-strikethrough

[mdast-util-gfm]: https://github.com/syntax-tree/mdast-util-gfm

[remark-gfm]: https://github.com/remarkjs/remark-gfm

[strikethrough]: https://github.github.com/gfm/#strikethrough-extension-

[github-markdown-css]: https://github.com/sindresorhus/github-markdown-css

[html-mark]: https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-mark-element

[api-gfm-strikethrough]: #gfmstrikethroughoptions

[api-gfm-strikethrough-html]: #gfmstrikethroughhtml

