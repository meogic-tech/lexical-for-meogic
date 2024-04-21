/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import{useLexicalComposerContext as e}from"@lexical/react/LexicalComposerContext";import{CLEAR_EDITOR_COMMAND as o,$getRoot as t,$getSelection as n,$createParagraphNode as r,$isRangeSelection as l,COMMAND_PRIORITY_EDITOR as a}from"lexical";import{useLayoutEffect as i,useEffect as c}from"react";var m="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?i:c;function d({onClear:i}){const[c]=e();return m((()=>c.registerCommand(o,(e=>(c.update((()=>{if(null==i){const e=t(),o=n(),a=r();e.clear(),e.append(a),null!==o&&a.select(),l(o)&&(o.format=0)}else i()})),!0)),a)),[c,i]),null}export{d as ClearEditorPlugin};
