/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as modDev from './LexicalDecoratorBlockNode.dev.mjs';
import * as modProd from './LexicalDecoratorBlockNode.prod.mjs';
const mod = process.env.NODE_ENV === 'development' ? modDev : modProd;
export const $isDecoratorBlockNode = mod.$isDecoratorBlockNode;
export const DecoratorBlockNode = mod.DecoratorBlockNode;