/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as modDev from './LexicalSelection.dev.mjs';
import * as modProd from './LexicalSelection.prod.mjs';
const mod = process.env.NODE_ENV === 'development' ? modDev : modProd;
export const $addNodeStyle = mod.$addNodeStyle;
export const $cloneWithProperties = mod.$cloneWithProperties;
export const $getSelectionStyleValueForProperty = mod.$getSelectionStyleValueForProperty;
export const $isAtNodeEnd = mod.$isAtNodeEnd;
export const $isParentElementRTL = mod.$isParentElementRTL;
export const $moveCaretSelection = mod.$moveCaretSelection;
export const $moveCharacter = mod.$moveCharacter;
export const $patchStyleText = mod.$patchStyleText;
export const $selectAll = mod.$selectAll;
export const $setBlocksType = mod.$setBlocksType;
export const $shouldOverrideDefaultCharacterSelection = mod.$shouldOverrideDefaultCharacterSelection;
export const $sliceSelectedTextNodeContent = mod.$sliceSelectedTextNodeContent;
export const $trimTextContentFromAnchor = mod.$trimTextContentFromAnchor;
export const $wrapNodes = mod.$wrapNodes;
export const createDOMRange = mod.createDOMRange;
export const createRectsFromDOMRange = mod.createRectsFromDOMRange;
export const getStyleObjectFromCSS = mod.getStyleObjectFromCSS;
export const trimTextContentFromAnchor = mod.trimTextContentFromAnchor;