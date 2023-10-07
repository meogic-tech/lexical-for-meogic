/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { RangeSelection, TextNode } from '.';
import { MergeableNode } from './nodes/LexicalMergeableNode';
export declare function $normalizeTextNode(textNode: TextNode): void;
export declare function $normalizeSelection(selection: RangeSelection): RangeSelection;
export declare function $normalizeMergeableNode(mergeableNode: MergeableNode<unknown>): void;
