import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'
import {
  markHighlight as syntax,
  markhighlightHtml as html
} from '../dev/index.js'

test('core', async () => {
  assert.deepEqual(
    Object.keys(await import('../dev/index.js')).sort(),
    ['markHighlight', 'markhighlightHtml'],
    'should expose the public api'
  )
})

test('markdown -> html (micromark)', () => {
  const defaults = syntax()

  assert.deepEqual(
    micromark('a ==b==', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <mark>b</mark></p>',
    'should support highlight w/ two equalsTo'
  )

  assert.deepEqual(
    micromark('a =b=', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a =b=</p>',
    'should not support highlight w/ one equalsTo'
  )

  assert.deepEqual(
    micromark('a ===b===', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a ===b===</p>',
    'should not support highlight w/ three equalsTo'
  )

  assert.deepEqual(
    micromark('a \\~==b== c', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a ~<mark>b</mark> c</p>',
    'should support highlight w/ after an escaped equalsTo'
  )

  assert.deepEqual(
    micromark('a ==b ==c== d== e', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <mark>b <mark>c</mark> d</mark> e</p>',
    'should support nested highlight'
  )

  assert.deepEqual(
    micromark('a ==-1== b', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <mark>-1</mark> b</p>',
    'should open if preceded by whitespace and followed by punctuation'
  )

  assert.deepEqual(
    micromark('a ==b.== c', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <mark>b.</mark> c</p>',
    'should close if preceded by punctuation and followed by whitespace'
  )

  // assert.deepEqual(
  //   micromark('~b.~.', {
  //     extensions: [syntax({singleTilde: true})],
  //     htmlExtensions: [html]
  //   }),
  //   '<p><del>b.</del>.</p>',
  //   'should close if preceded and followed by punctuation (del)'
  // )

  // assert.deepEqual(
  //   micromark('a ~b~ ~~c~~ d', {
  //     extensions: [syntax({singleTilde: false})],
  //     htmlExtensions: [html]
  //   }),
  //   '<p>a ~b~ <del>c</del> d</p>',
  //   'should not support strikethrough w/ one tilde if `singleTilde: false`'
  // )

  // assert.deepEqual(
  //   micromark('a ~b~ ~~c~~ d', {
  //     extensions: [syntax({singleTilde: true})],
  //     htmlExtensions: [html]
  //   }),
  //   '<p>a <del>b</del> <del>c</del> d</p>',
  //   'should support strikethrough w/ one tilde if `singleTilde: true`'
  // )
})
