/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode, HeadingNode } from '@lexical/rich-text';
import { $getRoot, $getNodeByKey, TextNode } from 'lexical';
import { useState, useEffect } from 'react';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function toEntry(heading) {
  return [heading.getKey(), heading.getTextContent(), heading.getTag()];
}
function $insertHeadingIntoTableOfContents(prevHeading, newHeading, currentTableOfContents) {
  if (newHeading === null) {
    return currentTableOfContents;
  }
  const newEntry = toEntry(newHeading);
  let newTableOfContents = [];
  if (prevHeading === null) {
    newTableOfContents = [newEntry, ...currentTableOfContents];
  } else {
    for (let i = 0; i < currentTableOfContents.length; i++) {
      const key = currentTableOfContents[i][0];
      newTableOfContents.push(currentTableOfContents[i]);
      if (key === prevHeading.getKey() && key !== newHeading.getKey()) {
        newTableOfContents.push(newEntry);
      }
    }
  }
  return newTableOfContents;
}
function $deleteHeadingFromTableOfContents(key, currentTableOfContents) {
  const newTableOfContents = [];
  for (const heading of currentTableOfContents) {
    if (heading[0] !== key) {
      newTableOfContents.push(heading);
    }
  }
  return newTableOfContents;
}
function $updateHeadingInTableOfContents(heading, currentTableOfContents) {
  const newTableOfContents = [];
  for (const oldHeading of currentTableOfContents) {
    if (oldHeading[0] === heading.getKey()) {
      newTableOfContents.push(toEntry(heading));
    } else {
      newTableOfContents.push(oldHeading);
    }
  }
  return newTableOfContents;
}

/**
 * Returns the updated table of contents, placing the given `heading` before the given `prevHeading`. If `prevHeading`
 * is undefined, `heading` is placed at the start of table of contents
 */
function $updateHeadingPosition(prevHeading, heading, currentTableOfContents) {
  const newTableOfContents = [];
  const newEntry = toEntry(heading);
  if (!prevHeading) {
    newTableOfContents.push(newEntry);
  }
  for (const oldHeading of currentTableOfContents) {
    if (oldHeading[0] === heading.getKey()) {
      continue;
    }
    newTableOfContents.push(oldHeading);
    if (prevHeading && oldHeading[0] === prevHeading.getKey()) {
      newTableOfContents.push(newEntry);
    }
  }
  return newTableOfContents;
}
function LexicalTableOfContentsPlugin({
  children
}) {
  const [tableOfContents, setTableOfContents] = useState([]);
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    // Set table of contents initial state
    let currentTableOfContents = [];
    editor.getEditorState().read(() => {
      const root = $getRoot();
      const rootChildren = root.getChildren();
      for (const child of rootChildren) {
        if ($isHeadingNode(child)) {
          currentTableOfContents.push([child.getKey(), child.getTextContent(), child.getTag()]);
        }
      }
      setTableOfContents(currentTableOfContents);
    });

    // Listen to updates to heading mutations and update state
    const removeHeaderMutationListener = editor.registerMutationListener(HeadingNode, mutatedNodes => {
      editor.getEditorState().read(() => {
        for (const [nodeKey, mutation] of mutatedNodes) {
          if (mutation === 'created') {
            const newHeading = $getNodeByKey(nodeKey);
            if (newHeading !== null) {
              let prevHeading = newHeading.getPreviousSibling();
              while (prevHeading !== null && !$isHeadingNode(prevHeading)) {
                prevHeading = prevHeading.getPreviousSibling();
              }
              currentTableOfContents = $insertHeadingIntoTableOfContents(prevHeading, newHeading, currentTableOfContents);
            }
          } else if (mutation === 'destroyed') {
            currentTableOfContents = $deleteHeadingFromTableOfContents(nodeKey, currentTableOfContents);
          } else if (mutation === 'updated') {
            const newHeading = $getNodeByKey(nodeKey);
            if (newHeading !== null) {
              let prevHeading = newHeading.getPreviousSibling();
              while (prevHeading !== null && !$isHeadingNode(prevHeading)) {
                prevHeading = prevHeading.getPreviousSibling();
              }
              currentTableOfContents = $updateHeadingPosition(prevHeading, newHeading, currentTableOfContents);
            }
          }
        }
        setTableOfContents(currentTableOfContents);
      });
    });

    // Listen to text node mutation updates
    const removeTextNodeMutationListener = editor.registerMutationListener(TextNode, mutatedNodes => {
      editor.getEditorState().read(() => {
        for (const [nodeKey, mutation] of mutatedNodes) {
          if (mutation === 'updated') {
            const currNode = $getNodeByKey(nodeKey);
            if (currNode !== null) {
              const parentNode = currNode.getParentOrThrow();
              if ($isHeadingNode(parentNode)) {
                currentTableOfContents = $updateHeadingInTableOfContents(parentNode, currentTableOfContents);
                setTableOfContents(currentTableOfContents);
              }
            }
          }
        }
      });
    });
    return () => {
      removeHeaderMutationListener();
      removeTextNodeMutationListener();
    };
  }, [editor]);
  return children(tableOfContents, editor);
}

export { LexicalTableOfContentsPlugin as default };
