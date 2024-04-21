/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var c=require("@lexical/clipboard"),g=require("@lexical/selection"),h=require("@lexical/utils"),k=require("lexical");function l(b,a){return"undefined"!==typeof document.caretRangeFromPoint?(b=document.caretRangeFromPoint(b,a),null===b?null:{node:b.startContainer,offset:b.startOffset}):"undefined"!==document.caretPositionFromPoint?(b=document.caretPositionFromPoint(b,a),null===b?null:{node:b.offsetNode,offset:b.offset}):null}
let n="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,p=n&&"documentMode"in document?document.documentMode:null;n&&/Mac|iPod|iPhone|iPad/.test(navigator.platform);n&&/^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);let q=n&&"InputEvent"in window&&!p?"getTargetRanges"in new window.InputEvent("input"):!1,r=n&&/Version\/[\d.]+.*Safari/.test(navigator.userAgent),t=n&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;
n&&/Android/.test(navigator.userAgent);let u=n&&/^(?=.*Chrome).*/i.test(navigator.userAgent),v=n&&/AppleWebKit\/[\d.]+/.test(navigator.userAgent)&&!u,w=k.createCommand("DRAG_DROP_PASTE_FILE");
class x extends k.ElementNode{static getType(){return"quote"}static clone(b){return new x(b.__key)}constructor(b){super(b)}createDOM(b){let a=document.createElement("blockquote");h.addClassNamesToElement(a,b.theme.quote);return a}updateDOM(){return!1}static importDOM(){return{blockquote:()=>({conversion:y,priority:0})}}exportDOM(b){({element:b}=super.exportDOM(b));if(b&&h.isHTMLElement(b)){this.isEmpty()&&b.append(document.createElement("br"));var a=this.getFormatType();b.style.textAlign=a;if(a=this.getDirection())b.dir=
a}return{element:b}}static importJSON(b){let a=z();a.setFormat(b.format);a.setIndent(b.indent);a.setDirection(b.direction);return a}exportJSON(){return{...super.exportJSON(),type:"quote"}}insertNewAfter(b,a){b=k.$createParagraphNode();let d=this.getDirection();b.setDirection(d);this.insertAfter(b,a);return b}collapseAtStart(){let b=k.$createParagraphNode();this.getChildren().forEach(a=>b.append(a));this.replace(b);return!0}}function z(){return k.$applyNodeReplacement(new x)}
class B extends k.ElementNode{static getType(){return"heading"}static clone(b){return new B(b.__tag,b.__key)}constructor(b,a){super(a);this.__tag=b}getTag(){return this.__tag}createDOM(b){let a=this.__tag,d=document.createElement(a);b=b.theme.heading;void 0!==b&&h.addClassNamesToElement(d,b[a]);return d}updateDOM(){return!1}static importDOM(){return{h1:()=>({conversion:C,priority:0}),h2:()=>({conversion:C,priority:0}),h3:()=>({conversion:C,priority:0}),h4:()=>({conversion:C,priority:0}),h5:()=>({conversion:C,
priority:0}),h6:()=>({conversion:C,priority:0}),p:b=>{b=b.firstChild;return null!==b&&D(b)?{conversion:()=>({node:null}),priority:3}:null},span:b=>D(b)?{conversion:()=>({node:E("h1")}),priority:3}:null}}exportDOM(b){({element:b}=super.exportDOM(b));if(b&&h.isHTMLElement(b)){this.isEmpty()&&b.append(document.createElement("br"));var a=this.getFormatType();b.style.textAlign=a;if(a=this.getDirection())b.dir=a}return{element:b}}static importJSON(b){let a=E(b.tag);a.setFormat(b.format);a.setIndent(b.indent);
a.setDirection(b.direction);return a}exportJSON(){return{...super.exportJSON(),tag:this.getTag(),type:"heading",version:1}}insertNewAfter(b,a=!0){let d=b?b.anchor.offset:0,e=d!==this.getTextContentSize()&&b?E(this.getTag()):k.$createParagraphNode(),f=this.getDirection();e.setDirection(f);this.insertAfter(e,a);0===d&&!this.isEmpty()&&b&&(b=k.$createParagraphNode(),b.select(),this.replace(b,!0));return e}collapseAtStart(){let b=this.isEmpty()?k.$createParagraphNode():E(this.getTag());this.getChildren().forEach(a=>
b.append(a));this.replace(b);return!0}extractWithChild(){return!0}}function D(b){return"span"===b.nodeName.toLowerCase()?"26pt"===b.style.fontSize:!1}function C(b){let a=b.nodeName.toLowerCase(),d=null;if("h1"===a||"h2"===a||"h3"===a||"h4"===a||"h5"===a||"h6"===a)d=E(a),null!==b.style&&d.setFormat(b.style.textAlign);return{node:d}}function y(b){let a=z();null!==b.style&&a.setFormat(b.style.textAlign);return{node:a}}function E(b){return k.$applyNodeReplacement(new B(b))}
function F(b,a){b.preventDefault();a.update(()=>{let d=k.$getSelection(),e=b instanceof InputEvent||b instanceof KeyboardEvent?null:b.clipboardData;null!=e&&k.$INTERNAL_isPointSelection(d)&&c.$insertDataTransferForRichText(e,d,a)},{tag:"paste"})}async function G(b,a){await c.copyToClipboard(a,h.objectKlassEquals(b,ClipboardEvent)?b:null);a.update(()=>{let d=k.$getSelection();k.$isRangeSelection(d)?d.removeText():k.$isNodeSelection(d)&&d.getNodes().forEach(e=>e.remove())})}
function H(b){let a=null;b instanceof DragEvent?a=b.dataTransfer:b instanceof ClipboardEvent&&(a=b.clipboardData);if(null===a)return[!1,[],!1];var d=a.types;b=d.includes("Files");d=d.includes("text/html")||d.includes("text/plain");return[b,Array.from(a.files),d]}
function I(b){var a=k.$getSelection();if(!k.$isRangeSelection(a))return!1;let d=new Set;a=a.getNodes();for(let m=0;m<a.length;m++){var e=a[m],f=e.getKey();d.has(f)||(e=h.$getNearestBlockElementAncestorOrThrow(e),f=e.getKey(),e.canIndent()&&!d.has(f)&&(d.add(f),b(e)))}return 0<d.size}function J(b){b=k.$getNearestNodeFromDOMNode(b);return k.$isDecoratorNode(b)}exports.$createHeadingNode=E;exports.$createQuoteNode=z;exports.$isHeadingNode=function(b){return b instanceof B};
exports.$isQuoteNode=function(b){return b instanceof x};exports.DRAG_DROP_PASTE=w;exports.HeadingNode=B;exports.QuoteNode=x;exports.eventFiles=H;
exports.registerRichText=function(b){return h.mergeRegister(b.registerCommand(k.CLICK_COMMAND,()=>{const a=k.$getSelection();return k.$isNodeSelection(a)?(a.clear(),!0):!1},0),b.registerCommand(k.DELETE_CHARACTER_COMMAND,a=>{const d=k.$getSelection();if(!k.$isRangeSelection(d))return!1;d.deleteCharacter(a);return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.DELETE_WORD_COMMAND,a=>{const d=k.$getSelection();if(!k.$isRangeSelection(d))return!1;d.deleteWord(a);return!0},k.COMMAND_PRIORITY_EDITOR),
b.registerCommand(k.DELETE_LINE_COMMAND,a=>{const d=k.$getSelection();if(!k.$isRangeSelection(d))return!1;d.deleteLine(a);return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.CONTROLLED_TEXT_INSERTION_COMMAND,a=>{const d=k.$getSelection();if("string"===typeof a)k.$INTERNAL_isPointSelection(d)&&d.insertText(a);else{if(!k.$INTERNAL_isPointSelection(d))return!1;const e=a.dataTransfer;null!=e?c.$insertDataTransferForRichText(e,d,b):k.$isRangeSelection(d)&&(a=a.data)&&d.insertText(a)}return!0},k.COMMAND_PRIORITY_EDITOR),
b.registerCommand(k.REMOVE_TEXT_COMMAND,()=>{const a=k.$getSelection();if(!k.$isRangeSelection(a))return!1;a.removeText();return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.FORMAT_TEXT_COMMAND,a=>{const d=k.$getSelection();if(!k.$isRangeSelection(d))return!1;d.formatText(a);return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.FORMAT_ELEMENT_COMMAND,a=>{var d=k.$getSelection();if(!k.$isRangeSelection(d)&&!k.$isNodeSelection(d))return!1;d=d.getNodes();for(const e of d)d=h.$findMatchingParent(e,
f=>k.$isElementNode(f)&&!f.isInline()),null!==d&&d.setFormat(a);return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.INSERT_LINE_BREAK_COMMAND,a=>{const d=k.$getSelection();if(!k.$isRangeSelection(d))return!1;d.insertLineBreak(a);return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.INSERT_PARAGRAPH_COMMAND,()=>{const a=k.$getSelection();if(!k.$isRangeSelection(a))return!1;a.insertParagraph();return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.INSERT_TAB_COMMAND,()=>{k.$insertNodes([k.$createTabNode()]);
return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.INDENT_CONTENT_COMMAND,()=>I(a=>{const d=a.getIndent();a.setIndent(d+1)}),k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.OUTDENT_CONTENT_COMMAND,()=>I(a=>{const d=a.getIndent();0<d&&a.setIndent(d-1)}),k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.KEY_ARROW_UP_COMMAND,a=>{var d=k.$getSelection();if(k.$isNodeSelection(d)&&!J(a.target)){if(a=d.getNodes(),0<a.length)return a[0].selectPrevious(),!0}else if(k.$isRangeSelection(d)&&(d=k.$getAdjacentNode(d.focus,
!0),!a.shiftKey&&k.$isDecoratorNode(d)&&!d.isIsolated()&&!d.isInline()))return d.selectPrevious(),a.preventDefault(),!0;return!1},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.KEY_ARROW_DOWN_COMMAND,a=>{var d=k.$getSelection();if(k.$isNodeSelection(d)){if(a=d.getNodes(),0<a.length)return a[0].selectNext(0,0),!0}else if(k.$isRangeSelection(d)){let e=d.focus;if("root"===e.key&&e.offset===k.$getRoot().getChildrenSize())return a.preventDefault(),!0;d=k.$getAdjacentNode(d.focus,!1);if(!a.shiftKey&&k.$isDecoratorNode(d)&&
!d.isIsolated()&&!d.isInline())return d.selectNext(),a.preventDefault(),!0}return!1},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.KEY_ARROW_LEFT_COMMAND,a=>{const d=k.$getSelection();if(k.$isNodeSelection(d)){var e=d.getNodes();if(0<e.length)return a.preventDefault(),e[0].selectPrevious(),!0}return k.$isRangeSelection(d)?g.$shouldOverrideDefaultCharacterSelection(d,!0)?(e=a.shiftKey,a.preventDefault(),g.$moveCharacter(d,e,!0),!0):!1:!1},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.KEY_ARROW_RIGHT_COMMAND,
a=>{const d=k.$getSelection();if(k.$isNodeSelection(d)&&!J(a.target)){var e=d.getNodes();if(0<e.length)return a.preventDefault(),e[0].selectNext(0,0),!0}if(!k.$isRangeSelection(d))return!1;e=a.shiftKey;return g.$shouldOverrideDefaultCharacterSelection(d,!1)?(a.preventDefault(),g.$moveCharacter(d,e,!1),!0):!1},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.KEY_BACKSPACE_COMMAND,a=>{if(J(a.target))return!1;const d=k.$getSelection();if(!k.$isRangeSelection(d))return!1;a.preventDefault();({anchor:a}=
d);const e=a.getNode();return d.isCollapsed()&&0===a.offset&&!k.$isRootNode(e)&&0<h.$getNearestBlockElementAncestorOrThrow(e).getIndent()?b.dispatchCommand(k.OUTDENT_CONTENT_COMMAND,void 0):b.dispatchCommand(k.DELETE_CHARACTER_COMMAND,!0)},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.KEY_DELETE_COMMAND,a=>{if(J(a.target))return!1;const d=k.$getSelection();if(!k.$isRangeSelection(d))return!1;a.preventDefault();return b.dispatchCommand(k.DELETE_CHARACTER_COMMAND,!1)},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.KEY_ENTER_COMMAND,
a=>{const d=k.$getSelection();if(!k.$isRangeSelection(d))return!1;if(null!==a){if((t||r||v)&&q)return!1;a.preventDefault();if(a.shiftKey)return b.dispatchCommand(k.INSERT_LINE_BREAK_COMMAND,!1)}return b.dispatchCommand(k.INSERT_PARAGRAPH_COMMAND,void 0)},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.KEY_ESCAPE_COMMAND,()=>{const a=k.$getSelection();if(!k.$isRangeSelection(a))return!1;b.blur();return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.DROP_COMMAND,a=>{const [,d]=H(a);if(0<d.length){var e=
l(a.clientX,a.clientY);if(null!==e){const {offset:m,node:K}=e;var f=k.$getNearestNodeFromDOMNode(K);if(null!==f){e=k.$createRangeSelection();if(k.$isTextNode(f))e.anchor.set(f.getKey(),m,"text"),e.focus.set(f.getKey(),m,"text");else{const A=f.getParentOrThrow().getKey();f=f.getIndexWithinParent()+1;e.anchor.set(A,f,"element");e.focus.set(A,f,"element")}e=k.$normalizeSelection__EXPERIMENTAL(e);k.$setSelection(e)}b.dispatchCommand(w,d)}a.preventDefault();return!0}a=k.$getSelection();return k.$isRangeSelection(a)?
!0:!1},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.DRAGSTART_COMMAND,a=>{[a]=H(a);const d=k.$getSelection();return a&&!k.$isRangeSelection(d)?!1:!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.DRAGOVER_COMMAND,a=>{var [d]=H(a);const e=k.$getSelection();if(d&&!k.$isRangeSelection(e))return!1;d=l(a.clientX,a.clientY);null!==d&&(d=k.$getNearestNodeFromDOMNode(d.node),k.$isDecoratorNode(d)&&a.preventDefault());return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.SELECT_ALL_COMMAND,()=>{k.$selectAll();
return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.COPY_COMMAND,a=>{c.copyToClipboard(b,h.objectKlassEquals(a,ClipboardEvent)?a:null);return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.CUT_COMMAND,a=>{G(a,b);return!0},k.COMMAND_PRIORITY_EDITOR),b.registerCommand(k.PASTE_COMMAND,a=>{const [,d,e]=H(a);if(0<d.length&&!e)return b.dispatchCommand(w,d),!0;if(k.isSelectionCapturedInDecoratorInput(a.target))return!1;const f=k.$getSelection();return k.$INTERNAL_isPointSelection(f)?(F(a,b),!0):
!1},k.COMMAND_PRIORITY_EDITOR))}
