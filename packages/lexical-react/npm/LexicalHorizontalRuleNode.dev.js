/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var useLexicalNodeSelection = require('@lexical/react/useLexicalNodeSelection');
var utils = require('@lexical/utils');
var lexical = require('lexical');
var React = require('react');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_HORIZONTAL_RULE_COMMAND = lexical.createCommand('INSERT_HORIZONTAL_RULE_COMMAND');

function HorizontalRuleComponent({
  nodeKey,
  count
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection.useLexicalNodeSelection(nodeKey);
  const onDelete = React.useCallback(event => {
    if (isSelected && lexical.$isNodeSelection(lexical.$getSelection())) {
      event.preventDefault();
      const node = lexical.$getNodeByKey(nodeKey);

      if ($isHorizontalRuleNode(node)) {
        node.remove();
      }
    }

    return false;
  }, [isSelected, nodeKey]);
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerCommand(lexical.CLICK_COMMAND, event => {
      const hrElem = editor.getElementByKey(nodeKey);

      if (event.target === hrElem) {
        if (!event.shiftKey) {
          clearSelection();
        }

        setSelected(!isSelected);
        return true;
      }

      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_DELETE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW));
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);
  React.useEffect(() => {
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

class HorizontalRuleNode extends lexical.DecoratorNode {
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
  return lexical.$applyNodeReplacement(new HorizontalRuleNode());
}
function $isHorizontalRuleNode(node) {
  return node instanceof HorizontalRuleNode;
}

exports.$createHorizontalRuleNode = $createHorizontalRuleNode;
exports.$isHorizontalRuleNode = $isHorizontalRuleNode;
exports.HorizontalRuleNode = HorizontalRuleNode;
exports.INSERT_HORIZONTAL_RULE_COMMAND = INSERT_HORIZONTAL_RULE_COMMAND;
