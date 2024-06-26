/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as modDev from './LexicalHashtag.dev.mjs';
import * as modProd from './LexicalHashtag.prod.mjs';
const mod = process.env.NODE_ENV === 'development' ? modDev : modProd;
export const $createHashtagNode = mod.$createHashtagNode;
export const $isHashtagNode = mod.$isHashtagNode;
export const HashtagNode = mod.HashtagNode;