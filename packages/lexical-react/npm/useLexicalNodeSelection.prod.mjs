/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import{useLexicalComposerContext as e}from"@lexical/react/LexicalComposerContext";import{$getNodeByKey as t,$getSelection as r,$isNodeSelection as o,$createNodeSelection as n,$setSelection as c}from"lexical";import{useState as a,useEffect as i,useCallback as l}from"react";function d(e,r){return e.getEditorState().read((()=>{const e=t(r);return null!==e&&e.isSelected()}))}function u(t){const[u]=e(),[p,s]=a((()=>d(u,t)));i((()=>{let e=!0;const r=u.registerUpdateListener((()=>{e&&s(d(u,t))}));return()=>{e=!1,r()}}),[u,t]);return[p,l((e=>{u.update((()=>{let a=r();o(a)||(a=n(),c(a)),o(a)&&(e?a.add(t):a.delete(t))}))}),[u,t]),l((()=>{u.update((()=>{const e=r();o(e)&&e.clear()}))}),[u])]}export{u as useLexicalNodeSelection};
