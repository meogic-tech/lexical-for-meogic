/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as modDev from './LexicalCollaborationPlugin.dev.mjs';
import * as modProd from './LexicalCollaborationPlugin.prod.mjs';
const mod = process.env.NODE_ENV === 'development' ? modDev : modProd;
export const CollaborationPlugin = mod.CollaborationPlugin;