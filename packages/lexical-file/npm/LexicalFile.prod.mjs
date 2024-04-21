/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import{CLEAR_HISTORY_COMMAND as e}from"lexical";function t(t){!function(e){const t=document.createElement("input");t.type="file",t.accept=".lexical",t.addEventListener("change",(t=>{const n=t.target;if(n.files){const t=n.files[0],o=new FileReader;o.readAsText(t,"UTF-8"),o.onload=t=>{if(t.target){const n=t.target.result;e(n)}}}})),t.click()}((n=>{const o=JSON.parse(n),i=t.parseEditorState(JSON.stringify(o.editorState));t.setEditorState(i),t.dispatchCommand(e,void 0)}))}function n(e,t=Object.freeze({})){const n=new Date;!function(e,t){const n=document.createElement("a"),o=document.body;if(null===o)return;o.appendChild(n),n.style.display="none";const i=JSON.stringify(e),c=new Blob([i],{type:"octet/stream"}),a=window.URL.createObjectURL(c);n.href=a,n.download=t,n.click(),window.URL.revokeObjectURL(a),n.remove()}({editorState:e.getEditorState(),lastSaved:n.getTime(),source:t.source||"Lexical",version:"0.14.5"},`${t.fileName||n.toISOString()}.lexical`)}export{n as exportFile,t as importFile};
