/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import{useLexicalComposerContext as t}from"@lexical/react/LexicalComposerContext";import{mergeRegister as e,calculateZoomLevel as n}from"@lexical/utils";import{createCommand as o,KEY_ARROW_DOWN_COMMAND as l,KEY_ARROW_UP_COMMAND as r,KEY_ESCAPE_COMMAND as i,KEY_TAB_COMMAND as u,KEY_ENTER_COMMAND as c,COMMAND_PRIORITY_LOW as s,$getSelection as a,$isRangeSelection as m}from"lexical";import*as d from"react";import{useLayoutEffect as p,useEffect as f,useState as g,useCallback as h,useMemo as w,useRef as v}from"react";var y="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?p:f;class b{constructor(t){this.key=t,this.ref={current:null},this.setRefElement=this.setRefElement.bind(this)}setRefElement(t){this.ref={current:t}}}const E=t=>{const e=document.getElementById("typeahead-menu");if(!e)return;const n=e.getBoundingClientRect();n.top+n.height>window.innerHeight&&e.scrollIntoView({block:"center"}),n.top<0&&e.scrollIntoView({block:"center"}),t.scrollIntoView({block:"nearest"})};function C(t,e){const n=t.getBoundingClientRect(),o=e.getBoundingClientRect();return n.top>o.top&&n.top<o.bottom}function R(e,n,o,l){const[r]=t();f((()=>{if(null!=n&&null!=e){const t=r.getRootElement(),e=null!=t?function(t,e){let n=getComputedStyle(t);const o="absolute"===n.position,l=e?/(auto|scroll|hidden)/:/(auto|scroll)/;if("fixed"===n.position)return document.body;for(let e=t;e=e.parentElement;)if(n=getComputedStyle(e),(!o||"static"!==n.position)&&l.test(n.overflow+n.overflowY+n.overflowX))return e;return document.body}(t,!1):document.body;let i=!1,u=C(n,e);const c=function(){i||(window.requestAnimationFrame((function(){o(),i=!1})),i=!0);const t=C(n,e);t!==u&&(u=t,null!=l&&l(t))},s=new ResizeObserver(o);return window.addEventListener("resize",o),document.addEventListener("scroll",c,{capture:!0,passive:!0}),s.observe(n),()=>{s.unobserve(n),window.removeEventListener("resize",o),document.removeEventListener("scroll",c,!0)}}}),[n,r,l,o,e])}const x=o("SCROLL_TYPEAHEAD_OPTION_INTO_VIEW_COMMAND");function O({close:t,editor:n,anchorElementRef:o,resolution:d,options:p,menuRenderFn:v,onSelectOption:b,shouldSplitNodeWithQuery:C=!1,commandPriority:R=s}){const[O,I]=g(null),S=d.match&&d.match.matchingString;f((()=>{I(0)}),[S]);const A=h((e=>{n.update((()=>{const n=null!=d.match&&C?function(t){const e=a();if(!m(e)||!e.isCollapsed())return null;const n=e.anchor;if("text"!==n.type)return null;const o=n.getNode();if(!o.isSimpleText())return null;const l=n.offset,r=o.getTextContent().slice(0,l),i=t.replaceableString.length,u=l-function(t,e,n){let o=n;for(let n=o;n<=e.length;n++)t.substr(-n)===e.substr(0,n)&&(o=n);return o}(r,t.matchingString,i);if(u<0)return null;let c;return 0===u?[c]=o.splitText(l):[,c]=o.splitText(u,l),c}(d.match):null;b(e,n,t,d.match?d.match.matchingString:"")}))}),[n,C,d.match,b,t]),L=h((t=>{const e=n.getRootElement();null!==e&&(e.setAttribute("aria-activedescendant","typeahead-item-"+t),I(t))}),[n]);f((()=>()=>{const t=n.getRootElement();null!==t&&t.removeAttribute("aria-activedescendant")}),[n]),y((()=>{null===p?I(null):null===O&&L(0)}),[p,O,L]),f((()=>e(n.registerCommand(x,(({option:t})=>!(!t.ref||null==t.ref.current)&&(E(t.ref.current),!0)),R))),[n,L,R]),f((()=>e(n.registerCommand(l,(t=>{const e=t;if(null!==p&&p.length&&null!==O){const t=O!==p.length-1?O+1:0;L(t);const o=p[t];null!=o.ref&&o.ref.current&&n.dispatchCommand(x,{index:t,option:o}),e.preventDefault(),e.stopImmediatePropagation()}return!0}),R),n.registerCommand(r,(t=>{const e=t;if(null!==p&&p.length&&null!==O){const t=0!==O?O-1:p.length-1;L(t);const n=p[t];null!=n.ref&&n.ref.current&&E(n.ref.current),e.preventDefault(),e.stopImmediatePropagation()}return!0}),R),n.registerCommand(i,(e=>{const n=e;return n.preventDefault(),n.stopImmediatePropagation(),t(),!0}),R),n.registerCommand(u,(t=>{const e=t;return null!==p&&null!==O&&null!=p[O]&&(e.preventDefault(),e.stopImmediatePropagation(),A(p[O]),!0)}),R),n.registerCommand(c,(t=>null!==p&&null!==O&&null!=p[O]&&(null!==t&&(t.preventDefault(),t.stopImmediatePropagation()),A(p[O]),!0)),R))),[A,t,n,p,O,L,R]);return v(o,w((()=>({options:p,selectOptionAndCleanUp:A,selectedIndex:O,setHighlightedIndex:I})),[A,O,p]),d.match?d.match.matchingString:"")}function I({options:e,onWillOpen:o,onClose:l,onOpen:r,onSelectOption:i,menuRenderFn:u,anchorClassName:c,commandPriority:a=s,parent:m}){const[p]=t(),[w,y]=g(null),b=d.useRef(null),E=function(e,n,o,l=document.body){const[r]=t(),i=v(document.createElement("div")),u=h((()=>{i.current.style.top=i.current.style.bottom;const t=r.getRootElement(),n=i.current,u=n.firstChild;if(null!==t&&null!==e){const{left:r,top:c,width:s,height:a}=e.getRect(),m=i.current.offsetHeight;if(n.style.top=`${c+window.pageYOffset+m+3}px`,n.style.left=`${r+window.pageXOffset}px`,n.style.height=`${a}px`,n.style.width=`${s}px`,null!==u){u.style.top=`${c}`;const e=u.getBoundingClientRect(),o=e.height,l=e.width,i=t.getBoundingClientRect();r+l>i.right&&(n.style.left=`${i.right-l+window.pageXOffset}px`),(c+o>window.innerHeight||c+o>i.bottom)&&c-i.top>o&&(n.style.top=c-o+window.pageYOffset-a+"px")}n.isConnected||(null!=o&&(n.className=o),n.setAttribute("aria-label","Typeahead menu"),n.setAttribute("id","typeahead-menu"),n.setAttribute("role","listbox"),n.style.display="block",n.style.position="absolute",l.append(n)),i.current=n,t.setAttribute("aria-controls","typeahead-menu")}}),[r,e,o,l]);f((()=>{const t=r.getRootElement();if(null!==e)return u(),()=>{null!==t&&t.removeAttribute("aria-controls");const e=i.current;null!==e&&e.isConnected&&e.remove()}}),[r,u,e]);const c=h((t=>{null!==e&&(t||n(null))}),[e,n]);return R(e,i.current,u,c),i}(w,y,c,m),C=h((()=>{y(null),null!=l&&null!==w&&l()}),[l,w]),x=h((t=>{y(t),null!=r&&null===w&&r(t)}),[r,w]),I=h((t=>{t.preventDefault(),null!=o&&o(t);const e=n(t.target);x({getRect:()=>new DOMRect(t.clientX/e,t.clientY/e,1,1)})}),[x,o]),S=h((t=>{null===w||null==b.current||null==t.target||b.current.contains(t.target)||C()}),[C,w]);return f((()=>{const t=p.getRootElement();if(t)return t.addEventListener("contextmenu",I),()=>t.removeEventListener("contextmenu",I)}),[p,I]),f((()=>(document.addEventListener("click",S),()=>document.removeEventListener("click",S))),[p,S]),null===w||null===p?null:d.createElement(O,{close:C,resolution:w,editor:p,anchorElementRef:E,options:e,menuRenderFn:(t,e)=>u(t,e,{setMenuRef:t=>{b.current=t}}),onSelectOption:i,commandPriority:a})}export{I as LexicalContextMenuPlugin,b as MenuOption};
