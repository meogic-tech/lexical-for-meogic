export function buildMatcher(...toMatchers: any[]): IdentifierMatcher;
export type Node = import('estree').Node;
export type Identifier = import('estree').Identifier;
export type NameIdentifierMatcher = (name: string, node: Identifier) => boolean;
export type ToMatcher = NameIdentifierMatcher | string | RegExp | undefined;
export type IdentifierMatcher = (node: Identifier | undefined) => boolean;
