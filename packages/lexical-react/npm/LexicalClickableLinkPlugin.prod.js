/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var e=require("@lexical/link"),n=require("@lexical/react/LexicalComposerContext"),r=require("@lexical/utils"),t=require("lexical"),u=require("react");
module.exports=function({newTab:p=!0,disabled:h=!1}){let [k]=n.useLexicalComposerContext();u.useEffect(()=>{let m=a=>{if(h)a.preventDefault();else{var c=a.target;if(c instanceof Node){var d=t.getNearestEditorFromDOMNode(c);if(null!==d){var f=null,l=null;d.update(()=>{var b=t.$getNearestNodeFromDOMNode(c);if(null!==b)if(b=r.$findMatchingParent(b,t.$isElementNode),e.$isLinkNode(b))f=b.sanitizeUrl(b.getURL()),l=b.getTarget();else{a:{b=r.isHTMLAnchorElement;let g=c;for(;null!=g;){if(b(g)){b=g;break a}g=
g.parentNode}b=null}null!==b&&(f=b.href,l=b.target)}});if(null!==f&&""!==f){d=k.getEditorState().read(t.$getSelection);if(!t.$isRangeSelection(d)||d.isCollapsed())d="auxclick"===a.type&&1===a.button,window.open(f,p||d||a.metaKey||a.ctrlKey||"_blank"===l?"_blank":"_self");a.preventDefault()}}}}},q=a=>{h||1!==a.button||m(a)};return k.registerRootListener((a,c)=>{null!==c&&(c.removeEventListener("click",m),c.removeEventListener("mouseup",q));null!==a&&(a.addEventListener("click",m),a.addEventListener("mouseup",
q))})},[k,p,h]);return null}
