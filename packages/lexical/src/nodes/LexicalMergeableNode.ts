/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {LexicalNode} from '../LexicalNode';

export interface MergeableNode<T> {
  mergeWithSibling(target: T): T;
}

export function $isMergeableNode(
  node: unknown | null | undefined,
): node is MergeableNode<unknown> {
  return (
    typeof node === 'object' &&
    node !== null &&
    'mergeWithSibling' in node &&
    typeof (node as MergeableNode<unknown>).mergeWithSibling === 'function'
  );
}

export type LexicalMergeableNode = MergeableNode<unknown> & LexicalNode;
