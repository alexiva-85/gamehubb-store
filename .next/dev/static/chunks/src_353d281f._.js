(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/css/classnames.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classNames",
    ()=>classNames,
    "isRecord",
    ()=>isRecord,
    "mergeClassNames",
    ()=>mergeClassNames
]);
function isRecord(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v);
}
function classNames(...values) {
    return values.map((value)=>{
        if (typeof value === 'string') {
            return value;
        }
        if (isRecord(value)) {
            return classNames(Object.entries(value).map((entry)=>entry[1] && entry[0]));
        }
        if (Array.isArray(value)) {
            return classNames(...value);
        }
    }).filter(Boolean).join(' ');
}
function mergeClassNames(...partials) {
    return partials.reduce((acc, partial)=>{
        if (isRecord(partial)) {
            Object.entries(partial).forEach(([key, value])=>{
                const className = classNames(acc[key], value);
                if (className) {
                    acc[key] = className;
                }
            });
        }
        return acc;
    }, {});
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Link/Link.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+sdk@3.1.2_typescript@5.9.3/node_modules/@tma.js/sdk/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$css$2f$classnames$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/css/classnames.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const Link = ({ className, onClick: propsOnClick, href, ...rest })=>{
    _s();
    const onClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Link.useCallback[onClick]": (e)=>{
            propsOnClick?.(e);
            // Compute if target path is external. In this case we would like to open link using
            // TMA method.
            let path;
            if (typeof href === 'string') {
                path = href;
            } else {
                const { search = '', pathname = '', hash = '' } = href;
                path = `${pathname}?${search}#${hash}`;
            }
            const targetUrl = new URL(path, window.location.toString());
            const currentUrl = new URL(window.location.toString());
            const isExternal = targetUrl.protocol !== currentUrl.protocol || targetUrl.host !== currentUrl.host;
            if (isExternal) {
                e.preventDefault();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["openLink"])(targetUrl.toString());
            }
        }
    }["Link.useCallback[onClick]"], [
        href,
        propsOnClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...rest,
        href: href,
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$css$2f$classnames$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classNames"])(className, 'link')
    }, void 0, false, {
        fileName: "[project]/src/components/Link/Link.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Link, "bUqifs7h7EVXqFrOnyVIJNrl0EY=");
_c = Link;
var _c;
__turbopack_context__.k.register(_c, "Link");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Page",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+sdk@3.1.2_typescript@5.9.3/node_modules/@tma.js/sdk/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Page({ children, back = true }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            if (back) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["backButton"].show();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["backButton"].hide();
            }
        }
    }["Page.useEffect"], [
        back
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["backButton"].onClick({
                "Page.useEffect": ()=>{
                    router.back();
                }
            }["Page.useEffect"]);
        }
    }["Page.useEffect"], [
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(Page, "TvQOAa6MuxS5wkANqefpxaThEc4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/tg.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getInitData",
    ()=>getInitData,
    "openExternal",
    ()=>openExternal
]);
'use client';
function getInitData() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Prefer real Telegram WebApp initData if available.
    const tg = window.Telegram;
    const initData = tg?.WebApp?.initData;
    if (initData && typeof initData === 'string' && initData.length > 0) {
        return initData;
    }
    // Fallback: allow passing initData via search param during local development.
    const url = new URL(window.location.href);
    const fromQuery = url.searchParams.get('initData');
    return fromQuery && fromQuery.length > 0 ? fromQuery : null;
}
function openExternal(url) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const tg = window.Telegram;
        const webApp = tg?.WebApp;
        if (webApp && typeof webApp.openLink === 'function') {
            webApp.openLink(url);
            return;
        }
    } catch  {
    // Ignore and fallback to window.open.
    }
    window.open(url, '_blank', 'noopener,noreferrer');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiGet",
    ()=>apiGet,
    "apiPost",
    ()=>apiPost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tg.ts [app-client] (ecmascript)");
;
async function handleResponse(res) {
    const contentType = res.headers.get('Content-Type') ?? '';
    const isJson = contentType.includes('application/json');
    const payload = isJson ? await res.json().catch(()=>({})) : await res.text();
    if (!res.ok) {
        const message = isJson && payload?.error || (typeof payload === 'string' ? payload : 'Request failed');
        const error = new Error(message);
        error.status = res.status;
        error.payload = payload;
        throw error;
    }
    return payload;
}
function buildHeaders(options) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (options?.auth) {
        let initData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitData"])();
        // In E2E / test mode we can provide initData via compile-time env.
        if (!initData) {
            const testInitData = ("TURBOPACK compile-time value", "user=1&auth_date=1700000000&hash=test") ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.E2E_TG_INIT_DATA;
            if (typeof testInitData === 'string' && testInitData.length > 0) {
                initData = testInitData;
            }
        }
        if (initData) {
            headers['x-telegram-init-data'] = initData;
        }
    }
    if (options?.idempotencyKey) {
        headers['x-idempotency-key'] = options.idempotencyKey;
    }
    return headers;
}
async function apiGet(url, options) {
    const res = await fetch(url, {
        method: 'GET',
        headers: buildHeaders(options),
        signal: options?.signal
    });
    return handleResponse(res);
}
async function apiPost(url, body, options) {
    const res = await fetch(url, {
        method: 'POST',
        headers: buildHeaders(options),
        body: JSON.stringify(body ?? {}),
        signal: options?.signal
    });
    return handleResponse(res);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cart.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "clear",
    ()=>clear,
    "getCart",
    ()=>getCart,
    "remove",
    ()=>remove,
    "setCart",
    ()=>setCart,
    "updateQty",
    ()=>updateQty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const STORAGE_KEY = 'cart:v1';
const CART_EVENT_NAME = 'cart:changed';
function assertValidCart(items) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const invalid = items.find((i)=>!Number.isFinite(i.qty) || i.qty <= 0);
    if (invalid) {
        // Dev-only assertion to ensure we never keep zero/negative qty in cart.
        // eslint-disable-next-line no-console
        console.error('Invalid cart state detected (qty must be >= 1):', items);
        throw new Error('Invalid cart state: qty must be >= 1');
    }
}
function dispatchCartChanged(items) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const event = new CustomEvent(CART_EVENT_NAME, {
            detail: items
        });
        window.dispatchEvent(event);
    } catch  {
    // Ignore event dispatch errors.
    }
}
function readStorage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item)=>({
                productId: Number(item.productId),
                qty: Number(item.qty)
            })).filter((i)=>Number.isFinite(i.productId) && i.productId > 0 && i.qty > 0);
    } catch  {
        return [];
    }
}
function writeStorage(items) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        assertValidCart(items);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch  {
    // Ignore storage errors.
    }
}
function getCart() {
    return readStorage();
}
function setCart(items) {
    writeStorage(items);
    dispatchCartChanged(items);
}
function addToCart(productId, qty = 1) {
    const items = readStorage();
    const existing = items.find((i)=>i.productId === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        const safeQty = Math.max(1, Math.floor(qty));
        items.push({
            productId,
            qty: safeQty
        });
    }
    writeStorage(items);
    dispatchCartChanged(items);
    return items;
}
function updateQty(productId, qty) {
    let items = readStorage();
    if (qty <= 0) {
        items = items.filter((i)=>i.productId !== productId);
    } else {
        const safeQty = Math.max(1, Math.floor(qty));
        items = items.map((i)=>i.productId === productId ? {
                ...i,
                qty: safeQty
            } : i);
    }
    writeStorage(items);
    dispatchCartChanged(items);
    return items;
}
function remove(productId) {
    const items = readStorage().filter((i)=>i.productId !== productId);
    writeStorage(items);
    dispatchCartChanged(items);
    return items;
}
function clear() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.removeItem(STORAGE_KEY);
        dispatchCartChanged([]);
    } catch  {
    // Ignore.
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/catalog/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CatalogPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Blocks/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$Cell$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Blocks/Cell/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$List$2f$List$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Blocks/List/List.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Feedback/Spinner/Spinner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Link$2f$Link$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Link/Link.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function formatPrice(amountKopeks, currency) {
    const rub = amountKopeks / 100;
    return `${rub.toFixed(2)} ${currency}`;
}
function CatalogPage() {
    _s();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cartCount, setCartCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatalogPage.useEffect": ()=>{
            setCartCount((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCart"])().reduce({
                "CatalogPage.useEffect": (sum, i)=>sum + i.qty
            }["CatalogPage.useEffect"], 0));
        }
    }["CatalogPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatalogPage.useEffect": ()=>{
            let cancelled = false;
            ({
                "CatalogPage.useEffect": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])('/api/products');
                        if (!cancelled) {
                            setProducts(data);
                            setError(null);
                        }
                    } catch (e) {
                        console.error(e);
                        if (!cancelled) {
                            setError('Не удалось загрузить каталог');
                        }
                    } finally{
                        if (!cancelled) {
                            setLoading(false);
                        }
                    }
                }
            })["CatalogPage.useEffect"]();
            return ({
                "CatalogPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["CatalogPage.useEffect"];
        }
    }["CatalogPage.useEffect"], []);
    const hasProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CatalogPage.useMemo[hasProducts]": ()=>products.length > 0
    }["CatalogPage.useMemo[hasProducts]"], [
        products
    ]);
    const handleAdd = (productId)=>{
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToCart"])(productId, 1);
        setCartCount(items.reduce((sum, i)=>sum + i.qty, 0));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Page"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
            header: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                subtitle: hasProducts ? 'Выберите товары' : undefined,
                children: "Каталог"
            }, void 0, false, {
                fileName: "[project]/src/app/catalog/page.tsx",
                lineNumber: 74,
                columnNumber: 11
            }, void 0),
            children: [
                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'center'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                        size: "m"
                    }, void 0, false, {
                        fileName: "[project]/src/app/catalog/page.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/catalog/page.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this),
                !loading && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: 16,
                        color: 'var(--tgui--color-destructive)'
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/catalog/page.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this),
                !loading && !error && !hasProducts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: 16
                    },
                    children: "Список товаров пуст."
                }, void 0, false, {
                    fileName: "[project]/src/app/catalog/page.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this),
                !loading && !error && hasProducts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$List$2f$List$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
                    children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$Cell$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                            subtitle: formatPrice(p.priceKopeks, p.currency),
                            after: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "s",
                                mode: "bezeled",
                                onClick: ()=>handleAdd(p.id),
                                disabled: !p.available,
                                children: "Добавить"
                            }, void 0, false, {
                                fileName: "[project]/src/app/catalog/page.tsx",
                                lineNumber: 102,
                                columnNumber: 19
                            }, void 0),
                            children: p.title
                        }, p.id, false, {
                            fileName: "[project]/src/app/catalog/page.tsx",
                            lineNumber: 98,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/catalog/page.tsx",
                    lineNumber: 96,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Link$2f$Link$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                        href: "/cart",
                        children: [
                            "Корзина ",
                            cartCount > 0 ? `(${cartCount})` : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/catalog/page.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/catalog/page.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/catalog/page.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/catalog/page.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(CatalogPage, "87UnjeYwqiheRgDjn18Hzl0CQT0=");
_c = CatalogPage;
var _c;
__turbopack_context__.k.register(_c, "CatalogPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_353d281f._.js.map