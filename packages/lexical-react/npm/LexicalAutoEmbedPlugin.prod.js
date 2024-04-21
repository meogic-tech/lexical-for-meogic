/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var e=require("@lexical/link"),k=require("@lexical/react/LexicalComposerContext"),l=require("@lexical/react/LexicalNodeMenuPlugin"),q=require("@lexical/utils"),r=require("lexical"),z=require("react");let A=r.createCommand("INSERT_EMBED_COMMAND");class B extends l.MenuOption{constructor(f,n){super(f);this.title=f;this.onSelect=n.onSelect.bind(this)}}exports.AutoEmbedOption=B;exports.INSERT_EMBED_COMMAND=A;
exports.LexicalAutoEmbedPlugin=function({embedConfigs:f,onOpenEmbedModalForConfig:n,getMenuOptions:t,menuRenderFn:C,menuCommandPriority:D=r.COMMAND_PRIORITY_LOW}){let [c]=k.useLexicalComposerContext(),[g,u]=z.useState(null),[h,v]=z.useState(null),m=z.useCallback(()=>{u(null);v(null)},[]),w=z.useCallback(b=>{c.getEditorState().read(async function(){const a=r.$getNodeByKey(b);if(e.$isLinkNode(a))for(let d=0;d<f.length;d++){const p=f[d];null!=await Promise.resolve(p.parseUrl(a.__url))&&(v(p),u(a.getKey()))}})},
[c,f]);z.useEffect(()=>{let b=(a,{updateTags:d,dirtyLeaves:p})=>{for(const [x,E]of a)"created"===E&&d.has("paste")&&3>=p.size?w(x):x===g&&m()};return q.mergeRegister(...[e.LinkNode,e.AutoLinkNode].map(a=>c.registerMutationListener(a,(...d)=>b(...d))))},[w,c,f,g,m]);z.useEffect(()=>c.registerCommand(A,b=>{let a=f.find(({type:d})=>d===b);return a?(n(a),!0):!1},r.COMMAND_PRIORITY_EDITOR),[c,f,n]);let y=z.useCallback(async function(){if(null!=h&&null!=g){const b=c.getEditorState().read(()=>{const a=r.$getNodeByKey(g);
return e.$isLinkNode(a)?a:null});if(e.$isLinkNode(b)){const a=await Promise.resolve(h.parseUrl(b.__url));null!=a&&c.update(()=>{r.$getSelection()||b.selectEnd();h.insertNode(c,a);b.isAttached()&&b.remove()})}}},[h,c,g]),F=z.useMemo(()=>null!=h&&null!=g?t(h,y,m):[],[h,y,t,g,m]),G=z.useCallback((b,a,d)=>{c.update(()=>{b.onSelect(a);d()})},[c]);return null!=g?z.createElement(l.LexicalNodeMenuPlugin,{nodeKey:g,onClose:m,onSelectOption:G,options:F,menuRenderFn:C,commandPriority:D}):null};
exports.URL_MATCHER=/((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
