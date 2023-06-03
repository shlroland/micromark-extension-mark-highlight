/**
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 *
 */

import {ok as assert} from 'uvu/assert'
import {splice} from 'micromark-util-chunked'
import {classifyCharacter} from 'micromark-util-classify-character'
import {resolveAll} from 'micromark-util-resolve-all'
import {codes} from 'micromark-util-symbol/codes.js'
import {constants} from 'micromark-util-symbol/constants.js'
import {types} from 'micromark-util-symbol/types.js'

const HIGHLIGHT_SEQUENCE_TEMPORTARY = 'highlightSequenceTemporary'
const HIGHLIGHT_SEQUENCE = 'highlightSequence'
const HIGHLIGHT = 'highlight'
const HIGHLIGHT_TEXT = 'highlightText'

/**
 * Create an extension for `micromark` to enable highlight syntax.
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable highlight syntax.
 */
export function markHighlight() {
  const tokenizer = {
    tokenize: tokenizeHighlight,
    resolveAll: resolveAllHighlight
  }

  return {
    text: {[codes.equalsTo]: tokenizer},
    insideSpan: {null: [tokenizer]},
    attentionMarkers: {null: [codes.equalsTo]}
  }

  /**
   * Take events and resolve highlight.
   *
   * @type {Resolver}
   */
  function resolveAllHighlight(events, context) {
    let index = -1
    // Walk through all events.
    while (++index < events.length) {
      // Find a token that can close.
      if (
        events[index][0] === 'enter' &&
        events[index][1].type === HIGHLIGHT_SEQUENCE_TEMPORTARY &&
        events[index][1]._close
      ) {
        let open = index

        // Now walk back to find an opener.
        while (open--) {
          // Find a token that can open the closer.
          if (
            events[open][0] === 'exit' &&
            events[open][1].type === HIGHLIGHT_SEQUENCE_TEMPORTARY &&
            events[open][1]._open &&
            // If the sizes are the same:
            events[index][1].end.offset - events[index][1].start.offset ===
              events[open][1].end.offset - events[open][1].start.offset
          ) {
            events[index][1].type = HIGHLIGHT_SEQUENCE
            events[open][1].type = HIGHLIGHT_SEQUENCE

            /** @type {Token} */
            const highlight = {
              type: HIGHLIGHT,
              start: Object.assign({}, events[open][1].start),
              end: Object.assign({}, events[index][1].end)
            }

            /** @type {Token} */
            const text = {
              type: HIGHLIGHT_TEXT,
              start: Object.assign({}, events[open][1].end),
              end: Object.assign({}, events[index][1].start)
            }

            // Opening.
            /** @type {Array<Event>} */
            const nextEvents = [
              ['enter', highlight, context],
              ['enter', events[open][1], context],
              ['exit', events[open][1], context],
              ['enter', text, context]
            ]

            const insideSpan = context.parser.constructs.insideSpan.null

            if (insideSpan) {
              // Between.
              splice(
                nextEvents,
                nextEvents.length,
                0,
                resolveAll(insideSpan, events.slice(open + 1, index), context)
              )
            }

            // Closing.
            splice(nextEvents, nextEvents.length, 0, [
              ['exit', text, context],
              ['enter', events[index][1], context],
              ['exit', events[index][1], context],
              ['exit', highlight, context]
            ])

            splice(events, open - 1, index - open + 3, nextEvents)

            index = open + nextEvents.length - 2
            break
          }
        }
      }
    }

    index = -1

    while (++index < events.length) {
      if (events[index][1].type === HIGHLIGHT_SEQUENCE_TEMPORTARY) {
        events[index][1].type = types.data
      }
    }

    return events
  }

  /**
   * @this {TokenizeContext}
   * @type {Tokenizer}
   */
  function tokenizeHighlight(effects, ok, nok) {
    const previous = this.previous
    const events = this.events
    let size = 0

    return start

    /** @type {State} */
    function start(code) {
      assert(code === codes.equalsTo, 'expected `=`')
      if (
        previous === codes.equalsTo &&
        events[events.length - 1][1].type !== types.characterEscape
      ) {
        return nok(code)
      }

      effects.enter(HIGHLIGHT_SEQUENCE_TEMPORTARY)
      return more(code)
    }

    /** @type {State} */
    function more(code) {
      const before = classifyCharacter(previous)

      if (code === codes.equalsTo && size !== 2) {
        // If this is the third marker, exit.
        if (size > 1) return nok(code)
        effects.consume(code)
        size++
        return more
      }

      if (size < 2) return nok(code)
      const token = effects.exit(HIGHLIGHT_SEQUENCE_TEMPORTARY)
      const after = classifyCharacter(code)
      token._open =
        !after || (after === constants.attentionSideAfter && Boolean(before))
      token._close =
        !before || (before === constants.attentionSideAfter && Boolean(after))
      return ok(code)
    }
  }
}
