/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import{DecoratorNode as t}from"lexical";class r extends t{constructor(t,r){super(r),this.__format=t||""}exportJSON(){return{format:this.__format||"",type:"decorator-block",version:1}}canIndent(){return!1}createDOM(){return document.createElement("div")}updateDOM(){return!1}setFormat(t){this.getWritable().__format=t}isInline(){return!1}}function e(t){return t instanceof r}export{e as $isDecoratorBlockNode,r as DecoratorBlockNode};
