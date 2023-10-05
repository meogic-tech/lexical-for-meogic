/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var r=require("lexical"),v=require("yjs"),y=require("@lexical/selection"),z=require("@lexical/offset");function A(a){let b=new URLSearchParams;b.append("code",a);for(let c=1;c<arguments.length;c++)b.append("v",arguments[c]);throw Error(`Minified Lexical error #${a}; visit https://lexical.dev/docs/error?${b} for the full message or `+"use the non-minified dev environment for full errors and additional helpful warnings.");}
class C{constructor(a,b){this._key="";this._map=a;this._parent=b;this._type="linebreak"}getNode(){let a=r.$getNodeByKey(this._key);return r.$isLineBreakNode(a)?a:null}getKey(){return this._key}getSharedType(){return this._map}getType(){return this._type}getSize(){return 1}getOffset(){return this._parent.getChildOffset(this)}destroy(a){a.collabNodeMap.delete(this._key)}}function E(a,b){b=new C(a,b);return a._collabNode=b}
class F{constructor(a,b,c,d){this._key="";this._map=a;this._parent=c;this._text=b;this._type=d;this._normalized=!1}getPrevNode(a){if(null===a)return null;a=a.get(this._key);return r.$isTextNode(a)?a:null}getNode(){let a=r.$getNodeByKey(this._key);return r.$isTextNode(a)?a:null}getSharedType(){return this._map}getType(){return this._type}getKey(){return this._key}getSize(){return this._text.length+(this._normalized?0:1)}getOffset(){return this._parent.getChildOffset(this)}spliceText(a,b,c){let d=this._parent._xmlText;
a=this.getOffset()+1+a;0!==b&&d.delete(a,b);""!==c&&d.insert(a,c)}syncPropertiesAndTextFromLexical(a,b,c){var d=this.getPrevNode(c);c=b.__text;G(a,this._map,d,b);if(null!==d&&(a=d.__text,a!==c)){d=b.__key;b=a;var e=r.$getSelection();a=c.length;r.$isRangeSelection(e)&&e.isCollapsed()&&(e=e.anchor,e.key===d&&(a=e.offset));d=b.length;let f=c.length,h=e=0;for(;e<d&&e<f&&b[e]===c[e]&&e<a;)e++;for(;h+e<d&&h+e<f&&b[d-h-1]===c[f-h-1];)h++;for(;h+e<d&&h+e<f&&b[e]===c[e];)e++;b=e;a=c.slice(e,f-h);d=d-e-h;this.spliceText(b,
d,a);this._text=c}}syncPropertiesAndTextFromYjs(a,b){let c=this.getNode();null===c&&A(84);H(a,this._map,c,b);a=this._text;c.__text!==a&&(c.getWritable().__text=a)}destroy(a){a.collabNodeMap.delete(this._key)}}function I(a,b,c,d){b=new F(a,b,c,d);return a._collabNode=b}let aa=new Set(["__key","__parent","__next","__prev"]),ba=new Set(["__first","__last","__size"]),ja=new Set(["__cachedText"]),ka=new Set(["__text"]);
function J(a,b,c){if(aa.has(a))return!0;if(r.$isTextNode(b)){if(ka.has(a))return!0}else if(r.$isElementNode(b)&&(ba.has(a)||r.$isRootNode(b)&&ja.has(a)))return!0;b=c.excludedProperties.get(b.constructor);return null!=b&&b.has(a)}function K(a){a=r.$getNodeByKey(a);null===a&&A(85);return a}
function L(a,b,c){let d=b.__type;if(r.$isElementNode(b)){var e=new v.XmlText;e=M(e,c,d);e.syncPropertiesFromLexical(a,b,null);e.syncChildrenFromLexical(a,b,null,null,null)}else r.$isTextNode(b)?(e=new v.Map,e=I(e,b.__text,c,d),e.syncPropertiesAndTextFromLexical(a,b,null)):r.$isLineBreakNode(b)?(a=new v.Map,a.set("__type","linebreak"),e=E(a,c)):r.$isDecoratorNode(b)?(e=new v.XmlElement,e=N(e,c,d),e.syncPropertiesFromLexical(a,b,null)):A(86);e._key=b.__key;return e}
function O(a,b,c){let d=b._collabNode;if(void 0===d){var e=a.editor._nodes;let f=b instanceof v.Map?b.get("__type"):b.getAttribute("__type");null==f&&A(87);void 0===e.get(f)&&A(88,f);e=b.parent;a=void 0===c&&null!==e?O(a,e):c||null;a instanceof P||A(89);if(b instanceof v.XmlText)return M(b,a,f);if(b instanceof v.Map)return"linebreak"===f?E(b,a):I(b,"",a,f);if(b instanceof v.XmlElement)return N(b,a,f)}return d}
function H(a,b,c,d){d=null===d?b instanceof v.Map?Array.from(b.keys()):Object.keys(b.getAttributes()):Array.from(d);let e;for(let h=0;h<d.length;h++){let g=d[h];if(J(g,c,a))continue;var f=c[g];let m=b instanceof v.Map?b.get(g):b.getAttribute(g);if(f!==m){if(m instanceof v.Doc){let p=a.docMap;f instanceof v.Doc&&p.delete(f.guid);f=r.createEditor();let n=m.guid;f._key=n;p.set(n,m);m=f}void 0===e&&(e=c.getWritable());e[g]=m}}}
function G(a,b,c,d){var e=d.__type,f=a.nodeProperties;let h=f.get(e);void 0===h&&(h=Object.keys(d).filter(m=>!J(m,d,a)),f.set(e,h));e=a.editor.constructor;for(f=0;f<h.length;f++){let m=h[f];var g=null===c?void 0:c[m];let p=d[m];if(g!==p){if(p instanceof e){let n=a.docMap,k;g instanceof e&&(g=g._key,k=n.get(g),n.delete(g));g=k||new v.Doc;let l=g.guid;p._key=l;n.set(l,g);p=g;a.editor.update(()=>{d.markDirty()})}b instanceof v.Map?b.set(m,p):b.setAttribute(m,p)}}}
function Q(a,b,c){let d=0,e=0,f=a._children,h=f.length;for(;e<h;e++){a=f[e];let g=d,m=a.getSize();d+=m;if((c?d>=b:d>b)&&a instanceof F)return c=b-g-1,0>c&&(c=0),{length:d-b,node:a,nodeIndex:e,offset:c};if(d>b)return{length:0,node:a,nodeIndex:e,offset:g};if(e===h-1)return{length:0,node:null,nodeIndex:e+1,offset:g+1}}return{length:0,node:null,nodeIndex:0,offset:0}}
function R(a){let b=a.anchor;a=a.focus;let c=!1;try{let d=b.getNode(),e=a.getNode();if(!d.isAttached()||!e.isAttached()||r.$isTextNode(d)&&b.offset>d.getTextContentSize()||r.$isTextNode(e)&&a.offset>e.getTextContentSize())c=!0}catch(d){c=!0}return c}function la(a,b){a.doc.transact(b,a)}function S(a,b){let c=[];for(a=a.__first;null!==a;){let d=null===b?r.$getNodeByKey(a):b.get(a);null!==d&&void 0!==d||A(101);c.push(a);a=d.__next}return c}
function T(a){var b=a.getParent();if(null!==b){let e=a.getWritable();b=b.getWritable();var c=a.getPreviousSibling();a=a.getNextSibling();if(null===c)if(null!==a){var d=a.getWritable();b.__first=a.__key;d.__prev=null}else b.__first=null;else{d=c.getWritable();if(null!==a){let f=a.getWritable();f.__prev=d.__key;d.__next=f.__key}else d.__next=null;e.__prev=null}null===a?null!==c?(a=c.getWritable(),b.__last=c.__key,a.__next=null):b.__last=null:(a=a.getWritable(),null!==c?(c=c.getWritable(),c.__next=a.__key,
a.__prev=c.__key):a.__prev=null,e.__next=null);b.__size--;e.__parent=null}}
class U{constructor(a,b,c){this._key="";this._xmlElem=a;this._parent=b;this._type=c;this._unobservers=new Set}getPrevNode(a){if(null===a)return null;a=a.get(this._key);return r.$isDecoratorNode(a)?a:null}getNode(){let a=r.$getNodeByKey(this._key);return r.$isDecoratorNode(a)?a:null}getSharedType(){return this._xmlElem}getType(){return this._type}getKey(){return this._key}getSize(){return 1}getOffset(){return this._parent.getChildOffset(this)}syncPropertiesFromLexical(a,b,c){c=this.getPrevNode(c);
G(a,this._xmlElem,c,b)}syncPropertiesFromYjs(a,b){let c=this.getNode();null===c&&A(83);H(a,this._xmlElem,c,b)}destroy(a){a.collabNodeMap.delete(this._key);this._unobservers.forEach(b=>b());this._unobservers.clear()}}function N(a,b,c){b=new U(a,b,c);return a._collabNode=b}
class P{constructor(a,b,c){this._key="";this._children=[];this._xmlText=a;this._type=c;this._parent=b}getPrevNode(a){if(null===a)return null;a=a.get(this._key);return r.$isElementNode(a)?a:null}getNode(){let a=r.$getNodeByKey(this._key);return r.$isElementNode(a)?a:null}getSharedType(){return this._xmlText}getType(){return this._type}getKey(){return this._key}isEmpty(){return 0===this._children.length}getSize(){return 1}getOffset(){let a=this._parent;null===a&&A(90);return a.getChildOffset(this)}syncPropertiesFromYjs(a,
b){let c=this.getNode();null===c&&A(91);H(a,this._xmlText,c,b)}applyChildrenYjsDelta(a,b){let c=this._children,d=0;for(let n=0;n<b.length;n++){var e=b[n],f=e.insert,h=e.delete;if(null!=e.retain)d+=e.retain;else if("number"===typeof h)for(f=h;0<f;){let {node:k,nodeIndex:l,offset:q,length:u}=Q(this,d,!1);if(k instanceof P||k instanceof C||k instanceof U)c.splice(l,1),--f;else if(k instanceof F){e=Math.min(f,u);h=0!==l?c[l-1]:null;var g=k.getSize();if(0===q&&1===e&&0<l&&h instanceof F&&u===g&&0===Array.from(k._map.keys()).length)h._text+=
k._text,c.splice(l,1);else if(0===q&&e===g)c.splice(l,1);else{h=k;g=k._text;var m=q,p=e;g=g.slice(0,m)+""+g.slice(m+p);h._text=g}f-=e}else break}else if(null!=f)if("string"===typeof f){let {node:k,offset:l}=Q(this,d,!0);k instanceof F?(e=k,h=k._text,g=l,m=f,h=h.slice(0,g)+m+h.slice(g+0),e._text=h):this._xmlText.delete(l,f.length);d+=f.length}else e=f,{nodeIndex:f}=Q(this,d,!1),e=O(a,e,this),c.splice(f,0,e),d+=1;else throw Error("Unexpected delta format");}}syncChildrenFromYjs(a){var b=this.getNode();
null===b&&A(92);var c=b.__key;let d=S(b,null),e=d.length;var f=this._children;let h=f.length,g=a.collabNodeMap,m=new Set,p;let n=0;var k=null;h!==e&&b.getWritable();for(let x=0;x<h;x++){var l=d[n],q=f[x];var u=q.getNode();var t=q._key;if(null!==u&&l===t)k=r.$isTextNode(u),m.add(l),k&&(q._key=l,q instanceof P?(k=q._xmlText,q.syncPropertiesFromYjs(a,null),q.applyChildrenYjsDelta(a,k.toDelta()),q.syncChildrenFromYjs(a)):q instanceof F?q.syncPropertiesAndTextFromYjs(a,null):q instanceof U?q.syncPropertiesFromYjs(a,
null):q instanceof C||A(93)),k=u,n++;else{if(void 0===p)for(p=new Set,t=0;t<h;t++){var w=f[t]._key;""!==w&&p.add(w)}if(null!==u&&void 0!==l&&!p.has(l)){q=K(l);T(q);x--;n++;continue}u=b.getWritable();l=a;t=q;w=c;var B=t.getType();let D=l.editor._nodes.get(B);void 0===D&&A(88,B);B=new D.klass;B.__parent=w;t._key=B.__key;t instanceof P?(w=t._xmlText,t.syncPropertiesFromYjs(l,null),t.applyChildrenYjsDelta(l,w.toDelta()),t.syncChildrenFromYjs(l)):t instanceof F?t.syncPropertiesAndTextFromYjs(l,null):t instanceof
U&&t.syncPropertiesFromYjs(l,null);l.collabNodeMap.set(B.__key,t);l=B;t=l.__key;g.set(t,q);null===k?(k=u.getFirstChild(),u.__first=t,null!==k&&(k=k.getWritable(),k.__prev=t,l.__next=k.__key)):(q=k.getWritable(),w=k.getNextSibling(),q.__next=t,l.__prev=k.__key,null!==w&&(k=w.getWritable(),k.__prev=t,l.__next=k.__key));x===h-1&&(u.__last=t);u.__size++;k=l}}for(b=0;b<e;b++)f=d[b],m.has(f)||(c=K(f),f=a.collabNodeMap.get(f),void 0!==f&&f.destroy(a),T(c))}syncPropertiesFromLexical(a,b,c){G(a,this._xmlText,
this.getPrevNode(c),b)}_syncChildFromLexical(a,b,c,d,e,f){b=this._children[b];c=K(c);b instanceof P&&r.$isElementNode(c)?(b.syncPropertiesFromLexical(a,c,d),b.syncChildrenFromLexical(a,c,d,e,f)):b instanceof F&&r.$isTextNode(c)?b.syncPropertiesAndTextFromLexical(a,c,d):b instanceof U&&r.$isDecoratorNode(c)&&b.syncPropertiesFromLexical(a,c,d)}syncChildrenFromLexical(a,b,c,d,e){var f=this.getPrevNode(c);let h=null===f?[]:S(f,c);f=S(b,null);let g=h.length-1,m=f.length-1,p=a.collabNodeMap,n,k,l=0;for(b=
0;l<=g&&b<=m;){var q=h[l];let t=f[b];if(q===t)this._syncChildFromLexical(a,b,t,c,d,e),l++,b++;else{void 0===n&&(n=new Set(h));void 0===k&&(k=new Set(f));var u=k.has(q);q=n.has(t);u?(u=K(t),u=L(a,u,this),p.set(t,u),q?(this.splice(a,b,1,u),l++):this.splice(a,b,0,u),b++):(this.splice(a,b,1),l++)}}c=l>g;d=b>m;if(c&&!d)for(;b<=m;++b)c=f[b],d=K(c),d=L(a,d,this),this.append(d),p.set(c,d);else if(d&&!c)for(f=this._children.length-1;f>=b;f--)this.splice(a,f,1)}append(a){let b=this._xmlText;var c=this._children;
c=c[c.length-1];c=void 0!==c?c.getOffset()+c.getSize():0;if(a instanceof P)b.insertEmbed(c,a._xmlText);else if(a instanceof F){let d=a._map;null===d.parent&&b.insertEmbed(c,d);b.insert(c+1,a._text)}else a instanceof C?b.insertEmbed(c,a._map):a instanceof U&&b.insertEmbed(c,a._xmlElem);this._children.push(a)}splice(a,b,c,d){let e=this._children;var f=e[b];if(void 0===f)void 0===d&&A(94),this.append(d);else{var h=f.getOffset();-1===h&&A(95);var g=this._xmlText;0!==c&&g.delete(h,f.getSize());d instanceof
P?g.insertEmbed(h,d._xmlText):d instanceof F?(f=d._map,null===f.parent&&g.insertEmbed(h,f),g.insert(h+1,d._text)):d instanceof C?g.insertEmbed(h,d._map):d instanceof U&&g.insertEmbed(h,d._xmlElem);if(0!==c)for(h=e.slice(b,b+c),g=0;g<h.length;g++)h[g].destroy(a);void 0!==d?e.splice(b,c,d):e.splice(b,c)}}getChildOffset(a){let b=0,c=this._children;for(let d=0;d<c.length;d++){let e=c[d];if(e===a)return b;b+=e.getSize()}return-1}destroy(a){let b=a.collabNodeMap,c=this._children;for(let d=0;d<c.length;d++)c[d].destroy(a);
b.delete(this._key)}}function M(a,b,c){b=new P(a,b,c);return a._collabNode=b}
function V(a,b){var c=b.collabNodeMap.get(a.key);if(void 0===c)return null;b=a.offset;let d=c.getSharedType();if(c instanceof F){d=c._parent._xmlText;a=c.getOffset();if(-1===a)return null;b=a+1+b}else if(c instanceof P&&"element"===a.type){let e=c=0;for(a=a.getNode().getFirstChild();null!==a&&e++<b;)r.$isTextNode(a)?c+=a.getTextContentSize()+1:c++,a=a.getNextSibling();b=c}return v.createRelativePositionFromTypeIndex(d,b)}
function W(a,b){if(null==a){if(null!=b)return!0}else if(null==b||!v.compareRelativePositions(a,b))return!0;return!1}function X(a,b){a=a.cursorsContainer;if(null!==a){b=b.selections;let c=b.length;for(let d=0;d<c;d++)a.removeChild(b[d])}}
function Y(a,b){var c=b.awareness.getLocalState();if(null!==c&&(b=c.anchorPos,c=c.focusPos,null!==b&&null!==c&&(b=v.createAbsolutePositionFromRelativePosition(b,a.doc),a=v.createAbsolutePositionFromRelativePosition(c,a.doc),null!==b&&null!==a))){let [d,e]=Z(b.type,b.index),[f,h]=Z(a.type,a.index);if(null!==d&&null!==f){b=d.getKey();c=f.getKey();let g=r.$getSelection();r.$isRangeSelection(g)&&(a=g.focus,ma(g.anchor,b,e),ma(a,c,h))}}}
function ma(a,b,c){if(a.key!==b||a.offset!==c){let d=r.$getNodeByKey(b);if(null!==d&&!r.$isElementNode(d)&&!r.$isTextNode(d)){let e=d.getParentOrThrow();b=e.getKey();c=d.getIndexWithinParent();d=e}a.set(b,c,r.$isElementNode(d)?"element":"text")}}function Z(a,b){a=a._collabNode;if(void 0===a)return[null,0];if(a instanceof P){let {node:c,offset:d}=Q(a,b,!0);return null===c?[a,0]:[c,d]}return[null,0]}
function na(a,b){var c=Array.from(b.awareness.getStates()),d=a.clientID;b=a.cursors;var e=a.editor._editorState._nodeMap;let f=new Set;for(var h=0;h<c.length;h++){let [D,pa]=c[h];if(D!==d){f.add(D);let {anchorPos:ca,focusPos:da,name:qa,color:ra,focusing:sa}=pa;var g=null,m=b.get(D);void 0===m&&(m={color:ra,name:qa,selection:null},b.set(D,m));if(null!==ca&&null!==da&&sa){var p=v.createAbsolutePositionFromRelativePosition(ca,a.doc),n=v.createAbsolutePositionFromRelativePosition(da,a.doc);if(null!==
p&&null!==n){let [ea,fa]=Z(p.type,p.index),[ha,ia]=Z(n.type,n.index);if(null!==ea&&null!==ha){p=ea.getKey();var k=ha.getKey();g=m.selection;if(null===g){g=m;n=fa;var l=ia,q=g.color,u=document.createElement("span");u.style.cssText=`position:absolute;top:0;bottom:0;right:-1px;width:1px;background-color:${q};z-index:10;`;var t=document.createElement("span");t.textContent=g.name;t.style.cssText=`position:absolute;left:-2px;top:-16px;background-color:${q};color:#fff;line-height:12px;font-size:12px;padding:2px;font-family:Arial;font-weight:bold;white-space:nowrap;`;
u.appendChild(t);g={anchor:{key:p,offset:n},caret:u,color:q,focus:{key:k,offset:l},name:t,selections:[]}}else n=g.anchor,l=g.focus,n.key=p,n.offset=fa,l.key=k,l.offset=ia}}}a:if(p=a,n=m,u=g,q=e,l=p.editor,g=l.getRootElement(),m=p.cursorsContainer,null!==m&&null!==g&&(g=m.offsetParent,null!==g))if(g=g.getBoundingClientRect(),k=n.selection,null===u)null!==k&&(n.selection=null,X(p,k));else{n.selection=u;n=u.caret;k=u.color;p=u.selections;t=u.anchor;u=u.focus;var w=t.key,B=u.key,x=q.get(w);q=q.get(B);
if(null!=x&&null!=q){if(x===q&&r.$isLineBreakNode(x))q=[l.getElementByKey(w).getBoundingClientRect()];else{q=y.createDOMRange(l,x,t.offset,q,u.offset);if(null===q)break a;q=y.createRectsFromDOMRange(l,q)}u=p.length;l=q.length;for(t=0;t<l;t++)x=q[t],w=p[t],void 0===w&&(w=document.createElement("span"),p[t]=w,B=document.createElement("span"),w.appendChild(B),m.appendChild(w)),x=`position:absolute;top:${x.top-g.top}px;left:${x.left-g.left}px;height:${x.height}px;width:${x.width}px;pointer-events:none;z-index:5;`,
w.style.cssText=x,w.firstChild.style.cssText=`${x}left:0;top:0;background-color:${k};opacity:0.3;`,t===l-1&&n.parentNode!==w&&w.appendChild(n);for(g=u-1;g>=l;g--)m.removeChild(p[g]),p.pop()}}}}c=Array.from(b.keys());for(d=0;d<c.length;d++)e=c[d],f.has(e)||(h=b.get(e),void 0!==h&&(h=h.selection,null!==h&&X(a,h),b.delete(e)))}
function oa(a,b,c,d){b=b.awareness;var e=b.getLocalState();if(null!==e){var {anchorPos:f,focusPos:h,name:g,color:m,focusing:p,awarenessData:n}=e,k=e=null;if(null!==d&&(null===f||d.is(c))||null!==c)r.$isRangeSelection(d)&&(e=V(d.anchor,a),k=V(d.focus,a)),(W(f,e)||W(h,k))&&b.setLocalState({anchorPos:e,awarenessData:n,color:m,focusPos:k,focusing:p,name:g})}}let ta=r.createCommand("CONNECTED_COMMAND"),ua=r.createCommand("TOGGLE_CONNECT_COMMAND");exports.CONNECTED_COMMAND=ta;
exports.TOGGLE_CONNECT_COMMAND=ua;exports.createBinding=function(a,b,c,d,e,f){void 0!==d&&null!==d||A(81);b=d.get("root",v.XmlText);b=M(b,null,"root");b._key="root";return{clientID:d.clientID,collabNodeMap:new Map,cursors:new Map,cursorsContainer:null,doc:d,docMap:e,editor:a,excludedProperties:f||new Map,id:c,nodeProperties:new Map,root:b}};exports.createUndoManager=function(a,b){return new v.UndoManager(b,{trackedOrigins:new Set([a,null])})};
exports.initLocalState=function(a,b,c,d,e){a.awareness.setLocalState({anchorPos:null,awarenessData:e,color:c,focusPos:null,focusing:d,name:b})};exports.setLocalStateFocus=function(a,b,c,d,e){({awareness:a}=a);let f=a.getLocalState();null===f&&(f={anchorPos:null,awarenessData:e,color:c,focusPos:null,focusing:d,name:b});f.focusing=d;a.setLocalState(f)};exports.syncCursorPositions=na;
exports.syncLexicalUpdateToYjs=function(a,b,c,d,e,f,h,g){la(a,()=>{d.read(()=>{if(g.has("collaboration")||g.has("historic")){if(0<h.size){var m=Array.from(h),p=a.collabNodeMap,n=[];for(let u=0;u<m.length;u++){var k=m[u],l=r.$getNodeByKey(k),q=p.get(k);if(q instanceof F)if(r.$isTextNode(l))n.push([q,l.__text]);else{l=q.getOffset();if(-1===l)continue;let t=q._parent;q._normalized=!0;t._xmlText.delete(l,1);p.delete(k);k=t._children;q=k.indexOf(q);k.splice(q,1)}}for(m=0;m<n.length;m++){let [u,t]=n[m];
u instanceof F&&"string"===typeof t&&(u._text=t)}}}else e.has("root")&&(n=c._nodeMap,m=r.$getRoot(),p=a.root,p.syncPropertiesFromLexical(a,m,n),p.syncChildrenFromLexical(a,m,n,e,f)),n=r.$getSelection(),oa(a,b,c._selection,n)})})};
exports.syncYjsChangesToLexical=function(a,b,c,d){let e=a.editor,f=e._editorState;c.forEach(h=>h.delta);e.update(()=>{var h=e._pendingEditorState;for(var g=0;g<c.length;g++){var m=a,p=c[g],{target:n}=p;n=O(m,n);if(n instanceof P&&p instanceof v.YTextEvent){let {keysChanged:k,childListChanged:l,delta:q}=p;0<k.size&&n.syncPropertiesFromYjs(m,k);l&&(n.applyChildrenYjsDelta(m,q),n.syncChildrenFromYjs(m))}else n instanceof F&&p instanceof v.YMapEvent?({keysChanged:p}=p,0<p.size&&n.syncPropertiesAndTextFromYjs(m,
p)):n instanceof U&&p instanceof v.YXmlEvent?({attributesChanged:p}=p,0<p.size&&n.syncPropertiesFromYjs(m,p)):A(82)}g=r.$getSelection();if(r.$isRangeSelection(g))if(R(g)){m=f._selection;if(r.$isRangeSelection(m)){n=z.$createOffsetView(e,0,f);h=z.$createOffsetView(e,0,h);let [k,l]=n.getOffsetsFromSelection(m);h=0<=k&&0<=l?h.createSelectionFromOffsets(k,l,n):null;null!==h?r.$setSelection(h):(Y(a,b),R(g)&&(h=r.$getRoot(),0===h.getChildrenSize()&&h.append(r.$createParagraphNode()),r.$getRoot().selectEnd()))}oa(a,
b,m,r.$getSelection())}else Y(a,b)},{onUpdate:()=>{na(a,b)},skipTransforms:!0,tag:d?"historic":"collaboration"})}
