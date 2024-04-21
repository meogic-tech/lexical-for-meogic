/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var d=require("@lexical/react/LexicalCollaborationContext"),m=require("@lexical/react/LexicalComposerContext"),q=require("react");function t(a){let h=new URLSearchParams;h.append("code",a);for(let e=1;e<arguments.length;e++)h.append("v",arguments[e]);throw Error(`Minified Lexical error #${a}; visit https://lexical.dev/docs/error?${h} for the full message or `+"use the non-minified dev environment for full errors and additional helpful warnings.");}
function u(a){a=a.transform();return null!==a?new Set([a]):new Set}
exports.LexicalNestedComposer=function({initialEditor:a,children:h,initialNodes:e,initialTheme:v,skipCollabChecks:w}){let r=q.useRef(!1),n=q.useContext(m.LexicalComposerContext);null==n&&t(9);let [f,{getTheme:x}]=n,z=q.useMemo(()=>{var c=v||x()||void 0;const y=m.createLexicalComposerContext(n,c);void 0!==c&&(a._config.theme=c);a._parentEditor=f;if(e)for(var b of e){var g=c=null;"function"!==typeof b&&(g=b,b=g.replace,c=g.with,g=g.withKlass||null);const l=a._nodes.get(b.getType());a._nodes.set(b.getType(),
{exportDOM:l?l.exportDOM:void 0,klass:b,replace:c,replaceWithKlass:g,transforms:u(b)})}else{b=a._nodes=new Map(f._nodes);for(const [l,k]of b)a._nodes.set(l,{exportDOM:k.exportDOM,klass:k.klass,replace:k.replace,replaceWithKlass:k.replaceWithKlass,transforms:u(k.klass)})}a._config.namespace=f._config.namespace;a._editable=f._editable;return[a,y]},[]),{isCollabActive:A,yjsDocMap:B}=d.useCollaborationContext(),p=w||r.current||B.has(a.getKey());q.useEffect(()=>{p&&(r.current=!0)},[p]);q.useEffect(()=>
f.registerEditableListener(c=>{a.setEditable(c)}),[a,f]);return q.createElement(m.LexicalComposerContext.Provider,{value:z},!A||p?h:null)}
