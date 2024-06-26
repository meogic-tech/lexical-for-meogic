/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { LexicalEditor } from 'lexical';
import { LexicalCommand } from 'lexical';
export declare function generateContent(editor: LexicalEditor, commandsLog: ReadonlyArray<LexicalCommand<unknown> & {
    payload: unknown;
}>, exportDOM: boolean, obfuscateText?: boolean): string;
