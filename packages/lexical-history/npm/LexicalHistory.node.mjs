/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const mod = await (process.env.NODE_ENV === 'development' ? import('./LexicalHistory.dev.mjs') : import('./LexicalHistory.prod.mjs'));
export const createEmptyHistoryState = mod.createEmptyHistoryState;
export const registerHistory = mod.registerHistory;