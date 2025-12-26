(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/react/node.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasReactNode",
    ()=>hasReactNode,
    "isPrimitiveReactNode",
    ()=>isPrimitiveReactNode
]);
const hasReactNode = (value)=>{
    return value !== undefined && value !== false && value !== null && value !== '';
};
function isPrimitiveReactNode(node) {
    return typeof node === 'string' || typeof node === 'number';
} //# sourceMappingURL=node.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/function.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "callMultiple",
    ()=>callMultiple
]);
const callMultiple = (...fns)=>(...args)=>fns.filter((f)=>typeof f === 'function').forEach((f)=>f(...args)); //# sourceMappingURL=function.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/math.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clamp",
    ()=>clamp
]);
const clamp = (value, min, max)=>{
    return Math.max(min, Math.min(value, max));
}; //# sourceMappingURL=math.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/accessibility.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Keys",
    ()=>Keys,
    "getHorizontalSideByKey",
    ()=>getHorizontalSideByKey
]);
const Keys = {
    ENTER: 'Enter',
    SPACE: 'Space',
    TAB: 'Tab',
    ESCAPE: 'Escape',
    HOME: 'Home',
    END: 'End',
    BACKSPACE: 'Backspace',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown'
};
const getHorizontalSideByKey = (keys)=>{
    switch(keys){
        case Keys.ARROW_UP:
        case Keys.ARROW_LEFT:
            return 'left';
        case Keys.ARROW_DOWN:
        case Keys.ARROW_RIGHT:
            return 'right';
        default:
            return undefined;
    }
}; //# sourceMappingURL=accessibility.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/react/children.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Code from library from react-children-utilities
// @see https://github.com/fernandopasik/react-children-utilities/tree/main
__turbopack_context__.s([
    "childToString",
    ()=>childToString,
    "getTextFromChildren",
    ()=>getTextFromChildren
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const childToString = (child)=>{
    if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
        return '';
    }
    if (JSON.stringify(child) === '{}') {
        return '';
    }
    return child.toString();
};
const getTextFromChildren = (children)=>{
    if (!(children instanceof Array) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(children)) {
        return childToString(children);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].toArray(children).reduce((text, child)=>{
        let newText = '';
        const isValidElementResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(child);
        const hasChildren = isValidElementResult && 'children' in child.props;
        if (isValidElementResult && hasChildren) {
            newText = getTextFromChildren(child.props.children);
        } else if (isValidElementResult && !hasChildren) {
            newText = '';
        } else {
            newText = childToString(child);
        }
        return text.concat(newText);
    }, '');
}; //# sourceMappingURL=children.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/fuctions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "debounce",
    ()=>debounce,
    "isFunction",
    ()=>isFunction,
    "throttle",
    ()=>throttle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/dom.js [app-client] (ecmascript)");
;
function isFunction(value) {
    return typeof value === 'function';
}
function throttle(fn, threshold = 50, scope = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canUseDOM"] ? window : undefined) {
    let prevDate = Date.now() - threshold;
    let timeoutId;
    const throttledFn = (...args)=>{
        const timeLeft = prevDate + threshold - Date.now();
        clearTimeout(timeoutId);
        if (timeLeft > 0) {
            timeoutId = setTimeout(()=>{
                prevDate = Date.now();
                fn.apply(scope, args);
            }, timeLeft);
            return;
        }
        prevDate = Date.now();
        fn.apply(scope, args);
    };
    throttledFn.cancel = ()=>{
        clearTimeout(timeoutId);
    };
    return throttledFn;
}
function debounce(fn, delay, context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canUseDOM"] ? window : undefined) {
    let timeoutId;
    let args;
    const later = ()=>fn.apply(context, args);
    const debouncedFn = (...a)=>{
        args = a;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, delay);
    };
    debouncedFn.cancel = ()=>{
        clearTimeout(timeoutId);
    };
    return debouncedFn;
} //# sourceMappingURL=fuctions.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/chunk.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createChunks",
    ()=>createChunks
]);
const createChunks = (array, chunkSize)=>{
    const chunks = [];
    for(let i = 0; i < array.length; i += chunkSize){
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}; //# sourceMappingURL=chunk.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "range",
    ()=>range
]);
const range = (startPosition, endPosition)=>{
    const length = endPosition - startPosition + 1;
    return Array.from({
        length
    }, (_, i)=>startPosition + i);
}; //# sourceMappingURL=array.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/color.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable no-bitwise */ __turbopack_context__.s([
    "hexToRGB",
    ()=>hexToRGB
]);
const hexToRGB = (hex)=>{
    let fullHex = hex;
    // If hex is short, make it double
    if (hex.length === 4) {
        fullHex = hex.replace(/([^#])/g, '$1$1');
    }
    const bigint = parseInt(fullHex.replace('#', ''), 16);
    const channelR = bigint >> 16;
    const channelG = bigint >> 8;
    return [
        channelR & 255,
        channelG & 255,
        bigint & 255
    ];
}; /* eslint-enable no-bitwise */  //# sourceMappingURL=color.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useAppRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppRootContext",
    ()=>useAppRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$AppRoot$2f$AppRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/AppRoot/AppRootContext.js [app-client] (ecmascript)");
'use client';
;
;
const useAppRootContext = ()=>{
    const appRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$AppRoot$2f$AppRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppRootContext"]);
    if (!appRootContext.isRendered) {
        throw new Error('[TGUI] Wrap your app with <AppRoot> component');
    }
    return appRootContext;
}; //# sourceMappingURL=useAppRootContext.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/usePlatform.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlatform",
    ()=>usePlatform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useAppRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useAppRootContext.js [app-client] (ecmascript)");
'use client';
;
const usePlatform = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useAppRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppRootContext"])();
    return context.platform || 'base';
}; //# sourceMappingURL=usePlatform.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnhancedEffect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEnhancedEffect",
    ()=>useEnhancedEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/dom.js [app-client] (ecmascript)");
;
;
const useEnhancedEffect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canUseDOM"] ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]; //# sourceMappingURL=useEnhancedEffect.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useTimeout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTimeout",
    ()=>useTimeout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnhancedEffect.js [app-client] (ecmascript)");
'use client';
;
;
const useTimeout = (callbackFunction, duration)=>{
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        callbackFunction,
        duration
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnhancedEffect"])({
        "useTimeout.useEnhancedEffect": ()=>{
            options.current.callbackFunction = callbackFunction;
            options.current.duration = duration;
        }
    }["useTimeout.useEnhancedEffect"], [
        callbackFunction,
        duration
    ]);
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const clear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTimeout.useCallback[clear]": ()=>clearTimeout(timeout === null || timeout === void 0 ? void 0 : timeout.current)
    }["useTimeout.useCallback[clear]"], []);
    const set = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTimeout.useCallback[set]": ()=>{
            clear();
            timeout.current = setTimeout(options.current.callbackFunction, options.current.duration);
        }
    }["useTimeout.useCallback[set]"], [
        clear
    ]);
    return {
        set,
        clear
    };
}; //# sourceMappingURL=useTimeout.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useGlobalClicks.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGlobalClicks",
    ()=>useGlobalClicks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnhancedEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
