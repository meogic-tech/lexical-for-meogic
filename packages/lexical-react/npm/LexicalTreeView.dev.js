/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var devtoolsCore = require('@lexical/devtools-core');
var utils = require('@lexical/utils');
var React = require('react');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function TreeView({
  treeTypeButtonClassName,
  timeTravelButtonClassName,
  timeTravelPanelSliderClassName,
  timeTravelPanelButtonClassName,
  viewClassName,
  timeTravelPanelClassName,
  editor
}) {
  const treeElementRef = /*#__PURE__*/React.createRef();
  const [editorCurrentState, setEditorCurrentState] = React.useState(editor.getEditorState());
  const commandsLog = devtoolsCore.useLexicalCommandsLog(editor);
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      setEditorCurrentState(editorState);
    }), editor.registerEditableListener(() => {
      setEditorCurrentState(editor.getEditorState());
    }));
  }, [editor]);
  React.useEffect(() => {
    const element = treeElementRef.current;
    if (element !== null) {
      // @ts-ignore Internal field
      element.__lexicalEditor = editor;
      return () => {
        // @ts-ignore Internal field
        element.__lexicalEditor = null;
      };
    }
  }, [editor, treeElementRef]);
  const handleEditorReadOnly = isReadonly => {
    const rootElement = editor.getRootElement();
    if (rootElement == null) {
      return;
    }
    rootElement.contentEditable = isReadonly ? 'false' : 'true';
  };
  return /*#__PURE__*/React.createElement(devtoolsCore.TreeView, {
    treeTypeButtonClassName: treeTypeButtonClassName,
    timeTravelButtonClassName: timeTravelButtonClassName,
    timeTravelPanelSliderClassName: timeTravelPanelSliderClassName,
    timeTravelPanelButtonClassName: timeTravelPanelButtonClassName,
    viewClassName: viewClassName,
    timeTravelPanelClassName: timeTravelPanelClassName,
    setEditorReadOnly: handleEditorReadOnly,
    editorState: editorCurrentState,
    setEditorState: state => editor.setEditorState(state),
    generateContent: async function (exportDOM) {
      return devtoolsCore.generateContent(editor, commandsLog, exportDOM);
    },
    ref: treeElementRef
  });
}

exports.TreeView = TreeView;
