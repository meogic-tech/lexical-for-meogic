/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { CommandPayloadType, EditorThemeClasses, Klass, LexicalCommand, MutatedNodes, MutationListeners, NodeMutation, RegisteredNode, RegisteredNodes, Spread } from './LexicalEditor';
import type { EditorState } from './LexicalEditorState';
import type { LexicalNode, NodeKey } from './LexicalNode';
import type { BaseSelection, PointType, RangeSelection } from './LexicalSelection';
import type { RootNode } from './nodes/LexicalRootNode';
import type { TextFormatType, TextNode } from './nodes/LexicalTextNode';
import { DecoratorNode, ElementNode, LineBreakNode } from '.';
import { LexicalEditor } from './LexicalEditor';
export declare const emptyFunction: () => void;
export declare function resetRandomKey(): void;
export declare function generateRandomKey(): string;
export declare function getRegisteredNodeOrThrow(editor: LexicalEditor, nodeType: string): RegisteredNode;
export declare const isArray: (arg: any) => arg is any[];
export declare const scheduleMicroTask: (fn: () => void) => void;
export declare function $isSelectionCapturedInDecorator(node: Node): boolean;
export declare function isSelectionCapturedInDecoratorInput(anchorDOM: Node): boolean;
export declare function isSelectionWithinEditor(editor: LexicalEditor, anchorDOM: null | Node, focusDOM: null | Node): boolean;
export declare function getNearestEditorFromDOMNode(node: Node | null): LexicalEditor | null;
export declare function getTextDirection(text: string): 'ltr' | 'rtl' | null;
export declare function $isTokenOrSegmented(node: TextNode): boolean;
export declare function getDOMTextNode(element: Node | null): Text | null;
export declare function toggleTextFormatType(format: number, type: TextFormatType, alignWithFormat: null | number): number;
export declare function $isLeafNode(node: LexicalNode | null | undefined): node is TextNode | LineBreakNode | DecoratorNode<unknown>;
export declare function $setNodeKey(node: LexicalNode, existingKey: NodeKey | null | undefined): void;
export declare function removeFromParent(node: LexicalNode): void;
export declare function internalMarkNodeAsDirty(node: LexicalNode): void;
export declare function internalMarkSiblingsAsDirty(node: LexicalNode): void;
export declare function $setCompositionKey(compositionKey: null | NodeKey): void;
export declare function $getCompositionKey(): null | NodeKey;
export declare function $getNodeByKey<T extends LexicalNode>(key: NodeKey, _editorState?: EditorState): T | null;
export declare function $getNodeFromDOMNode(dom: Node, editorState?: EditorState): LexicalNode | null;
export declare function $getNearestNodeFromDOMNode(startingDOM: Node, editorState?: EditorState): LexicalNode | null;
export declare function cloneDecorators(editor: LexicalEditor): Record<NodeKey, unknown>;
export declare function getEditorStateTextContent(editorState: EditorState): string;
export declare function markAllNodesAsDirty(editor: LexicalEditor, type: string): void;
export declare function $getRoot(): RootNode;
export declare function internalGetRoot(editorState: EditorState): RootNode;
export declare function $setSelection(selection: null | BaseSelection): void;
export declare function $flushMutations(): void;
export declare function $getNodeFromDOM(dom: Node): null | LexicalNode;
export declare function getTextNodeOffset(node: TextNode, moveSelectionToEnd: boolean): number;
export declare function doesContainGrapheme(str: string): boolean;
export declare function getEditorsToPropagate(editor: LexicalEditor): Array<LexicalEditor>;
export declare function createUID(): string;
export declare function getAnchorTextFromDOM(anchorNode: Node): null | string;
export declare function $updateSelectedTextFromDOM(isCompositionEnd: boolean, editor: LexicalEditor, data?: string): void;
export declare function $updateTextNodeFromDOMContent(textNode: TextNode, textContent: string, anchorOffset: null | number, focusOffset: null | number, compositionEnd: boolean): void;
export declare function $shouldInsertTextAfterOrBeforeTextNode(selection: RangeSelection, node: TextNode): boolean;
export declare function isTab(code: string, altKey: boolean, ctrlKey: boolean, metaKey: boolean): boolean;
export declare function isBold(code: string, altKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isItalic(code: string, altKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isUnderline(code: string, altKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isParagraph(code: string, shiftKey: boolean): boolean;
export declare function isLineBreak(keyCode: string, shiftKey: boolean): boolean;
export declare function isOpenLineBreak(code: string, ctrlKey: boolean): boolean;
export declare function isDeleteWordBackward(code: string, altKey: boolean, ctrlKey: boolean): boolean;
export declare function isDeleteWordForward(code: string, altKey: boolean, ctrlKey: boolean): boolean;
export declare function isDeleteLineBackward(code: string, metaKey: boolean): boolean;
export declare function isDeleteLineForward(code: string, metaKey: boolean): boolean;
export declare function isDeleteBackward(code: string, altKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isDeleteForward(code: string, ctrlKey: boolean, shiftKey: boolean, altKey: boolean, metaKey: boolean): boolean;
export declare function isUndo(code: string, shiftKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isRedo(code: string, shiftKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isCopy(code: string, shiftKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isCut(code: string, shiftKey: boolean, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isMoveBackward(code: string, ctrlKey: boolean, altKey: boolean, metaKey: boolean): boolean;
export declare function isMoveToStart(code: string, ctrlKey: boolean, shiftKey: boolean, altKey: boolean, metaKey: boolean): boolean;
export declare function isMoveForward(code: string, ctrlKey: boolean, altKey: boolean, metaKey: boolean): boolean;
export declare function isMoveToEnd(code: string, ctrlKey: boolean, shiftKey: boolean, altKey: boolean, metaKey: boolean): boolean;
export declare function isMoveUp(code: string, ctrlKey: boolean, metaKey: boolean): boolean;
export declare function isMoveDown(code: string, ctrlKey: boolean, metaKey: boolean): boolean;
export declare function isModifier(ctrlKey: boolean, shiftKey: boolean, altKey: boolean, metaKey: boolean): boolean;
export declare function isSpace(code: string): boolean;
export declare function controlOrMeta(metaKey: boolean, ctrlKey: boolean): boolean;
export declare function isReturn(code: string): boolean;
export declare function isBackspace(code: string): boolean;
export declare function isEscape(code: string): boolean;
export declare function isDelete(code: string): boolean;
export declare function isSelectAll(code: string, metaKey: boolean, ctrlKey: boolean): boolean;
export declare function $selectAll(): void;
export declare function getCachedClassNameArray(classNamesTheme: EditorThemeClasses, classNameThemeType: string): Array<string>;
export declare function setMutatedNode(mutatedNodes: MutatedNodes, registeredNodes: RegisteredNodes, mutationListeners: MutationListeners, node: LexicalNode, mutation: NodeMutation): void;
export declare function $nodesOfType<T extends LexicalNode>(klass: Klass<T>): Array<T>;
export declare function $getAdjacentNode(focus: PointType, isBackward: boolean): null | LexicalNode;
export declare function isFirefoxClipboardEvents(editor: LexicalEditor): boolean;
export declare function dispatchCommand<TCommand extends LexicalCommand<unknown>>(editor: LexicalEditor, command: TCommand, payload: CommandPayloadType<TCommand>): boolean;
export declare function $textContentRequiresDoubleLinebreakAtEnd(node: ElementNode): boolean;
export declare function getElementByKeyOrThrow(editor: LexicalEditor, key: NodeKey): HTMLElement;
export declare function getParentElement(node: Node): HTMLElement | null;
export declare function scrollIntoViewIfNeeded(editor: LexicalEditor, selectionRect: DOMRect, rootElement: HTMLElement): void;
export declare function $hasUpdateTag(tag: string): boolean;
export declare function $addUpdateTag(tag: string): void;
export declare function $maybeMoveChildrenSelectionToParent(parentNode: LexicalNode): BaseSelection | null;
export declare function $hasAncestor(child: LexicalNode, targetNode: LexicalNode): boolean;
export declare function getDefaultView(domElem: HTMLElement): Window | null;
export declare function getWindow(editor: LexicalEditor): Window;
export declare function $isInlineElementOrDecoratorNode(node: LexicalNode): boolean;
export declare function $getNearestRootOrShadowRoot(node: LexicalNode): RootNode | ElementNode;
declare const ShadowRootNodeBrand: unique symbol;
type ShadowRootNode = Spread<{
    isShadowRoot(): true;
    [ShadowRootNodeBrand]: never;
}, ElementNode>;
export declare function $isRootOrShadowRoot(node: null | LexicalNode): node is RootNode | ShadowRootNode;
export declare function $copyNode<T extends LexicalNode>(node: T): T;
export declare function $applyNodeReplacement<N extends LexicalNode>(node: LexicalNode): N;
export declare function errorOnInsertTextNodeOnRoot(node: LexicalNode, insertNode: LexicalNode): void;
export declare function $getNodeByKeyOrThrow<N extends LexicalNode>(key: NodeKey): N;
export declare function removeDOMBlockCursorElement(blockCursorElement: HTMLElement, editor: LexicalEditor, rootElement: HTMLElement): void;
export declare function updateDOMBlockCursorElement(editor: LexicalEditor, rootElement: HTMLElement, nextSelection: null | BaseSelection): void;
export declare function getDOMSelection(targetWindow: null | Window): null | Selection;
export declare function $splitNode(node: ElementNode, offset: number): [ElementNode | null, ElementNode];
export declare function $findMatchingParent(startingNode: LexicalNode, findFn: (node: LexicalNode) => boolean): LexicalNode | null;
/**
 * @param x - The element being tested
 * @returns Returns true if x is an HTML anchor tag, false otherwise
 */
export declare function isHTMLAnchorElement(x: Node): x is HTMLAnchorElement;
/**
 * @param x - The element being testing
 * @returns Returns true if x is an HTML element, false otherwise.
 */
export declare function isHTMLElement(x: Node | EventTarget): x is HTMLElement;
/**
 *
 * @param node - the Dom Node to check
 * @returns if the Dom Node is an inline node
 */
export declare function isInlineDomNode(node: Node): boolean;
/**
 *
 * @param node - the Dom Node to check
 * @returns if the Dom Node is a block node
 */
export declare function isBlockDomNode(node: Node): boolean;
/**
 * This function is for internal use of the library.
 * Please do not use it as it may change in the future.
 */
export declare function INTERNAL_$isBlock(node: LexicalNode): node is ElementNode | DecoratorNode<unknown>;
export declare function $getAncestor<NodeType extends LexicalNode = LexicalNode>(node: LexicalNode, predicate: (ancestor: LexicalNode) => ancestor is NodeType): NodeType | null;
/**
 * Utility function for accessing current active editor instance.
 * @returns Current active editor
 */
export declare function $getEditor(): LexicalEditor;
export {};