;
;
const useGlobalClicks = (callback, ...refs)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnhancedEffect"])({
        "useGlobalClicks.useEnhancedEffect": ()=>{
            const hasNotNullRefs = refs.some({
                "useGlobalClicks.useEnhancedEffect.hasNotNullRefs": (ref)=>ref && ref.current !== null
            }["useGlobalClicks.useEnhancedEffect.hasNotNullRefs"]);
            if (!document || !hasNotNullRefs) {
                return ({
                    "useGlobalClicks.useEnhancedEffect": ()=>{}
                })["useGlobalClicks.useEnhancedEffect"];
            }
            const handleClick = {
                "useGlobalClicks.useEnhancedEffect.handleClick": (event)=>{
                    const targetEl = event.target;
                    const isClickInsideGivenRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(targetEl) && refs.some({
                        "useGlobalClicks.useEnhancedEffect.handleClick": (ref)=>ref && ref.current && ref.current.contains(targetEl)
                    }["useGlobalClicks.useEnhancedEffect.handleClick"]);
                    !isClickInsideGivenRefs && callback(event);
                }
            }["useGlobalClicks.useEnhancedEffect.handleClick"];
            document.addEventListener('click', handleClick, {
                passive: true,
                capture: true
            });
            return ({
                "useGlobalClicks.useEnhancedEffect": ()=>document.removeEventListener('click', handleClick, true)
            })["useGlobalClicks.useEnhancedEffect"];
        }
    }["useGlobalClicks.useEnhancedEffect"], [
        document,
        callback,
        ...refs
    ]);
}; //# sourceMappingURL=useGlobalClicks.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useExternalRefs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useExternRef",
    ()=>useExternRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/react/refs.js [app-client] (ecmascript)");
'use client';
;
;
function useExternRef(...externRefs) {
    const stableRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useExternRef.useMemo": ()=>({
                get current () {
                    return stableRef.current;
                },
                set current (el){
                    stableRef.current = el;
                    externRefs.forEach({
                        "useExternRef.useMemo": (ref)=>{
                            if (ref) {
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$refs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRef"])(el, ref);
                            }
                        }
                    }["useExternRef.useMemo"]);
                }
            })
    }["useExternRef.useMemo"], externRefs);
} //# sourceMappingURL=useExternalRefs.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnsureControl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "useCustomEnsuredControl",
    ()=>useCustomEnsuredControl,
    "useEnsuredControl",
    ()=>useEnsuredControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$fuctions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/fuctions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnhancedEffect.js [app-client] (ecmascript)");
