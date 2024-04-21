/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import{useLexicalComposerContext as e}from"@lexical/react/LexicalComposerContext";import{useLayoutEffect as t,useEffect as r}from"react";var o="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?t:r;function i({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:r=!1,onChange:i}){const[n]=e();return o((()=>{if(i)return n.registerUpdateListener((({editorState:e,dirtyElements:o,dirtyLeaves:a,prevEditorState:s,tags:d})=>{r&&0===o.size&&0===a.size||t&&d.has("history-merge")||s.isEmpty()||i(e,n,d)}))}),[n,t,r,i]),null}export{i as OnChangePlugin};
