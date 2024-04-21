/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import { createCommand, DecoratorNode, $applyNodeReplacement, $isNodeSelection, $getSelection, $getNodeByKey, CLICK_COMMAND, COMMAND_PRIORITY_LOW, KEY_DELETE_COMMAND, KEY_BACKSPACE_COMMAND } from 'lexical';
import * as React from 'react';
import { useCallback, useEffect } from 'react';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_HORIZONTAL_RULE_COMMAND = createCommand('INSERT_HORIZONTAL_RULE_COMMAND');
function HorizontalRuleComponent({
  nodeKey,
  count
}) {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const onDelete = useCallback(event => {
    if (isSelected && $isNodeSelection($getSelection())) {
      event.preventDefault();
      const node = $getNodeByKey(nodeKey);
      if ($isHorizontalRuleNode(node)) {
        node.remove();
        return true;
      }
    }
    return false;
  }, [isSelected, nodeKey]);
  useEffect(() => {
    return mergeRegister(editor.registerCommand(CLICK_COMMAND, event => {
      const hrElem = editor.getElementByKey(nodeKey);
      if (event.target === hrElem) {
        if (!event.shiftKey) {
          clearSelection();
        }
        setSelected(!isSelected);
        return true;
      }
      return false;
    }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW));
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);
  useEffect(() => {
    const hrElem = editor.getElementByKey(nodeKey);
    if (hrElem !== null) {
      hrElem.className = isSelected ? 'selected' : '';
    }
  }, [editor, isSelected, nodeKey]);
  const hrArray = Array.from({
    length: count
  }, (_, index) => index);
  return /*#__PURE__*/React.createElement(React.Fragment, null, hrArray.map((_, index) => /*#__PURE__*/React.createElement("hr", {
    key: index
  })));
}
class HorizontalRuleNode extends DecoratorNode {
  static getType() {
    return 'horizontalrule';
  }
  static clone(node) {
    return new HorizontalRuleNode(node.__key, node.__count);
  }
  static importJSON(serializedNode) {
    return $createHorizontalRuleNode();
  }
  static importDOM() {
    return {
      hr: () => ({
        conversion: convertHorizontalRuleElement,
        priority: 0
      })
    };
  }
  setCount(count) {
    const self = this.getWritable();
    self.__count = count;
  }
  getCount() {
    const self = this.getLatest();
    return self.__count;
  }
  constructor(key, count) {
    super(key);
    this.__count = count !== null && count !== undefined ? count : 1;
  }
  exportJSON() {
    return {
      type: 'horizontalrule',
      version: 1
    };
  }
  exportDOM() {
    return {
      element: document.createElement('hr')
    };
  }
  createDOM() {
    return document.createElement('div');
  }
  getTextContent() {
    return '\n';
  }
  isInline() {
    return false;
  }
  updateDOM() {
    return false;
  }
  decorate() {
    return /*#__PURE__*/React.createElement(HorizontalRuleComponent, {
      nodeKey: this.__key,
      count: this.__count
    });
  }
  mergeWithSibling(target) {
    const writableSelf = this.getWritable();
    writableSelf.__count = this.getCount() + target.getCount();
    target.remove();
    return writableSelf;
  }
}
function convertHorizontalRuleElement() {
  return {
    node: $createHorizontalRuleNode()
  };
}
function $createHorizontalRuleNode() {
  return $applyNodeReplacement(new HorizontalRuleNode());
}
function $isHorizontalRuleNode(node) {
  return node instanceof HorizontalRuleNode;
}

export { $createHorizontalRuleNode, $isHorizontalRuleNode, HorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND };
