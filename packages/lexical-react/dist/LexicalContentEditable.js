/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var d=require("@lexical/react/LexicalComposerContext"),k=require("react");function n(){n=Object.assign?Object.assign.bind():function(h){for(var e=1;e<arguments.length;e++){var f=arguments[e],b;for(b in f)Object.prototype.hasOwnProperty.call(f,b)&&(h[b]=f[b])}return h};return n.apply(this,arguments)}var p="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?k.useLayoutEffect:k.useEffect;
exports.ContentEditable=function({ariaActiveDescendant:h,ariaAutoComplete:e,ariaControls:f,ariaDescribedBy:b,ariaExpanded:q,ariaLabel:r,ariaLabelledBy:t,ariaMultiline:u,ariaOwns:v,ariaRequired:w,autoCapitalize:x,className:y,id:z,role:l="textbox",spellCheck:A=!0,style:B,tabIndex:C,"data-testid":D,...E}){let [g]=d.useLexicalComposerContext(),[a,m]=k.useState(!1),F=k.useCallback(c=>{c&&c.ownerDocument&&c.ownerDocument.defaultView&&g.setRootElement(c)},[g]);p(()=>{m(g.isEditable());return g.registerEditableListener(c=>
{m(c)})},[g]);return k.createElement("div",n({},E,{"aria-activedescendant":a?h:void 0,"aria-autocomplete":a?e:"none","aria-controls":a?f:void 0,"aria-describedby":b,"aria-expanded":a?"combobox"===l?!!q:void 0:void 0,"aria-label":r,"aria-labelledby":t,"aria-multiline":u,"aria-owns":a?v:void 0,"aria-readonly":a?void 0:!0,"aria-required":w,autoCapitalize:x,className:y,contentEditable:a,"data-testid":D,id:z,ref:F,role:l,spellCheck:A,style:B,tabIndex:C}))}
