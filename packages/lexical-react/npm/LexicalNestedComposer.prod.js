/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var d=require("@lexical/react/LexicalCollaborationContext"),k=require("@lexical/react/LexicalComposerContext"),q=require("react");function r(a){let h=new URLSearchParams;h.append("code",a);for(let e=1;e<arguments.length;e++)h.append("v",arguments[e]);throw Error(`Minified Lexical error #${a}; visit https://lexical.dev/docs/error?${h} for the full message or `+"use the non-minified dev environment for full errors and additional helpful warnings.");}
exports.LexicalNestedComposer=function({initialEditor:a,children:h,initialNodes:e,initialTheme:t,skipCollabChecks:u}){let p=q.useRef(!1),l=q.useContext(k.LexicalComposerContext);null==l&&r(9);let [f,{getTheme:v}]=l,y=q.useMemo(()=>{var b=t||v()||void 0;const w=k.createLexicalComposerContext(l,b);void 0!==b&&(a._config.theme=b);a._parentEditor=f;if(e)for(var c of e){var g=b=null;"function"!==typeof c&&(g=c,c=g.replace,b=g.with,g=g.withKlass||null);a._nodes.set(c.getType(),{klass:c,replace:b,replaceWithKlass:g,
transforms:new Set})}else{c=a._nodes=new Map(f._nodes);for(const [x,m]of c)a._nodes.set(x,{klass:m.klass,replace:m.replace,replaceWithKlass:m.replaceWithKlass,transforms:new Set})}a._config.namespace=f._config.namespace;a._editable=f._editable;return[a,w]},[]),{isCollabActive:z,yjsDocMap:A}=d.useCollaborationContext(),n=u||p.current||A.has(a.getKey());q.useEffect(()=>{n&&(p.current=!0)},[n]);q.useEffect(()=>f.registerEditableListener(b=>{a.setEditable(b)}),[a,f]);return q.createElement(k.LexicalComposerContext.Provider,
{value:y},!z||n?h:null)}
