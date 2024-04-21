/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { OverflowNode, $isOverflowNode, $createOverflowNode } from '@lexical/overflow';
import { $rootTextContent } from '@lexical/text';
import { mergeRegister, $dfs } from '@lexical/utils';
import { $getSelection, $isRangeSelection, $isTextNode, $isLeafNode, $setSelection } from 'lexical';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function useCharacterLimit(editor, maxCharacters, optional = Object.freeze({})) {
  const {
    strlen = input => input.length,
    // UTF-16
    remainingCharacters = () => {
      return;
    }
  } = optional;
  useEffect(() => {
    if (!editor.hasNodes([OverflowNode])) {
      {
        throw Error(`useCharacterLimit: OverflowNode not registered on editor`);
      }
    }
  }, [editor]);
  useEffect(() => {
    let text = editor.getEditorState().read($rootTextContent);
    let lastComputedTextLength = 0;
    return mergeRegister(editor.registerTextContentListener(currentText => {
      text = currentText;
    }), editor.registerUpdateListener(({
      dirtyLeaves,
      dirtyElements
    }) => {
      const isComposing = editor.isComposing();
      const hasContentChanges = dirtyLeaves.size > 0 || dirtyElements.size > 0;
      if (isComposing || !hasContentChanges) {
        return;
      }
      const textLength = strlen(text);
      const textLengthAboveThreshold = textLength > maxCharacters || lastComputedTextLength !== null && lastComputedTextLength > maxCharacters;
      const diff = maxCharacters - textLength;
      remainingCharacters(diff);
      if (lastComputedTextLength === null || textLengthAboveThreshold) {
        const offset = findOffset(text, maxCharacters, strlen);
        editor.update(() => {
          $wrapOverflowedNodes(offset);
        }, {
          tag: 'history-merge'
        });
      }
      lastComputedTextLength = textLength;
    }));
  }, [editor, maxCharacters, remainingCharacters, strlen]);
}
function findOffset(text, maxCharacters, strlen) {
  // @ts-ignore This is due to be added in a later version of TS
  const Segmenter = Intl.Segmenter;
  let offsetUtf16 = 0;
  let offset = 0;
  if (typeof Segmenter === 'function') {
    const segmenter = new Segmenter();
    const graphemes = segmenter.segment(text);
    for (const {
      segment: grapheme
    } of graphemes) {
      const nextOffset = offset + strlen(grapheme);
      if (nextOffset > maxCharacters) {
        break;
      }
      offset = nextOffset;
      offsetUtf16 += grapheme.length;
    }
  } else {
    const codepoints = Array.from(text);
    const codepointsLength = codepoints.length;
    for (let i = 0; i < codepointsLength; i++) {
      const codepoint = codepoints[i];
      const nextOffset = offset + strlen(codepoint);
      if (nextOffset > maxCharacters) {
        break;
      }
      offset = nextOffset;
      offsetUtf16 += codepoint.length;
    }
  }
  return offsetUtf16;
}
function $wrapOverflowedNodes(offset) {
  const dfsNodes = $dfs();
  const dfsNodesLength = dfsNodes.length;
  let accumulatedLength = 0;
  for (let i = 0; i < dfsNodesLength; i += 1) {
    const {
      node
    } = dfsNodes[i];
    if ($isOverflowNode(node)) {
      const previousLength = accumulatedLength;
      const nextLength = accumulatedLength + node.getTextContentSize();
      if (nextLength <= offset) {
        const parent = node.getParent();
        const previousSibling = node.getPreviousSibling();
        const nextSibling = node.getNextSibling();
        $unwrapNode(node);
        const selection = $getSelection();

        // Restore selection when the overflow children are removed
        if ($isRangeSelection(selection) && (!selection.anchor.getNode().isAttached() || !selection.focus.getNode().isAttached())) {
          if ($isTextNode(previousSibling)) {
            previousSibling.select();
          } else if ($isTextNode(nextSibling)) {
            nextSibling.select();
          } else if (parent !== null) {
            parent.select();
          }
        }
      } else if (previousLength < offset) {
        const descendant = node.getFirstDescendant();
        const descendantLength = descendant !== null ? descendant.getTextContentSize() : 0;
        const previousPlusDescendantLength = previousLength + descendantLength;
        // For simple text we can redimension the overflow into a smaller and more accurate
        // container
        const firstDescendantIsSimpleText = $isTextNode(descendant) && descendant.isSimpleText();
        const firstDescendantDoesNotOverflow = previousPlusDescendantLength <= offset;
        if (firstDescendantIsSimpleText || firstDescendantDoesNotOverflow) {
          $unwrapNode(node);
        }
      }
    } else if ($isLeafNode(node)) {
      const previousAccumulatedLength = accumulatedLength;
      accumulatedLength += node.getTextContentSize();
      if (accumulatedLength > offset && !$isOverflowNode(node.getParent())) {
        const previousSelection = $getSelection();
        let overflowNode;

        // For simple text we can improve the limit accuracy by splitting the TextNode
        // on the split point
        if (previousAccumulatedLength < offset && $isTextNode(node) && node.isSimpleText()) {
          const [, overflowedText] = node.splitText(offset - previousAccumulatedLength);
          overflowNode = $wrapNode(overflowedText);
        } else {
          overflowNode = $wrapNode(node);
        }
        if (previousSelection !== null) {
          $setSelection(previousSelection);
        }
        mergePrevious(overflowNode);
      }
    }
  }
}
function $wrapNode(node) {
  const overflowNode = $createOverflowNode();
  node.insertBefore(overflowNode);
  overflowNode.append(node);
  return overflowNode;
}
function $unwrapNode(node) {
  const children = node.getChildren();
  const childrenLength = children.length;
  for (let i = 0; i < childrenLength; i++) {
    node.insertBefore(children[i]);
  }
  node.remove();
  return childrenLength > 0 ? children[childrenLength - 1] : null;
}
function mergePrevious(overflowNode) {
  const previousNode = overflowNode.getPreviousSibling();
  if (!$isOverflowNode(previousNode)) {
    return;
  }
  const firstChild = overflowNode.getFirstChild();
  const previousNodeChildren = previousNode.getChildren();
  const previousNodeChildrenLength = previousNodeChildren.length;
  if (firstChild === null) {
    overflowNode.append(...previousNodeChildren);
  } else {
    for (let i = 0; i < previousNodeChildrenLength; i++) {
      firstChild.insertBefore(previousNodeChildren[i]);
    }
  }
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    const anchor = selection.anchor;
    const anchorNode = anchor.getNode();
    const focus = selection.focus;
    const focusNode = anchor.getNode();
    if (anchorNode.is(previousNode)) {
      anchor.set(overflowNode.getKey(), anchor.offset, 'element');
    } else if (anchorNode.is(overflowNode)) {
      anchor.set(overflowNode.getKey(), previousNodeChildrenLength + anchor.offset, 'element');
    }
    if (focusNode.is(previousNode)) {
      focus.set(overflowNode.getKey(), focus.offset, 'element');
    } else if (focusNode.is(overflowNode)) {
      focus.set(overflowNode.getKey(), previousNodeChildrenLength + focus.offset, 'element');
    }
  }
  previousNode.remove();
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const CHARACTER_LIMIT = 5;
let textEncoderInstance = null;
function textEncoder() {
  if (window.TextEncoder === undefined) {
    return null;
  }
  if (textEncoderInstance === null) {
    textEncoderInstance = new window.TextEncoder();
  }
  return textEncoderInstance;
}
function utf8Length(text) {
  const currentTextEncoder = textEncoder();
  if (currentTextEncoder === null) {
    // http://stackoverflow.com/a/5515960/210370
    const m = encodeURIComponent(text).match(/%[89ABab]/g);
    return text.length + (m ? m.length : 0);
  }
  return currentTextEncoder.encode(text).length;
}
function DefaultRenderer({
  remainingCharacters
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `characters-limit ${remainingCharacters < 0 ? 'characters-limit-exceeded' : ''}`
  }, remainingCharacters);
}
function CharacterLimitPlugin({
  charset = 'UTF-16',
  maxLength = CHARACTER_LIMIT,
  renderer = DefaultRenderer
}) {
  const [editor] = useLexicalComposerContext();
  const [remainingCharacters, setRemainingCharacters] = useState(maxLength);
  const characterLimitProps = useMemo(() => ({
    remainingCharacters: setRemainingCharacters,
    strlen: text => {
      if (charset === 'UTF-8') {
        return utf8Length(text);
      } else if (charset === 'UTF-16') {
        return text.length;
      } else {
        throw new Error('Unrecognized charset');
      }
    }
  }), [charset]);
  useCharacterLimit(editor, maxLength, characterLimitProps);
  return renderer({
    remainingCharacters
  });
}

export { CharacterLimitPlugin };
