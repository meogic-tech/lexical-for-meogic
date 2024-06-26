/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext, useContext } from 'react';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const LexicalComposerContext = /*#__PURE__*/createContext(null);
function createLexicalComposerContext(parent, theme) {
  let parentContext = null;
  if (parent != null) {
    parentContext = parent[1];
  }
  function getTheme() {
    if (theme != null) {
      return theme;
    }
    return parentContext != null ? parentContext.getTheme() : null;
  }
  return {
    getTheme
  };
}
function useLexicalComposerContext() {
  const composerContext = useContext(LexicalComposerContext);
  if (composerContext == null) {
    {
      throw Error(`LexicalComposerContext.useLexicalComposerContext: cannot find a LexicalComposerContext`);
    }
  }
  return composerContext;
}

export { LexicalComposerContext, createLexicalComposerContext, useLexicalComposerContext };
