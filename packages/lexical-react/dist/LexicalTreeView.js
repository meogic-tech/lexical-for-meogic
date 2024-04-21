/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var c=require("@lexical/devtools-core"),d=require("@lexical/utils"),h=require("react");
exports.TreeView=function({treeTypeButtonClassName:k,timeTravelButtonClassName:l,timeTravelPanelSliderClassName:m,timeTravelPanelButtonClassName:n,viewClassName:p,timeTravelPanelClassName:q,editor:a}){let e=h.createRef(),[r,f]=h.useState(a.getEditorState()),t=c.useLexicalCommandsLog(a);h.useEffect(()=>d.mergeRegister(a.registerUpdateListener(({editorState:b})=>{f(b)}),a.registerEditableListener(()=>{f(a.getEditorState())})),[a]);h.useEffect(()=>{let b=e.current;if(null!==b)return b.__lexicalEditor=
a,()=>{b.__lexicalEditor=null}},[a,e]);return h.createElement(c.TreeView,{treeTypeButtonClassName:k,timeTravelButtonClassName:l,timeTravelPanelSliderClassName:m,timeTravelPanelButtonClassName:n,viewClassName:p,timeTravelPanelClassName:q,setEditorReadOnly:b=>{const g=a.getRootElement();null!=g&&(g.contentEditable=b?"false":"true")},editorState:r,setEditorState:b=>a.setEditorState(b),generateContent:async function(b){return c.generateContent(a,t,b)},ref:e})}