'use client';
;
;
;
;
function useCustomEnsuredControl({ value, defaultValue, disabled, onChange: onChangeProp }) {
    const isControlled = value !== undefined;
    const [localValue, setLocalValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue);
    const preservedControlledValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnhancedEffect"])({
        "useCustomEnsuredControl.useEnhancedEffect": ()=>{
            preservedControlledValueRef.current = value;
        }
    }["useCustomEnsuredControl.useEnhancedEffect"]);
    const onChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCustomEnsuredControl.useCallback[onChange]": (nextValue)=>{
            if (disabled) {
                return;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$fuctions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFunction"])(nextValue)) {
                if (!isControlled) {
                    setLocalValue({
                        "useCustomEnsuredControl.useCallback[onChange]": (prevValue)=>{
                            const resolvedValue = nextValue(prevValue);
                            if (onChangeProp) {
                                onChangeProp(resolvedValue);
                            }
                            return resolvedValue;
                        }
                    }["useCustomEnsuredControl.useCallback[onChange]"]);
                } else if (onChangeProp) {
                    const resolvedValue = nextValue(preservedControlledValueRef.current);
                    onChangeProp(resolvedValue);
                }
                return;
            }
            onChangeProp && onChangeProp(nextValue);
            !isControlled && setLocalValue(nextValue);
        }
    }["useCustomEnsuredControl.useCallback[onChange]"], [
        disabled,
        isControlled,
        onChangeProp
    ]);
    return [
        isControlled ? value : localValue,
        onChange
    ];
}
function useEnsuredControl(_param) {
    var { onChange: onChangeProp, disabled } = _param, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "onChange",
        "disabled"
    ]);
    const [value, onChangeValue] = useCustomEnsuredControl(props);
    const onChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEnsuredControl.useCallback[onChange]": (e)=>{
            if (disabled) {
                return;
            }
            onChangeValue(e.target.value);
            onChangeProp && onChangeProp(e);
        }
    }["useEnsuredControl.useCallback[onChange]"], [
        onChangeValue,
        onChangeProp,
        disabled
    ]);
    return [
        value,
        onChange
    ];
} //# sourceMappingURL=useEnsureControl.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEventListener.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEventListener",
    ()=>useEventListener
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/dom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnhancedEffect.js [app-client] (ecmascript)");
'use client';
;
;
;
;
function useEventListener(event, _cb, _options) {
    const cbRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(_cb);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnhancedEffect"])({
        "useEventListener.useEnhancedEffect": ()=>{
            cbRef.current = _cb;
        }
    }["useEventListener.useEnhancedEffect"], [
        _cb
    ]);
    // Callback function to be executed when the event occurs
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ const cb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEventListener.useCallback[cb]": (e)=>cbRef.current && cbRef.current(e)
    }["useEventListener.useCallback[cb]"], []);
    // Refs to store the detach and remove functions
    const detach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        "useEventListener.useRef[detach]": ()=>{}
    }["useEventListener.useRef[detach]"]);
    const remove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEventListener.useCallback[remove]": ()=>{
            detach.current();
            detach.current = ({
                "useEventListener.useCallback[remove]": ()=>{}
            })["useEventListener.useCallback[remove]"];
        }
    }["useEventListener.useCallback[remove]"], []);
    const add = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEventListener.useCallback[add]": (el)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canUseDOM"]) {
                return;
            }
            remove();
            if (!el) {
                return;
            }
            const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, _options);
            el.addEventListener(event, cb, options);
            detach.current = ({
                "useEventListener.useCallback[add]": ()=>el.removeEventListener(event, cb, options)
            })["useEventListener.useCallback[add]"];
        }
    }["useEventListener.useCallback[add]"], [
        _options,
        cb,
        event,
        remove
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEventListener.useEffect": ()=>remove
    }["useEventListener.useEffect"], [
        remove
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useEventListener.useMemo": ()=>({
                add,
                remove
            })
    }["useEventListener.useMemo"], [
        add,
        remove
    ]);
} //# sourceMappingURL=useEventListener.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/24/chevron_down.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon24ChevronDown",
    ()=>Icon24ChevronDown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon24ChevronDown = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "24",
        height: "24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.3 7.54a1 1 0 0 1 1.4 0l6.8 6.8 6.8-6.8a1 1 0 1 1 1.4 1.42l-7.5 7.5a1 1 0 0 1-1.4 0l-7.5-7.5a1 1 0 0 1 0-1.42Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=chevron_down.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/24/cancel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon24Cancel",
    ()=>Icon24Cancel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon24Cancel = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "24",
        height: "24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.5 4.44a.9.9 0 0 1 1.27 0L12 10.56l6.22-6.14a.9.9 0 0 1 1.27 1.28l-6.21 6.13 6.2 6.13a.9.9 0 0 1-1.26 1.28L12 13.1l-6.23 6.15a.9.9 0 1 1-1.26-1.28l6.2-6.13-6.2-6.13a.9.9 0 0 1-.01-1.27Z",
            fill: "#A2ACB0"
        })
    }));
}; //# sourceMappingURL=cancel.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/28/close.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon28Close",
    ()=>Icon28Close
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon28Close = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "28",
        height: "28",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                clipPath: "url(#close_a)",
                fill: "currentColor",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        d: "M14 28c7.66 0 14-6.35 14-14 0-7.66-6.35-14-14.01-14A14.1 14.1 0 0 0 0 14c0 7.65 6.35 14 14 14Z",
                        fillOpacity: ".04"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        opacity: ".5",
                        d: "M9.17 20C8.51 20 8 19.47 8 18.81c0-.31.11-.61.34-.83L12.31 14l-3.97-3.97A1.15 1.15 0 0 1 8 9.2c0-.67.51-1.17 1.17-1.17.33 0 .59.11.82.33l3.99 3.98 4.02-4c.24-.24.5-.34.81-.34.66 0 1.19.52 1.19 1.17 0 .33-.1.6-.36.85L15.67 14l3.96 3.97c.24.21.36.51.36.84 0 .66-.53 1.19-1.2 1.19-.33 0-.64-.11-.85-.34l-3.96-3.98-3.95 3.98c-.23.23-.53.34-.86.34Z",
                        fillOpacity: ".8"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("clipPath", {
                    id: "close_a",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        fill: "#fff",
                        d: "M0 0h28v28H0z"
                    })
                })
            })
        ]
    }));
}; //# sourceMappingURL=close.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/28/close_ambient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon28CloseAmbient",
    ()=>Icon28CloseAmbient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon28CloseAmbient = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "28",
        height: "28",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("g", {
                clipPath: "url(#close_ambient_a)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        d: "M14 28c7.66 0 14-6.35 14-14 0-7.66-6.35-14-14.01-14A14.1 14.1 0 0 0 0 14c0 7.65 6.35 14 14 14Z",
                        fill: "#000",
                        fillOpacity: ".1"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        d: "M9.17 20C8.51 20 8 19.47 8 18.81c0-.31.11-.61.34-.83L12.31 14l-3.97-3.97A1.15 1.15 0 0 1 8 9.2c0-.67.51-1.17 1.17-1.17.33 0 .59.11.82.33l3.99 3.98 4.02-4c.24-.24.5-.34.81-.34.66 0 1.19.52 1.19 1.17 0 .33-.1.6-.36.85L15.67 14l3.96 3.97c.24.21.36.51.36.84 0 .66-.53 1.19-1.2 1.19-.33 0-.64-.11-.85-.34l-3.96-3.98-3.95 3.98c-.23.23-.53.34-.86.34Z",
                        fill: "#fff"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("clipPath", {
                    id: "close_ambient_a",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                        fill: "#fff",
                        d: "M0 0h28v28H0z"
                    })
                })
            })
        ]
    }));
}; //# sourceMappingURL=close_ambient.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/12/quote.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon12Quote",
    ()=>Icon12Quote
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon12Quote = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "12",
        height: "12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M3.07 7.7c.14-.36-.14-.74-.5-.93A2 2 0 1 1 5.5 5V5c0 1.55-.27 2.67-.57 3.43a5.33 5.33 0 0 1-.67 1.22 1 1 0 0 1-1.53-1.3h.01l.07-.1c.06-.1.16-.28.26-.54ZM4.26 9.65ZM8.07 7.7c.14-.36-.14-.74-.5-.93A2 2 0 1 1 10.5 5V5c0 1.55-.27 2.67-.57 3.43a5.33 5.33 0 0 1-.67 1.22 1 1 0 0 1-1.53-1.3h.01l.07-.1c.06-.1.16-.28.26-.54ZM9.26 9.65Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=quote.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/16/chevron.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon16Chevron",
    ()=>Icon16Chevron
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon16Chevron = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "16",
        height: "16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "m6 3 5 5-5 5",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        })
    }));
}; //# sourceMappingURL=chevron.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/28/attach.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon28Attach",
    ()=>Icon28Attach
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon28Attach = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "28",
        height: "28",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M20.286 6.445c-2.342-2.307-6.19-2.307-8.53 0l-5.353 5.272a.99.99 0 0 1-1.388-1.41l5.352-5.272c3.112-3.065 8.196-3.065 11.307 0a7.598 7.598 0 0 1 0 10.885l-7.347 7.238c-2.355 2.32-6.198 2.32-8.553 0a5.762 5.762 0 0 1 0-8.253l7.381-7.27c1.585-1.56 4.141-1.632 5.814-.167a4.06 4.06 0 0 1 .082 6.068l-6.158 5.688a.99.99 0 0 1-1.343-1.454l6.16-5.687c.93-.859.91-2.29-.044-3.127a2.315 2.315 0 0 0-3.122.088l-7.381 7.27a3.784 3.784 0 0 0 0 5.435c1.584 1.56 4.191 1.56 5.775 0l7.348-7.238a5.62 5.62 0 0 0 0-8.066Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=attach.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/20/chevron_down.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon20ChevronDown",
    ()=>Icon20ChevronDown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon20ChevronDown = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "20",
        height: "20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M3.29289 6.29289c.39053-.39052 1.02369-.39052 1.41422 0L10 11.5858l5.2929-5.29291c.3905-.39052 1.0237-.39052 1.4142 0 .3905.39053.3905 1.02369 0 1.41422l-6 5.99999c-.3905.3905-1.02368.3905-1.41421 0l-6-5.99999c-.39052-.39053-.39052-1.02369 0-1.41422Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=chevron_down.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/16/cancel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon16Cancel",
    ()=>Icon16Cancel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon16Cancel = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "16",
        height: "16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M3.3 3.3a1 1 0 0 1 1.4 0L8 6.58l3.3-3.3a1 1 0 1 1 1.4 1.42L9.42 8l3.3 3.3a1 1 0 0 1-1.42 1.4L8 9.42l-3.3 3.3a1 1 0 0 1-1.4-1.42L6.58 8l-3.3-3.3a1 1 0 0 1 0-1.4Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=cancel.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/20/select.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon20Select",
    ()=>Icon20Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon20Select = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "20",
        height: "20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M2.5 10.821 7 15.75l10.5-11.5",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        })
    }));
}; //# sourceMappingURL=select.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/20/select_ios.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon20SelectIOS",
    ()=>Icon20SelectIOS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon20SelectIOS = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "20",
        height: "20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M8.174 18c-.473 0-.876-.21-1.208-.63l-4.602-5.82a1.727 1.727 0 0 1-.284-.465 1.423 1.423 0 0 1-.08-.474c0-.365.118-.666.355-.903s.536-.356.898-.356c.408 0 .752.18 1.03.539l3.856 5.017 7.525-12.242c.154-.243.313-.414.48-.51.165-.104.372-.156.621-.156.361 0 .657.116.889.347.23.23.346.526.346.884 0 .146-.024.292-.071.438a2.017 2.017 0 0 1-.222.456L9.39 17.335c-.284.443-.69.665-1.217.665Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=select_ios.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/36/backspace.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon36Backspace",
    ()=>Icon36Backspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon36Backspace = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "36",
        height: "36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M15.886 6.5h8.855c.805 0 1.47 0 2.01.044.563.046 1.08.145 1.564.392a4 4 0 0 1 1.749 1.748c.247.485.345 1.002.391 1.564.045.541.045 1.206.045 2.01v11.483c0 .805 0 1.47-.045 2.01-.046.563-.144 1.08-.391 1.565a4 4 0 0 1-1.748 1.748c-.486.247-1.002.346-1.565.392-.54.044-1.205.044-2.01.044h-8.855c-.635 0-1.115 0-1.578-.11a4.001 4.001 0 0 1-1.156-.48c-.405-.248-.745-.587-1.193-1.037l-.072-.072-5.73-5.729c-.569-.57-1.039-1.039-1.39-1.453-.365-.43-.66-.865-.829-1.383a4 4 0 0 1 0-2.472c.168-.518.464-.953.829-1.383.351-.414.821-.884 1.39-1.453l5.73-5.73.072-.071c.448-.45.787-.789 1.193-1.038a4 4 0 0 1 1.156-.479c.463-.11.943-.11 1.578-.11Zm.102 2c-.782 0-1.01.006-1.213.055-.204.05-.399.13-.578.24-.178.109-.344.265-.896.818l-5.7 5.7c-.606.606-1.017 1.018-1.31 1.362-.284.335-.397.54-.45.707a2 2 0 0 0 0 1.236c.053.167.166.371.45.707.293.344.704.756 1.31 1.362l5.7 5.7c.552.552.718.709.896.818.18.11.374.19.578.24.204.049.431.055 1.213.055H24.7c.856 0 1.438 0 1.889-.038.438-.035.662-.1.819-.18a2 2 0 0 0 .874-.874c.08-.157.144-.38.18-.82.037-.45.038-1.032.038-1.888V12.3c0-.857-.001-1.439-.038-1.889-.036-.438-.1-.663-.18-.819a2 2 0 0 0-.875-.874c-.156-.08-.38-.145-.819-.18-.45-.037-1.032-.038-1.889-.038h-8.711Zm-1.196 4.793a1 1 0 0 1 1.415 0l3.293 3.293 3.292-3.293a1 1 0 0 1 1.415 1.414L20.914 18l3.293 3.293a1 1 0 0 1-1.415 1.414L19.5 19.414l-3.292 3.293a1 1 0 1 1-1.415-1.414L18.085 18l-3.293-3.293a1 1 0 0 1 0-1.414Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=backspace.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/36/face_id.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon36FaceId",
    ()=>Icon36FaceId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon36FaceId = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "36",
        height: "36",
        viewBox: "0 0 36 36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M5.14402 13.0996C4.38134 13.0996 4 12.7086 4 11.9264V8.42105C4 6.95214 4.37181 5.85045 5.11542 5.11599C5.86857 4.372 6.99353 4 8.4903 4H11.9796C12.7613 4 13.1522 4.38154 13.1522 5.14461C13.1522 5.91722 12.7613 6.30353 11.9796 6.30353H8.5189C7.80388 6.30353 7.2557 6.49429 6.87436 6.87583C6.49302 7.24783 6.30235 7.80583 6.30235 8.54982V11.9264C6.30235 12.7086 5.91624 13.0996 5.14402 13.0996ZM30.8417 13.0996C30.079 13.0996 29.6977 12.7086 29.6977 11.9264V8.54982C29.6977 7.80583 29.5022 7.24783 29.1113 6.87583C28.7205 6.49429 28.1723 6.30353 27.4668 6.30353H24.0061C23.2339 6.30353 22.8478 5.91722 22.8478 5.14461C22.8478 4.38154 23.2339 4 24.0061 4H27.5097C29.0065 4 30.1267 4.372 30.8703 5.11599C31.6234 5.85045 32 6.95214 32 8.42105V11.9264C32 12.7086 31.6139 13.0996 30.8417 13.0996ZM8.4903 32C6.99353 32 5.86857 31.628 5.11542 30.884C4.37181 30.1495 4 29.0431 4 27.5646V24.0736C4 23.2914 4.38134 22.9004 5.14402 22.9004C5.91624 22.9004 6.30235 23.2914 6.30235 24.0736V27.4502C6.30235 28.1942 6.49302 28.7522 6.87436 29.1242C7.2557 29.5057 7.80388 29.6965 8.5189 29.6965H11.9796C12.7613 29.6965 13.1522 30.0828 13.1522 30.8554C13.1522 31.6185 12.7613 32 11.9796 32H8.4903ZM24.0061 32C23.2339 32 22.8478 31.6185 22.8478 30.8554C22.8478 30.0828 23.2339 29.6965 24.0061 29.6965H27.4668C28.1723 29.6965 28.7205 29.5057 29.1113 29.1242C29.5022 28.7522 29.6977 28.1942 29.6977 27.4502V24.0736C29.6977 23.2914 30.079 22.9004 30.8417 22.9004C31.6139 22.9004 32 23.2914 32 24.0736V27.5646C32 29.0431 31.6234 30.1495 30.8703 30.884C30.1267 31.628 29.0065 32 27.5097 32H24.0061ZM12.5373 17.0056C12.2227 17.0056 11.9605 16.9055 11.7508 16.7052C11.5506 16.4953 11.4505 16.2282 11.4505 15.9039V13.8436C11.4505 13.5289 11.5506 13.2666 11.7508 13.0567C11.9605 12.8469 12.2227 12.742 12.5373 12.742C12.8614 12.742 13.1284 12.8469 13.3381 13.0567C13.5478 13.2666 13.6527 13.5289 13.6527 13.8436V15.9039C13.6527 16.2282 13.5478 16.4953 13.3381 16.7052C13.1284 16.9055 12.8614 17.0056 12.5373 17.0056ZM16.8417 20.3822C16.4889 20.3822 16.2125 20.2964 16.0123 20.1247C15.8121 19.953 15.712 19.7145 15.712 19.4093C15.712 19.1518 15.7978 18.9371 15.9694 18.7655C16.1505 18.5842 16.3698 18.4936 16.6272 18.4936H17.1134C17.1801 18.4936 17.2326 18.4793 17.2707 18.4507C17.3184 18.4125 17.3422 18.3553 17.3422 18.279V13.6433C17.3422 13.3763 17.428 13.1569 17.5996 12.9852C17.7712 12.8135 17.9952 12.7276 18.2717 12.7276C18.5482 12.7276 18.7722 12.8135 18.9438 12.9852C19.1154 13.1569 19.2012 13.3763 19.2012 13.6433V18.1502C19.2012 18.8751 19.0058 19.4284 18.6149 19.8099C18.2336 20.1915 17.6854 20.3822 16.9704 20.3822C16.9418 20.3822 16.9179 20.3822 16.8989 20.3822C16.8798 20.3822 16.8607 20.3822 16.8417 20.3822ZM23.3912 17.0056C23.0671 17.0056 22.8001 16.9055 22.5904 16.7052C22.3902 16.4953 22.2901 16.2282 22.2901 15.9039V13.8436C22.2901 13.5289 22.3902 13.2666 22.5904 13.0567C22.8001 12.8469 23.0671 12.742 23.3912 12.742C23.7058 12.742 23.968 12.8469 24.1777 13.0567C24.3875 13.2666 24.4923 13.5289 24.4923 13.8436V15.9039C24.4923 16.2282 24.3875 16.4953 24.1777 16.7052C23.968 16.9055 23.7058 17.0056 23.3912 17.0056ZM17.9142 25.1896C17.0466 25.1896 16.1886 25.0227 15.3401 24.6888C14.4917 24.3454 13.7766 23.8447 13.1951 23.1865C13.1093 23.0816 13.0426 22.9767 12.9949 22.8717C12.9472 22.7573 12.9234 22.6381 12.9234 22.5141C12.9234 22.247 13.014 22.0276 13.1951 21.8559C13.3762 21.6747 13.5955 21.5841 13.8529 21.5841C14.0245 21.5841 14.1675 21.6222 14.2819 21.6985C14.3963 21.7748 14.506 21.8654 14.6108 21.9704C15.0303 22.3901 15.5308 22.7239 16.1124 22.9719C16.7034 23.2199 17.3041 23.3439 17.9142 23.3439C18.5434 23.3439 19.1536 23.2199 19.7446 22.9719C20.3357 22.7144 20.8219 22.3805 21.2033 21.9704C21.4511 21.7128 21.699 21.5841 21.9469 21.5841C22.2138 21.5841 22.4379 21.6747 22.619 21.8559C22.8001 22.0276 22.8907 22.247 22.8907 22.5141C22.8907 22.6571 22.8669 22.7859 22.8192 22.9004C22.7715 23.0148 22.7048 23.115 22.619 23.2008C21.9993 23.8304 21.2748 24.3216 20.4454 24.6745C19.6159 25.0179 18.7722 25.1896 17.9142 25.1896Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=face_id.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/36/fingerprint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon36FingerPrint",
    ()=>Icon36FingerPrint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon36FingerPrint = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "36",
        height: "36",
        viewBox: "0 0 36 36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M13.4695 28.0274C13.6075 27.5399 14.0945 27.2268 14.6042 27.3165C15.148 27.4126 15.5117 27.9309 15.4158 28.4747L15.3445 28.8341C15.1617 29.6705 14.8715 30.4831 14.6501 31.1788L14.614 31.2755C14.4123 31.74 13.8873 31.9857 13.3943 31.8292C12.868 31.6618 12.5765 31.0986 12.7439 30.5724L13.1511 29.3067C13.2732 28.9071 13.3764 28.5216 13.446 28.1271L13.4695 28.0274Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M20.5847 18.4425C21.137 18.4425 21.5847 18.8902 21.5847 19.4425C21.5847 20.9711 21.586 23.0619 21.4216 25.1788C21.2585 27.2797 20.9275 29.4942 20.2263 31.2472C20.0212 31.7597 19.4391 32.0096 18.9265 31.8048C18.414 31.5997 18.1642 31.0176 18.3689 30.505C18.9552 29.0392 19.2687 27.0683 19.4275 25.0235C19.585 22.9948 19.5847 20.9781 19.5847 19.4425C19.5847 18.8904 20.0327 18.4428 20.5847 18.4425Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M25.5613 24.7306C26.111 24.784 26.5131 25.2727 26.4597 25.8224C26.364 26.8063 25.9553 29.0419 25.8015 29.8106C25.6929 30.3519 25.1661 30.7031 24.6248 30.5948C24.0835 30.4863 23.7324 29.9594 23.8406 29.4181C23.9958 28.6418 24.3848 26.4994 24.4695 25.629C24.5229 25.0795 25.0118 24.6775 25.5613 24.7306Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M9.94507 27.9728C9.77042 28.4967 9.20436 28.7802 8.68042 28.6056C8.15692 28.4307 7.87416 27.8646 8.04858 27.3409L9.94507 27.9728Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M9.77905 15.0929C9.96237 14.5722 10.5337 14.2986 11.0544 14.4815C11.5752 14.665 11.849 15.2361 11.6658 15.7569C11.4125 16.477 11.2829 17.2349 11.2839 17.9982V18.0001C11.2839 21.9431 10.6305 25.9165 9.94507 27.9728L8.04858 27.3409C8.61312 25.6473 9.20526 22.2435 9.2771 18.7081L9.28394 18.0001C9.28265 17.0101 9.45052 16.0268 9.77905 15.0929Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M5.14722 22.1505C5.6995 22.1505 6.14722 22.5982 6.14722 23.1505C6.1472 23.7028 5.69949 24.1505 5.14722 24.1505H5.13452C4.58228 24.1505 4.13454 23.7027 4.13452 23.1505C4.13452 22.5982 4.58226 22.1505 5.13452 22.1505H5.14722Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M18.0105 14.4249C18.5626 14.4251 19.0104 14.8728 19.0105 15.4249C19.0105 15.9771 18.5626 16.4247 18.0105 16.4249C17.5928 16.4249 17.1916 16.5906 16.8962 16.8858C16.6009 17.1812 16.4353 17.5824 16.4353 18.0001C16.4353 19.3632 16.3024 21.3208 16.0945 23.2569C16.0355 23.8059 15.5429 24.2034 14.9939 24.1446C14.4448 24.0857 14.0472 23.5922 14.1062 23.0431C14.3103 21.1426 14.4353 19.2634 14.4353 18.0001C14.4353 17.052 14.8118 16.1422 15.4822 15.4718C16.1526 14.8014 17.0624 14.4249 18.0105 14.4249Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M30.4294 14.4444C30.9368 14.3418 31.4334 14.6431 31.5837 15.1271L31.6091 15.2257L31.6492 15.4825C31.6865 15.7724 31.7145 16.1572 31.7351 16.5714C31.764 17.1503 31.7832 17.8628 31.7888 18.6261C31.8 20.1464 31.7577 21.9111 31.6238 23.2501C31.5687 23.7994 31.0784 24.2003 30.5291 24.1456C29.9796 24.0906 29.5787 23.6004 29.6335 23.0509C29.7571 21.8148 29.7998 20.1312 29.7888 18.6407C29.7833 17.8993 29.7642 17.2158 29.7371 16.671C29.7157 16.2425 29.6905 15.9366 29.6687 15.7589L29.6482 15.6241L29.6335 15.5226C29.5835 15.0183 29.9222 14.5475 30.4294 14.4444Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M18.0115 9.26963C19.5432 9.26991 21.0484 9.67338 22.3748 10.4396C23.7012 11.2059 24.8027 12.3089 25.5681 13.6358C26.3334 14.9628 26.736 16.4683 26.7351 18.0001V20.5753C26.735 21.1275 26.2873 21.5753 25.7351 21.5753C25.1831 21.575 24.7352 21.1273 24.7351 20.5753V17.9991C24.7358 16.8184 24.4256 15.6577 23.8357 14.6349C23.2458 13.6123 22.3969 12.7626 21.3748 12.172C20.3523 11.5813 19.1913 11.2698 18.0105 11.2696C16.8299 11.2696 15.6697 11.5807 14.6472 12.171C14.169 12.4469 13.5571 12.283 13.281 11.8048C13.0051 11.3266 13.1691 10.7147 13.6472 10.4386C14.974 9.67259 16.4795 9.26944 18.0115 9.26963Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M13.6218 4.83604C16.3845 3.91518 19.3676 3.8868 22.1472 4.75499C24.753 5.56898 27.0576 7.13257 28.7751 9.24424L29.1111 9.67393L29.1677 9.75889C29.4295 10.1929 29.3249 10.7635 28.9109 11.0743C28.4691 11.4057 27.8419 11.316 27.5105 10.8741C26.0151 8.88052 23.9303 7.40731 21.5515 6.66417C19.1725 5.92106 16.6191 5.94536 14.2546 6.7335C11.8902 7.52167 9.83309 9.03392 8.37573 11.0558C6.91848 13.0776 6.13462 15.5078 6.13452 18.0001C6.13433 18.5522 5.68669 19.0001 5.13452 19.0001C4.58238 19.0001 4.13472 18.5522 4.13452 18.0001C4.13462 15.0881 5.05102 12.2492 6.75366 9.88682C8.4564 7.52453 10.8593 5.75697 13.6218 4.83604Z",
                fill: "currentColor"
            })
        ]
    }));
}; //# sourceMappingURL=fingerprint.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/36/scan_face.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon36ScanFace",
    ()=>Icon36ScanFace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon36ScanFace = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "36",
        height: "36",
        viewBox: "0 0 36 36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M5 22C5.55227 22 5.99998 22.4477 6 23V26C6 28.2091 7.79086 30 10 30H13C13.5523 30 14 30.4477 14 31C14 31.5522 13.5523 32 13 32H10C6.68629 32 4 29.3137 4 26V23C4.00002 22.4477 4.44773 22 5 22Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M31 22C31.5523 22 32 22.4477 32 23V26C32 29.3137 29.3137 32 26 32H23C22.4477 32 22 31.5522 22 31C22 30.4477 22.4477 30 23 30H26C28.2091 30 30 28.2091 30 26V23C30 22.4477 30.4477 22 31 22Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M23.2002 20.4003C23.5315 19.9586 24.1578 19.8689 24.5996 20.2002C25.0414 20.5315 25.131 21.1577 24.7998 21.5996L24 21C24.7726 21.5794 24.7991 21.5986 24.7998 21.5996L24.7979 21.6035L24.7861 21.6191C24.7791 21.6282 24.7693 21.6397 24.7578 21.6543C24.7348 21.6833 24.7028 21.7229 24.6621 21.7714C24.5805 21.8687 24.4629 22.0031 24.3115 22.1611C24.0096 22.4761 23.5667 22.8922 22.9941 23.3086C21.8525 24.1388 20.1505 25 18 25C15.8495 25 14.1475 24.1388 13.0059 23.3086C12.4333 22.8922 11.9904 22.4761 11.6885 22.1611C11.5371 22.0031 11.4195 21.8687 11.3379 21.7714C11.2972 21.7229 11.2652 21.6833 11.2422 21.6543C11.2307 21.6397 11.2209 21.6282 11.2139 21.6191L11.2021 21.6035L11.2012 21.6015C11.2015 21.6007 11.2226 21.583 12 21L11.2002 21.5996C10.869 21.1577 10.9586 20.5315 11.4004 20.2002C11.8421 19.869 12.4674 19.9589 12.7988 20.4003C12.8008 20.4029 12.8056 20.4068 12.8105 20.413C12.8223 20.4279 12.8422 20.4531 12.8701 20.4863C12.9262 20.5531 13.014 20.6534 13.1318 20.7763C13.369 21.0238 13.7232 21.358 14.1816 21.6914C15.1025 22.361 16.4005 23 18 23C19.5995 23 20.8975 22.361 21.8184 21.6914C22.2768 21.358 22.631 21.0238 22.8682 20.7763C22.986 20.6534 23.0738 20.5531 23.1299 20.4863C23.1578 20.4531 23.1777 20.4279 23.1895 20.413L23.2002 20.4003Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M13.5 12C14.4665 12 15.25 12.7835 15.25 13.75C15.25 14.7165 14.4665 15.5 13.5 15.5C12.5335 15.5 11.75 14.7165 11.75 13.75C11.75 12.7835 12.5335 12 13.5 12Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M22.5 12C23.4665 12 24.25 12.7835 24.25 13.75C24.25 14.7165 23.4665 15.5 22.5 15.5C21.5335 15.5 20.75 14.7165 20.75 13.75C20.75 12.7835 21.5335 12 22.5 12Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M13 3.99996C13.5523 3.99996 14 4.44769 14 4.99996C14 5.55224 13.5523 5.99996 13 5.99996H10C7.79088 5.99996 6.00002 7.79084 6 9.99996V13C6 13.5522 5.55228 14 5 14C4.44772 14 4 13.5522 4 13V9.99996C4.00002 6.68627 6.68631 3.99996 10 3.99996H13Z",
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M26 3.99996C29.3137 3.99996 32 6.68627 32 9.99996V13C32 13.5522 31.5523 14 31 14C30.4477 14 30 13.5522 30 13V9.99996C30 7.79084 28.2091 5.99996 26 5.99996H23C22.4477 5.99996 22 5.55224 22 4.99996C22 4.44769 22.4477 3.99996 23 3.99996H26Z",
                fill: "currentColor"
            })
        ]
    }));
}; //# sourceMappingURL=scan_face.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/24/chevron_left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon24ChevronLeft",
    ()=>Icon24ChevronLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon24ChevronLeft = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "24",
        height: "24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M15.7071 3.79289c-.3905-.39052-1.0237-.39052-1.4142 0L6.79289 11.2929c-.39052.3905-.39052 1.0237 0 1.4142l7.50001 7.5c.3905.3905 1.0237.3905 1.4142 0 .3905-.3905.3905-1.0237 0-1.4142L8.91421 12l6.79289-6.79289c.3905-.39053.3905-1.02369 0-1.41422Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=chevron_left.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/24/chevron_right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon24ChevronRight",
    ()=>Icon24ChevronRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
