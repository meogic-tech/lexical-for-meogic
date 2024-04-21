/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var c=require("@lexical/react/LexicalComposerContext"),d=require("react");exports.EditorRefPlugin=function({editorRef:a}){let [b]=c.useLexicalComposerContext();d.useEffect(()=>{"function"===typeof a?a(b):"object"===typeof a&&(a.current=b)},[b]);return null}
