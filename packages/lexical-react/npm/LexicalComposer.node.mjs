/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const mod = await (process.env.NODE_ENV === 'development' ? import('./LexicalComposer.dev.mjs') : import('./LexicalComposer.prod.mjs'));
export const LexicalComposer = mod.LexicalComposer;