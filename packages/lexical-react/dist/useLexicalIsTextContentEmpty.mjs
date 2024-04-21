/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import{$isRootTextContentEmptyCurry as e}from"@lexical/text";import{useLayoutEffect as t,useEffect as o,useState as i}from"react";var r="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?t:o;function n(t,o){const[n,d]=i(t.getEditorState().read(e(t.isComposing(),o)));return r((()=>t.registerUpdateListener((({editorState:i})=>{const r=t.isComposing(),n=i.read(e(r,o));d(n)}))),[t,o]),n}export{n as useLexicalIsTextContentEmpty};
