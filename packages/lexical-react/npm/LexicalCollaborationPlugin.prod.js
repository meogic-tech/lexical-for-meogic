/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var f=require("@lexical/react/LexicalCollaborationContext"),g=require("@lexical/react/LexicalComposerContext"),k=require("react"),B=require("@lexical/utils"),J=require("@lexical/yjs"),K=require("lexical"),L=require("react-dom"),M=require("yjs");
function N(b,c,a,d,e,z,A,v,w,n,t){let q=k.useRef(!1),[x,r]=k.useState(d.get(c)),h=k.useMemo(()=>J.createBinding(b,a,c,x,d,n),[b,a,c,d,x,n]),p=k.useCallback(()=>{a.connect()},[a]),y=k.useCallback(()=>{try{a.disconnect()}catch(m){}},[a]);k.useEffect(()=>{let {root:m}=h,{awareness:C}=a,D=({status:l})=>{b.dispatchCommand(J.CONNECTED_COMMAND,"connected"===l)},E=l=>{A&&l&&m.isEmpty()&&0===m._xmlText._length&&!1===q.current&&O(b,w);q.current=!1},F=()=>{J.syncCursorPositions(h,a)},G=(l,u)=>{u=u.origin;u!==
h&&J.syncYjsChangesToLexical(h,a,l,u instanceof M.UndoManager)};J.initLocalState(a,e,z,document.activeElement===b.getRootElement(),t||{});let H=l=>{P(b,h);r(l);d.set(c,l);q.current=!0};a.on("reload",H);a.on("status",D);a.on("sync",E);C.on("update",F);m.getSharedType().observeDeep(G);let T=b.registerUpdateListener(({prevEditorState:l,editorState:u,dirtyLeaves:Q,dirtyElements:R,normalizedNodes:S,tags:I})=>{!1===I.has("skip-collab")&&J.syncLexicalUpdateToYjs(h,a,l,u,R,Q,S,I)});p();return()=>{!1===q.current&&
y();a.off("sync",E);a.off("status",D);a.off("reload",H);C.off("update",F);m.getSharedType().unobserveDeep(G);d.delete(c);T()}},[h,z,p,y,d,b,c,w,e,a,A,t]);let U=k.useMemo(()=>L.createPortal(k.createElement("div",{ref:m=>{h.cursorsContainer=m}}),v&&v.current||document.body),[h,v]);k.useEffect(()=>b.registerCommand(J.TOGGLE_CONNECT_COMMAND,m=>{void 0!==p&&void 0!==y&&(m?(console.log("Collaboration connected!"),p()):(console.log("Collaboration disconnected!"),y()));return!0},K.COMMAND_PRIORITY_EDITOR),
[p,y,b]);return[U,h]}function V(b,c,a,d,e){k.useEffect(()=>B.mergeRegister(b.registerCommand(K.FOCUS_COMMAND,()=>{J.setLocalStateFocus(c,a,d,!0,e||{});return!1},K.COMMAND_PRIORITY_EDITOR),b.registerCommand(K.BLUR_COMMAND,()=>{J.setLocalStateFocus(c,a,d,!1,e||{});return!1},K.COMMAND_PRIORITY_EDITOR)),[d,b,a,c,e])}
function W(b,c){let a=k.useMemo(()=>J.createUndoManager(c,c.root.getSharedType()),[c]);k.useEffect(()=>B.mergeRegister(b.registerCommand(K.UNDO_COMMAND,()=>{a.undo();return!0},K.COMMAND_PRIORITY_EDITOR),b.registerCommand(K.REDO_COMMAND,()=>{a.redo();return!0},K.COMMAND_PRIORITY_EDITOR)));let d=k.useCallback(()=>{a.clear()},[a]);k.useEffect(()=>{let e=()=>{b.dispatchCommand(K.CAN_UNDO_COMMAND,0<a.undoStack.length);b.dispatchCommand(K.CAN_REDO_COMMAND,0<a.redoStack.length)};a.on("stack-item-added",
e);a.on("stack-item-popped",e);a.on("stack-cleared",e);return()=>{a.off("stack-item-added",e);a.off("stack-item-popped",e);a.off("stack-cleared",e)}},[b,a]);return d}
function O(b,c){b.update(()=>{var a=K.$getRoot();if(a.isEmpty())if(c)switch(typeof c){case "string":var d=b.parseEditorState(c);b.setEditorState(d,{tag:"history-merge"});break;case "object":b.setEditorState(c,{tag:"history-merge"});break;case "function":b.update(()=>{K.$getRoot().isEmpty()&&c(b)},{tag:"history-merge"})}else d=K.$createParagraphNode(),a.append(d),{activeElement:a}=document,(null!==K.$getSelection()||null!==a&&a===b.getRootElement())&&d.select()},{tag:"history-merge"})}
function P(b,c){b.update(()=>{let d=K.$getRoot();d.clear();d.select()},{tag:"skip-collab"});if(null!=c.cursors&&(b=c.cursors,null!=b&&(c=c.cursorsContainer,null!=c))){b=Array.from(b.values());for(let d=0;d<b.length;d++){var a=b[d].selection;if(a&&null!=a.selections){a=a.selections;for(let e=0;e<a.length;e++)c.removeChild(a[d])}}}}
exports.CollaborationPlugin=function({id:b,providerFactory:c,shouldBootstrap:a,username:d,cursorColor:e,cursorsContainerRef:z,initialEditorState:A,excludedProperties:v,awarenessData:w}){let n=f.useCollaborationContext(d,e),{yjsDocMap:t,name:q,color:x}=n,[r]=g.useLexicalComposerContext();k.useEffect(()=>{n.isCollabActive=!0;return()=>{null==r._parentEditor&&(n.isCollabActive=!1)}},[n,r]);d=k.useMemo(()=>c(b,t),[b,c,t]);let [h,p]=N(r,b,d,t,q,x,a,z,A,v,w);n.clientID=p.clientID;W(r,p);V(r,d,q,x,w);return h}
