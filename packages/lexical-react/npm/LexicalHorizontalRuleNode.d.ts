/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, LexicalCommand, LexicalNode, MergeableNode, NodeKey, SerializedLexicalNode } from 'lexical';
import { DecoratorNode } from 'lexical';
export type SerializedHorizontalRuleNode = SerializedLexicalNode;
export declare const INSERT_HORIZONTAL_RULE_COMMAND: LexicalCommand<void>;
export declare class HorizontalRuleNode extends DecoratorNode<JSX.Element> implements MergeableNode<HorizontalRuleNode> {
    static getType(): string;
    static clone(node: HorizontalRuleNode): HorizontalRuleNode;
    static importJSON(serializedNode: SerializedHorizontalRuleNode): HorizontalRuleNode;
    static importDOM(): DOMConversionMap | null;
    __count: number;
    setCount(count: number): void;
    getCount(): number;
    constructor(key?: NodeKey, count?: number);
    exportJSON(): SerializedLexicalNode;
    exportDOM(): DOMExportOutput;
    createDOM(): HTMLElement;
    getTextContent(): string;
    isInline(): false;
    updateDOM(): boolean;
    decorate(): JSX.Element;
    mergeWithSibling(target: HorizontalRuleNode): HorizontalRuleNode;
}
export declare function $createHorizontalRuleNode(): HorizontalRuleNode;
export declare function $isHorizontalRuleNode(node: LexicalNode | null | undefined): node is HorizontalRuleNode;
