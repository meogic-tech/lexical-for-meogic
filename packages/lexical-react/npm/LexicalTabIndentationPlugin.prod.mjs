/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{useLexicalComposerContext as e}from"@lexical/react/LexicalComposerContext";import{$filter as t,$getNearestBlockElementAncestorOrThrow as n}from"@lexical/utils";import{KEY_TAB_COMMAND as r,$getSelection as o,$isRangeSelection as c,OUTDENT_CONTENT_COMMAND as i,INDENT_CONTENT_COMMAND as s,INSERT_TAB_COMMAND as l,COMMAND_PRIORITY_EDITOR as f,$isBlockElementNode as u,$createRangeSelection as a,$normalizeSelection__EXPERIMENTAL as m}from"lexical";import{useEffect as d}from"react";function p(e){return e.registerCommand(r,(r=>{const f=o();if(!c(f))return!1;r.preventDefault();const d=function(e){const r=e.getNodes();if(t(r,(e=>u(e)&&e.canIndent()?e:null)).length>0)return!0;const o=e.anchor,c=e.focus,i=c.isBefore(o)?c:o,s=i.getNode(),l=n(s);if(l.canIndent()){const e=l.getKey();let t=a();if(t.anchor.set(e,0,"element"),t.focus.set(e,0,"element"),t=m(t),t.anchor.is(i))return!0}return!1}(f)?r.shiftKey?i:s:l;return e.dispatchCommand(d,void 0)}),f)}function h(){const[t]=e();return d((()=>p(t))),null}export{h as TabIndentationPlugin,p as registerTabIndentation};
