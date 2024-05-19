/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var b=require("@lexical/react/LexicalComposerContext"),e=require("@lexical/react/useLexicalNodeSelection"),g=require("@lexical/utils"),l=require("lexical"),n=require("react"),p=Object.create(null);if(n)for(var t in n)p[t]=n[t];p.default=n;let u=l.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");
function v({nodeKey:a,count:d}){let [f]=b.useLexicalComposerContext(),[h,q,r]=e.useLexicalNodeSelection(a),m=n.useCallback(c=>h&&l.$isNodeSelection(l.$getSelection())&&(c.preventDefault(),c=l.$getNodeByKey(a),w(c))?(c.remove(),!0):!1,[h,a]);n.useEffect(()=>g.mergeRegister(f.registerCommand(l.CLICK_COMMAND,c=>{let k=f.getElementByKey(a);return c.target===k?(c.shiftKey||r(),q(!h),!0):!1},l.COMMAND_PRIORITY_LOW),f.registerCommand(l.KEY_DELETE_COMMAND,m,l.COMMAND_PRIORITY_LOW),f.registerCommand(l.KEY_BACKSPACE_COMMAND,
m,l.COMMAND_PRIORITY_LOW)),[r,f,h,a,m,q]);n.useEffect(()=>{let c=f.getElementByKey(a);null!==c&&(c.className=h?"selected":"")},[f,h,a]);d=Array.from({length:d},(c,k)=>k);return p.createElement(p.Fragment,null,d.map((c,k)=>p.createElement("hr",{key:k})))}
class x extends l.DecoratorNode{static getType(){return"horizontalrule"}static clone(a){return new x(a.__key,a.__count)}static importJSON(){return y()}static importDOM(){return{hr:()=>({conversion:z,priority:0})}}setCount(a){this.getWritable().__count=a}getCount(){return this.getLatest().__count}constructor(a,d){super(a);this.__count=null!==d&&void 0!==d?d:1}exportJSON(){return{type:"horizontalrule",version:1}}exportDOM(){return{element:document.createElement("hr")}}createDOM(){return document.createElement("div")}getTextContent(){return"\n"}isInline(){return!1}updateDOM(){return!1}decorate(){return p.createElement(v,
{nodeKey:this.__key,count:this.__count})}mergeWithSibling(a){let d=this.getWritable();d.__count=this.getCount()+a.getCount();a.remove();return d}}function z(){return{node:y()}}function y(){return l.$applyNodeReplacement(new x)}function w(a){return a instanceof x}exports.$createHorizontalRuleNode=y;exports.$isHorizontalRuleNode=w;exports.HorizontalRuleNode=x;exports.INSERT_HORIZONTAL_RULE_COMMAND=u
