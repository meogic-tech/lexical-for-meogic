/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{useLexicalComposerContext as e}from"@lexical/react/LexicalComposerContext";import{useLexicalNodeSelection as t}from"@lexical/react/useLexicalNodeSelection";import{mergeRegister as r}from"@lexical/utils";import{createCommand as n,DecoratorNode as o,$applyNodeReplacement as i,$isNodeSelection as c,$getSelection as u,$getNodeByKey as a,CLICK_COMMAND as l,COMMAND_PRIORITY_LOW as s,KEY_DELETE_COMMAND as m,KEY_BACKSPACE_COMMAND as p}from"lexical";import*as _ from"react";import{useCallback as g,useEffect as f}from"react";const h=n("INSERT_HORIZONTAL_RULE_COMMAND");function d({nodeKey:n,count:o}){const[i]=e(),[h,d,y]=t(n),x=g((e=>{if(h&&c(u())){e.preventDefault();const t=a(n);if(E(t))return t.remove(),!0}return!1}),[h,n]);f((()=>r(i.registerCommand(l,(e=>{const t=i.getElementByKey(n);return e.target===t&&(e.shiftKey||y(),d(!h),!0)}),s),i.registerCommand(m,x,s),i.registerCommand(p,x,s))),[y,i,h,n,x,d]),f((()=>{const e=i.getElementByKey(n);null!==e&&(e.className=h?"selected":"")}),[i,h,n]);const C=Array.from({length:o},((e,t)=>t));return _.createElement(_.Fragment,null,C.map(((e,t)=>_.createElement("hr",{key:t}))))}class y extends o{static getType(){return"horizontalrule"}static clone(e){return new y(e.__key,e.__count)}static importJSON(e){return C()}static importDOM(){return{hr:()=>({conversion:x,priority:0})}}setCount(e){this.getWritable().__count=e}getCount(){return this.getLatest().__count}constructor(e,t){super(e),this.__count=null!=t?t:1}exportJSON(){return{type:"horizontalrule",version:1}}exportDOM(){return{element:document.createElement("hr")}}createDOM(){return document.createElement("div")}getTextContent(){return"\n"}isInline(){return!1}updateDOM(){return!1}decorate(){return _.createElement(d,{nodeKey:this.__key,count:this.__count})}mergeWithSibling(e){const t=this.getWritable();return t.__count=this.getCount()+e.getCount(),e.remove(),t}}function x(){return{node:C()}}function C(){return i(new y)}function E(e){return e instanceof y}export{C as $createHorizontalRuleNode,E as $isHorizontalRuleNode,y as HorizontalRuleNode,h as INSERT_HORIZONTAL_RULE_COMMAND};
