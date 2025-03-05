import{r as a,j as s,c as F,R as x,u as W,a as U,b as ne,d as Pe,e as q,C as Se}from"./index-PidCoIvL.js";function ee(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function oe(...e){return t=>{let n=!1;const r=e.map(o=>{const i=ee(o,t);return!n&&typeof i=="function"&&(n=!0),i});if(n)return()=>{for(let o=0;o<r.length;o++){const i=r[o];typeof i=="function"?i():ee(e[o],null)}}}}function k(...e){return a.useCallback(oe(...e),e)}var O=a.forwardRef((e,t)=>{const{children:n,...r}=e,o=a.Children.toArray(n),i=o.find(Ee);if(i){const c=i.props.children,l=o.map(d=>d===i?a.Children.count(c)>1?a.Children.only(null):a.isValidElement(c)?c.props.children:null:d);return s.jsx($,{...r,ref:t,children:a.isValidElement(c)?a.cloneElement(c,void 0,l):null})}return s.jsx($,{...r,ref:t,children:n})});O.displayName="Slot";var $=a.forwardRef((e,t)=>{const{children:n,...r}=e;if(a.isValidElement(n)){const o=Me(n),i=_e(r,n.props);return n.type!==a.Fragment&&(i.ref=t?oe(t,o):o),a.cloneElement(n,i)}return a.Children.count(n)>1?a.Children.only(null):null});$.displayName="SlotClone";var Oe=({children:e})=>s.jsx(s.Fragment,{children:e});function Ee(e){return a.isValidElement(e)&&e.type===Oe}function _e(e,t){const n={...t};for(const r in t){const o=e[r],i=t[r];/^on[A-Z]/.test(r)?o&&i?n[r]=(...l)=>{i(...l),o(...l)}:o&&(n[r]=o):r==="style"?n[r]={...o,...i}:r==="className"&&(n[r]=[o,i].filter(Boolean).join(" "))}return{...e,...n}}function Me(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}function Te(e){const t=e+"CollectionProvider",[n,r]=F(t),[o,i]=n(t,{collectionRef:{current:null},itemMap:new Map}),c=f=>{const{scope:v,children:g}=f,C=x.useRef(null),y=x.useRef(new Map).current;return s.jsx(o,{scope:v,itemMap:y,collectionRef:C,children:g})};c.displayName=t;const l=e+"CollectionSlot",d=x.forwardRef((f,v)=>{const{scope:g,children:C}=f,y=i(l,g),p=k(v,y.collectionRef);return s.jsx(O,{ref:p,children:C})});d.displayName=l;const u=e+"CollectionItemSlot",m="data-radix-collection-item",h=x.forwardRef((f,v)=>{const{scope:g,children:C,...y}=f,p=x.useRef(null),b=k(v,p),w=i(u,g);return x.useEffect(()=>(w.itemMap.set(p,{ref:p,...y}),()=>void w.itemMap.delete(p))),s.jsx(O,{[m]:"",ref:b,children:C})});h.displayName=u;function N(f){const v=i(e+"CollectionConsumer",f);return x.useCallback(()=>{const C=v.collectionRef.current;if(!C)return[];const y=Array.from(C.querySelectorAll(`[${m}]`));return Array.from(v.itemMap.values()).sort((w,P)=>y.indexOf(w.ref.current)-y.indexOf(P.ref.current))},[v.collectionRef,v.itemMap])}return[{Provider:c,Slot:d,ItemSlot:h},N,r]}function De(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e==null||e(o),n===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}var We=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],re=We.reduce((e,t)=>{const n=a.forwardRef((r,o)=>{const{asChild:i,...c}=r,l=i?O:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),s.jsx(l,{...c,ref:o})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function ke(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e==null||e(o),n===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}function te(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function ie(...e){return t=>{let n=!1;const r=e.map(o=>{const i=te(o,t);return!n&&typeof i=="function"&&(n=!0),i});if(n)return()=>{for(let o=0;o<r.length;o++){const i=r[o];typeof i=="function"?i():te(e[o],null)}}}}function se(...e){return a.useCallback(ie(...e),e)}var ae=a.forwardRef((e,t)=>{const{children:n,...r}=e,o=a.Children.toArray(n),i=o.find(Ve);if(i){const c=i.props.children,l=o.map(d=>d===i?a.Children.count(c)>1?a.Children.only(null):a.isValidElement(c)?c.props.children:null:d);return s.jsx(V,{...r,ref:t,children:a.isValidElement(c)?a.cloneElement(c,void 0,l):null})}return s.jsx(V,{...r,ref:t,children:n})});ae.displayName="Slot";var V=a.forwardRef((e,t)=>{const{children:n,...r}=e;if(a.isValidElement(n)){const o=Fe(n),i=Le(r,n.props);return n.type!==a.Fragment&&(i.ref=t?ie(t,o):o),a.cloneElement(n,i)}return a.Children.count(n)>1?a.Children.only(null):null});V.displayName="SlotClone";var $e=({children:e})=>s.jsx(s.Fragment,{children:e});function Ve(e){return a.isValidElement(e)&&e.type===$e}function Le(e,t){const n={...t};for(const r in t){const o=e[r],i=t[r];/^on[A-Z]/.test(r)?o&&i?n[r]=(...l)=>{i(...l),o(...l)}:o&&(n[r]=o):r==="style"?n[r]={...o,...i}:r==="className"&&(n[r]=[o,i].filter(Boolean).join(" "))}return{...e,...n}}function Fe(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Ue=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],B=Ue.reduce((e,t)=>{const n=a.forwardRef((r,o)=>{const{asChild:i,...c}=r,l=i?ae:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),s.jsx(l,{...c,ref:o})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function qe(e,t){return a.useReducer((n,r)=>t[n][r]??n,e)}var ce=e=>{const{present:t,children:n}=e,r=Be(t),o=typeof n=="function"?n({present:r.isPresent}):a.Children.only(n),i=se(r.ref,Ge(o));return typeof n=="function"||r.isPresent?a.cloneElement(o,{ref:i}):null};ce.displayName="Presence";function Be(e){const[t,n]=a.useState(),r=a.useRef({}),o=a.useRef(e),i=a.useRef("none"),c=e?"mounted":"unmounted",[l,d]=qe(c,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return a.useEffect(()=>{const u=S(r.current);i.current=l==="mounted"?u:"none"},[l]),W(()=>{const u=r.current,m=o.current;if(m!==e){const N=i.current,f=S(u);e?d("MOUNT"):f==="none"||(u==null?void 0:u.display)==="none"?d("UNMOUNT"):d(m&&N!==f?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,d]),W(()=>{if(t){let u;const m=t.ownerDocument.defaultView??window,h=f=>{const g=S(r.current).includes(f.animationName);if(f.target===t&&g&&(d("ANIMATION_END"),!o.current)){const C=t.style.animationFillMode;t.style.animationFillMode="forwards",u=m.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=C)})}},N=f=>{f.target===t&&(i.current=S(r.current))};return t.addEventListener("animationstart",N),t.addEventListener("animationcancel",h),t.addEventListener("animationend",h),()=>{m.clearTimeout(u),t.removeEventListener("animationstart",N),t.removeEventListener("animationcancel",h),t.removeEventListener("animationend",h)}}else d("ANIMATION_END")},[t,d]),{isPresent:["mounted","unmountSuspended"].includes(l),ref:a.useCallback(u=>{u&&(r.current=getComputedStyle(u)),n(u)},[])}}function S(e){return(e==null?void 0:e.animationName)||"none"}function Ge(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var G="Collapsible",[Ke,le]=F(G),[Qe,K]=Ke(G),de=a.forwardRef((e,t)=>{const{__scopeCollapsible:n,open:r,defaultOpen:o,disabled:i,onOpenChange:c,...l}=e,[d=!1,u]=U({prop:r,defaultProp:o,onChange:c});return s.jsx(Qe,{scope:n,disabled:i,contentId:ne(),open:d,onOpenToggle:a.useCallback(()=>u(m=>!m),[u]),children:s.jsx(B.div,{"data-state":z(d),"data-disabled":i?"":void 0,...l,ref:t})})});de.displayName=G;var ue="CollapsibleTrigger",pe=a.forwardRef((e,t)=>{const{__scopeCollapsible:n,...r}=e,o=K(ue,n);return s.jsx(B.button,{type:"button","aria-controls":o.contentId,"aria-expanded":o.open||!1,"data-state":z(o.open),"data-disabled":o.disabled?"":void 0,disabled:o.disabled,...r,ref:t,onClick:ke(e.onClick,o.onOpenToggle)})});pe.displayName=ue;var Q="CollapsibleContent",fe=a.forwardRef((e,t)=>{const{forceMount:n,...r}=e,o=K(Q,e.__scopeCollapsible);return s.jsx(ce,{present:n||o.open,children:({present:i})=>s.jsx(ze,{...r,ref:t,present:i})})});fe.displayName=Q;var ze=a.forwardRef((e,t)=>{const{__scopeCollapsible:n,present:r,children:o,...i}=e,c=K(Q,n),[l,d]=a.useState(r),u=a.useRef(null),m=se(t,u),h=a.useRef(0),N=h.current,f=a.useRef(0),v=f.current,g=c.open||l,C=a.useRef(g),y=a.useRef(void 0);return a.useEffect(()=>{const p=requestAnimationFrame(()=>C.current=!1);return()=>cancelAnimationFrame(p)},[]),W(()=>{const p=u.current;if(p){y.current=y.current||{transitionDuration:p.style.transitionDuration,animationName:p.style.animationName},p.style.transitionDuration="0s",p.style.animationName="none";const b=p.getBoundingClientRect();h.current=b.height,f.current=b.width,C.current||(p.style.transitionDuration=y.current.transitionDuration,p.style.animationName=y.current.animationName),d(r)}},[c.open,r]),s.jsx(B.div,{"data-state":z(c.open),"data-disabled":c.disabled?"":void 0,id:c.contentId,hidden:!g,...i,ref:m,style:{"--radix-collapsible-content-height":N?`${N}px`:void 0,"--radix-collapsible-content-width":v?`${v}px`:void 0,...e.style},children:g&&o})});function z(e){return e?"open":"closed"}var Ye=de,Ze=pe,Je=fe,A="Accordion",Xe=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[Y,He,et]=Te(A),[_,pt]=F(A,[et,le]),Z=le(),me=x.forwardRef((e,t)=>{const{type:n,...r}=e,o=r,i=r;return s.jsx(Y.Provider,{scope:e.__scopeAccordion,children:n==="multiple"?s.jsx(rt,{...i,ref:t}):s.jsx(ot,{...o,ref:t})})});me.displayName=A;var[he,tt]=_(A),[xe,nt]=_(A,{collapsible:!1}),ot=x.forwardRef((e,t)=>{const{value:n,defaultValue:r,onValueChange:o=()=>{},collapsible:i=!1,...c}=e,[l,d]=U({prop:n,defaultProp:r,onChange:o});return s.jsx(he,{scope:e.__scopeAccordion,value:l?[l]:[],onItemOpen:d,onItemClose:x.useCallback(()=>i&&d(""),[i,d]),children:s.jsx(xe,{scope:e.__scopeAccordion,collapsible:i,children:s.jsx(Ce,{...c,ref:t})})})}),rt=x.forwardRef((e,t)=>{const{value:n,defaultValue:r,onValueChange:o=()=>{},...i}=e,[c=[],l]=U({prop:n,defaultProp:r,onChange:o}),d=x.useCallback(m=>l((h=[])=>[...h,m]),[l]),u=x.useCallback(m=>l((h=[])=>h.filter(N=>N!==m)),[l]);return s.jsx(he,{scope:e.__scopeAccordion,value:c,onItemOpen:d,onItemClose:u,children:s.jsx(xe,{scope:e.__scopeAccordion,collapsible:!0,children:s.jsx(Ce,{...i,ref:t})})})}),[it,M]=_(A),Ce=x.forwardRef((e,t)=>{const{__scopeAccordion:n,disabled:r,dir:o,orientation:i="vertical",...c}=e,l=x.useRef(null),d=k(l,t),u=He(n),h=Pe(o)==="ltr",N=De(e.onKeyDown,f=>{var X;if(!Xe.includes(f.key))return;const v=f.target,g=u().filter(D=>{var H;return!((H=D.ref.current)!=null&&H.disabled)}),C=g.findIndex(D=>D.ref.current===v),y=g.length;if(C===-1)return;f.preventDefault();let p=C;const b=0,w=y-1,P=()=>{p=C+1,p>w&&(p=b)},T=()=>{p=C-1,p<b&&(p=w)};switch(f.key){case"Home":p=b;break;case"End":p=w;break;case"ArrowRight":i==="horizontal"&&(h?P():T());break;case"ArrowDown":i==="vertical"&&P();break;case"ArrowLeft":i==="horizontal"&&(h?T():P());break;case"ArrowUp":i==="vertical"&&T();break}const Ie=p%y;(X=g[Ie].ref.current)==null||X.focus()});return s.jsx(it,{scope:n,disabled:r,direction:o,orientation:i,children:s.jsx(Y.Slot,{scope:n,children:s.jsx(re.div,{...c,"data-orientation":i,ref:d,onKeyDown:r?void 0:N})})})}),E="AccordionItem",[st,J]=_(E),ve=x.forwardRef((e,t)=>{const{__scopeAccordion:n,value:r,...o}=e,i=M(E,n),c=tt(E,n),l=Z(n),d=ne(),u=r&&c.value.includes(r)||!1,m=i.disabled||e.disabled;return s.jsx(st,{scope:n,open:u,disabled:m,triggerId:d,children:s.jsx(Ye,{"data-orientation":i.orientation,"data-state":we(u),...l,...o,ref:t,disabled:m,open:u,onOpenChange:h=>{h?c.onItemOpen(r):c.onItemClose(r)}})})});ve.displayName=E;var ge="AccordionHeader",ye=x.forwardRef((e,t)=>{const{__scopeAccordion:n,...r}=e,o=M(A,n),i=J(ge,n);return s.jsx(re.h3,{"data-orientation":o.orientation,"data-state":we(i.open),"data-disabled":i.disabled?"":void 0,...r,ref:t})});ye.displayName=ge;var L="AccordionTrigger",Ne=x.forwardRef((e,t)=>{const{__scopeAccordion:n,...r}=e,o=M(A,n),i=J(L,n),c=nt(L,n),l=Z(n);return s.jsx(Y.ItemSlot,{scope:n,children:s.jsx(Ze,{"aria-disabled":i.open&&!c.collapsible||void 0,"data-orientation":o.orientation,id:i.triggerId,...l,...r,ref:t})})});Ne.displayName=L;var be="AccordionContent",Ae=x.forwardRef((e,t)=>{const{__scopeAccordion:n,...r}=e,o=M(A,n),i=J(be,n),c=Z(n);return s.jsx(Je,{role:"region","aria-labelledby":i.triggerId,"data-orientation":o.orientation,...c,...r,ref:t,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}})});Ae.displayName=be;function we(e){return e?"open":"closed"}var at=me,ct=ve,lt=ye,Re=Ne,je=Ae;const dt=at,R=a.forwardRef(({className:e,...t},n)=>s.jsx(ct,{ref:n,className:q("border-b",e),...t}));R.displayName="AccordionItem";const j=a.forwardRef(({className:e,children:t,...n},r)=>s.jsx(lt,{className:"flex",children:s.jsxs(Re,{ref:r,className:q("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",e),...n,children:[t,s.jsx(Se,{className:"h-4 w-4 shrink-0 transition-transform duration-200 text-blue-600"})]})}));j.displayName=Re.displayName;const I=a.forwardRef(({className:e,children:t,...n},r)=>s.jsx(je,{ref:r,className:q("overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",e),...n,children:s.jsx("div",{className:"pb-4 pt-0",children:t})}));I.displayName=je.displayName;function ft(){return s.jsxs("div",{className:"container py-12",children:[s.jsx("h1",{className:"text-3xl font-bold mb-8 text-center text-primary",children:"Frequently Asked Questions"}),s.jsx("div",{className:"max-w-3xl mx-auto",children:s.jsxs(dt,{type:"single",collapsible:!0,className:"w-full",children:[s.jsxs(R,{value:"item-1",children:[s.jsx(j,{className:"text-primary",children:"What is WalletConnect?"}),s.jsx(I,{className:"text-blue-600",children:"WalletConnect is an open protocol for connecting decentralized applications to mobile wallets with QR code scanning or deep linking. It allows you to securely interact with multiple blockchain networks through your preferred wallet application."})]}),s.jsxs(R,{value:"item-2",children:[s.jsx(j,{className:"text-primary",children:"How do I connect my wallet?"}),s.jsx(I,{className:"text-blue-600",children:"Select your wallet from our supported options, then follow the connection instructions for your specific wallet. This usually involves scanning a QR code or approving a connection request in your wallet app."})]}),s.jsxs(R,{value:"item-3",children:[s.jsx(j,{className:"text-primary",children:"Is WalletConnect secure?"}),s.jsx(I,{className:"text-blue-600",children:"Yes, WalletConnect uses end-to-end encryption to secure all communications between your devices and applications. Your private keys never leave your device, and you maintain full control of your assets at all times."})]}),s.jsxs(R,{value:"item-4",children:[s.jsx(j,{className:"text-primary",children:"Which wallets are supported?"}),s.jsx(I,{className:"text-blue-600",children:"We support a wide range of popular wallets including MetaMask, Trust Wallet, Rainbow, Coinbase Wallet, and many others. Our list of supported wallets continues to grow as we partner with more wallet providers."})]}),s.jsxs(R,{value:"item-5",children:[s.jsx(j,{className:"text-primary",children:"What if I encounter issues?"}),s.jsx(I,{className:"text-blue-600",children:"If you experience any problems, please visit our Support page or contact our customer service team. We're committed to providing prompt assistance to ensure you have a smooth experience."})]})]})})]})}export{ft as default};
