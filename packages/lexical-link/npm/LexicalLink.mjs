/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as modDev from './LexicalLink.dev.mjs';
import * as modProd from './LexicalLink.prod.mjs';
const mod = process.env.NODE_ENV === 'development' ? modDev : modProd;
export const $createAutoLinkNode = mod.$createAutoLinkNode;
export const $createLinkNode = mod.$createLinkNode;
export const $isAutoLinkNode = mod.$isAutoLinkNode;
export const $isLinkNode = mod.$isLinkNode;
export const $toggleLink = mod.$toggleLink;
export const AutoLinkNode = mod.AutoLinkNode;
export const LinkNode = mod.LinkNode;
export const TOGGLE_LINK_COMMAND = mod.TOGGLE_LINK_COMMAND;
export const toggleLink = mod.toggleLink;