;
const Icon24ChevronRight = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        width: "24",
        height: "24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7.29289 3.79289c.39053-.39052 1.02369-.39052 1.41422 0l7.49999 7.50001c.3905.3905.3905 1.0237 0 1.4142l-7.49999 7.5c-.39053.3905-1.02369.3905-1.41422 0-.39052-.3905-.39052-1.0237 0-1.4142L14.0858 12 7.29289 5.20711c-.39052-.39053-.39052-1.02369 0-1.41422Z",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=chevron_right.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Accordion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accordion"],
    "AppRoot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppRoot"],
    "Avatar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"],
    "AvatarStack",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarStack"],
    "Badge",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"],
    "Banner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Banner"],
    "Blockquote",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Blockquote"],
    "Breadcrumbs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Breadcrumbs"],
    "Button",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"],
    "ButtonCell",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonCell"],
    "Caption",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Caption"],
    "Card",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"],
    "Cell",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"],
    "Checkbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"],
    "Chip",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chip"],
    "CircularProgress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircularProgress"],
    "ColorInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorInput"],
    "CompactPagination",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompactPagination"],
    "Divider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Divider"],
    "FileInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileInput"],
    "FixedLayout",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FixedLayout"],
    "Headline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Headline"],
    "IconButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IconButton"],
    "IconContainer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IconContainer"],
    "Image",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"],
    "Info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Info"],
    "InlineButtons",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineButtons"],
    "Input",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"],
    "LargeTitle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LargeTitle"],
    "Link",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"],
    "List",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"],
    "Modal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"],
    "Multiselect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Multiselect"],
    "Multiselectable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Multiselectable"],
    "Navigation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navigation"],
    "Pagination",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pagination"],
    "PinInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PinInput"],
    "Placeholder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Placeholder"],
    "Popper",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popper"],
    "Progress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"],
    "Radio",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radio"],
    "Rating",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rating"],
    "RootRenderer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RootRenderer"],
    "Section",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Section"],
    "SegmentedControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentedControl"],
    "Select",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"],
    "Selectable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Selectable"],
    "Skeleton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"],
    "Slider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"],
    "Snackbar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Snackbar"],
    "Spinner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"],
    "Spoiler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spoiler"],
    "Steps",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Steps"],
    "Subheadline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subheadline"],
    "Switch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"],
    "Tabbar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabbar"],
    "TabsList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"],
    "Tappable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tappable"],
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"],
    "Textarea",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"],
    "Timeline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timeline"],
    "Title",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"],
    "Tooltip",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"],
    "Typography",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Typography"],
    "VisuallyHidden",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisuallyHidden"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/index.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=81b43_%40telegram-apps_telegram-ui_dist_12ad37ae._.js.map