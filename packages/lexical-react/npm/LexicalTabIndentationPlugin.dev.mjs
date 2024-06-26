/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $filter, $getNearestBlockElementAncestorOrThrow } from '@lexical/utils';
import { KEY_TAB_COMMAND, $getSelection, $isRangeSelection, OUTDENT_CONTENT_COMMAND, INDENT_CONTENT_COMMAND, INSERT_TAB_COMMAND, COMMAND_PRIORITY_EDITOR, $isBlockElementNode, $createRangeSelection, $normalizeSelection__EXPERIMENTAL } from 'lexical';
import { useEffect } from 'react';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function $indentOverTab(selection) {
  // const handled = new Set();
  const nodes = selection.getNodes();
  const canIndentBlockNodes = $filter(nodes, node => {
    if ($isBlockElementNode(node) && node.canIndent()) {
      return node;
    }
    return null;
  });
  // 1. If selection spans across canIndent block nodes: indent
  if (canIndentBlockNodes.length > 0) {
    return true;
  }
  // 2. If first (anchor/focus) is at block start: indent
  const anchor = selection.anchor;
  const focus = selection.focus;
  const first = focus.isBefore(anchor) ? focus : anchor;
  const firstNode = first.getNode();
  const firstBlock = $getNearestBlockElementAncestorOrThrow(firstNode);
  if (firstBlock.canIndent()) {
    const firstBlockKey = firstBlock.getKey();
    let selectionAtStart = $createRangeSelection();
    selectionAtStart.anchor.set(firstBlockKey, 0, 'element');
    selectionAtStart.focus.set(firstBlockKey, 0, 'element');
    selectionAtStart = $normalizeSelection__EXPERIMENTAL(selectionAtStart);
    if (selectionAtStart.anchor.is(first)) {
      return true;
    }
  }
  // 3. Else: tab
  return false;
}
function registerTabIndentation(editor) {
  return editor.registerCommand(KEY_TAB_COMMAND, event => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return false;
    }
    event.preventDefault();
    const command = $indentOverTab(selection) ? event.shiftKey ? OUTDENT_CONTENT_COMMAND : INDENT_CONTENT_COMMAND : INSERT_TAB_COMMAND;
    return editor.dispatchCommand(command, undefined);
  }, COMMAND_PRIORITY_EDITOR);
}

/**
 * This plugin adds the ability to indent content using the tab key. Generally, we don't
 * recommend using this plugin as it could negatively affect acessibility for keyboard
 * users, causing focus to become trapped within the editor.
 */
function TabIndentationPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return registerTabIndentation(editor);
  });
  return null;
}

export { TabIndentationPlugin, registerTabIndentation };
