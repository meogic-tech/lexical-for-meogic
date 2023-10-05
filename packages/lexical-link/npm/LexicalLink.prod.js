/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var k=require("@lexical/utils"),n=require("lexical");let p=new Set(["http:","https:","mailto:","sms:","tel:"]);
class q extends n.ElementNode{static getType(){return"link"}static clone(a){return new q(a.__url,{rel:a.__rel,target:a.__target,title:a.__title},a.__key)}constructor(a,b={},d){super(d);let {target:l=null,rel:h=null,title:e=null}=b;this.__url=a;this.__target=l;this.__rel=h;this.__title=e}createDOM(a){let b=document.createElement("a");b.href=this.sanitizeUrl(this.__url);null!==this.__target&&(b.target=this.__target);null!==this.__rel&&(b.rel=this.__rel);null!==this.__title&&(b.title=this.__title);k.addClassNamesToElement(b,
a.theme.link);return b}updateDOM(a,b){let d=this.__url,l=this.__target,h=this.__rel,e=this.__title;d!==a.__url&&(b.href=d);l!==a.__target&&(l?b.target=l:b.removeAttribute("target"));h!==a.__rel&&(h?b.rel=h:b.removeAttribute("rel"));e!==a.__title&&(e?b.title=e:b.removeAttribute("title"));return!1}static importDOM(){return{a:()=>({conversion:r,priority:1})}}static importJSON(a){let b=t(a.url,{rel:a.rel,target:a.target,title:a.title});b.setFormat(a.format);b.setIndent(a.indent);b.setDirection(a.direction);
return b}sanitizeUrl(a){try{let b=new URL(a);if(!p.has(b.protocol))return"about:blank"}catch(b){}return a}exportJSON(){return{...super.exportJSON(),rel:this.getRel(),target:this.getTarget(),title:this.getTitle(),type:"link",url:this.getURL(),version:1}}getURL(){return this.getLatest().__url}setURL(a){this.getWritable().__url=a}getTarget(){return this.getLatest().__target}setTarget(a){this.getWritable().__target=a}getRel(){return this.getLatest().__rel}setRel(a){this.getWritable().__rel=a}getTitle(){return this.getLatest().__title}setTitle(a){this.getWritable().__title=
a}insertNewAfter(a,b=!0){a=this.getParentOrThrow().insertNewAfter(a,b);return n.$isElementNode(a)?(b=t(this.__url,{rel:this.__rel,target:this.__target,title:this.__title}),a.append(b),b):null}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(a,b){if(!n.$isRangeSelection(b))return!1;a=b.anchor.getNode();let d=b.focus.getNode();return this.isParentOf(a)&&this.isParentOf(d)&&0<b.getTextContent().length}}
function r(a){let b=null;if(k.isHTMLAnchorElement(a)){let d=a.textContent;if(null!==d&&""!==d||0<a.children.length)b=t(a.getAttribute("href")||"",{rel:a.getAttribute("rel"),target:a.getAttribute("target"),title:a.getAttribute("title")})}return{node:b}}function t(a,b){return n.$applyNodeReplacement(new q(a,b))}function v(a){return a instanceof q}
class w extends q{static getType(){return"autolink"}static clone(a){return new w(a.__url,{rel:a.__rel,target:a.__target,title:a.__title},a.__key)}static importJSON(a){let b=x(a.url,{rel:a.rel,target:a.target,title:a.title});b.setFormat(a.format);b.setIndent(a.indent);b.setDirection(a.direction);return b}static importDOM(){return null}exportJSON(){return{...super.exportJSON(),type:"autolink",version:1}}insertNewAfter(a,b=!0){a=this.getParentOrThrow().insertNewAfter(a,b);return n.$isElementNode(a)?
(b=x(this.__url,{rel:this._rel,target:this.__target,title:this.__title}),a.append(b),b):null}}function x(a,b){return n.$applyNodeReplacement(new w(a,b))}let y=n.createCommand("TOGGLE_LINK_COMMAND");function z(a,b){for(;null!==a&&null!==(a=a.getParent())&&!b(a););return a}exports.$createAutoLinkNode=x;exports.$createLinkNode=t;exports.$isAutoLinkNode=function(a){return a instanceof w};exports.$isLinkNode=v;exports.AutoLinkNode=w;exports.LinkNode=q;exports.TOGGLE_LINK_COMMAND=y;
exports.toggleLink=function(a,b={}){let {target:d,title:l}=b,h=void 0===b.rel?"noreferrer":b.rel;b=n.$getSelection();if(n.$isRangeSelection(b))if(b=b.extract(),null===a)b.forEach(m=>{m=m.getParent();if(v(m)){let c=m.getChildren();for(let f=0;f<c.length;f++)m.insertBefore(c[f]);m.remove()}});else{if(1===b.length){var e=b[0];e=v(e)?e:z(e,v);if(null!==e){e.setURL(a);void 0!==d&&e.setTarget(d);null!==h&&e.setRel(h);void 0!==l&&e.setTitle(l);return}}let m=null,c=null;b.forEach(f=>{var g=f.getParent();
if(g!==c&&null!==g&&(!n.$isElementNode(f)||f.isInline()))if(v(g))c=g,g.setURL(a),void 0!==d&&g.setTarget(d),null!==h&&c.setRel(h),void 0!==l&&c.setTitle(l);else if(g.is(m)||(m=g,c=t(a,{rel:h,target:d}),v(g)?null===f.getPreviousSibling()?g.insertBefore(c):g.insertAfter(c):f.insertBefore(c)),v(f)){if(!f.is(c)){if(null!==c){g=f.getChildren();for(let u=0;u<g.length;u++)c.append(g[u])}f.remove()}}else null!==c&&c.append(f)})}}
