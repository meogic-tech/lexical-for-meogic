/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import{createContext as e,useContext as n}from"react";var r=function(e){const n=new URLSearchParams;n.append("code",e);for(let e=1;e<arguments.length;e++)n.append("v",arguments[e]);throw Error(`Minified Lexical error #${e}; visit https://lexical.dev/docs/error?${n} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)};const l=e(null);function t(e,n){let r=null;return null!=e&&(r=e[1]),{getTheme:function(){return null!=n?n:null!=r?r.getTheme():null}}}function o(){const e=n(l);return null==e&&r(8),e}export{l as LexicalComposerContext,t as createLexicalComposerContext,o as useLexicalComposerContext};
