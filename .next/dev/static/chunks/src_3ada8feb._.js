(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ErrorBoundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    state = {};
    // eslint-disable-next-line max-len
    static getDerivedStateFromError = (error)=>({
            error
        });
    componentDidCatch(error) {
        this.setState({
            error
        });
    }
    render() {
        const { state: { error }, props: { fallback: Fallback, children } } = this;
        return error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Fallback, {
            error: error
        }, void 0, false, {
            fileName: "[project]/src/components/ErrorBoundary.tsx",
            lineNumber: 37,
            columnNumber: 20
        }, this) : children;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ErrorPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorPage",
    ()=>ErrorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function ErrorPage({ error, reset }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ErrorPage.useEffect": ()=>{
            // Log the error to an error reporting service
            console.error(error);
        }
    }["ErrorPage.useEffect"], [
        error
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "An unhandled error occurred!"
            }, void 0, false, {
                fileName: "[project]/src/components/ErrorPage.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    children: error.message
                }, void 0, false, {
                    fileName: "[project]/src/components/ErrorPage.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ErrorPage.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            reset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>reset(),
                children: "Try again"
            }, void 0, false, {
                fileName: "[project]/src/components/ErrorPage.tsx",
                lineNumber: 23,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ErrorPage.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(ErrorPage, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ErrorPage;
var _c;
__turbopack_context__.k.register(_c, "ErrorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useDidMount.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDidMount",
    ()=>useDidMount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useDidMount() {
    _s();
    const [didMount, setDidMount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDidMount.useEffect": ()=>{
            setDidMount(true);
        }
    }["useDidMount.useEffect"], []);
    return didMount;
}
_s(useDidMount, "UCMebkmDIjIh9wy6Oiuh/xPo3U0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/i18n/data:ceb1ef [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7f2faf0a5a4257a52ee7fe09cfae9017f9d53d1f85":"setLocale"},"src/core/i18n/locale.ts",""] */ __turbopack_context__.s([
    "setLocale",
    ()=>setLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var setLocale = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7f2faf0a5a4257a52ee7fe09cfae9017f9d53d1f85", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "setLocale"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vbG9jYWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vdXNlIHNlcnZlciBpcyByZXF1aXJlZFxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSAnbmV4dC9oZWFkZXJzJztcblxuaW1wb3J0IHsgZGVmYXVsdExvY2FsZSB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB0eXBlIHsgTG9jYWxlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8vIEluIHRoaXMgZXhhbXBsZSB0aGUgbG9jYWxlIGlzIHJlYWQgZnJvbSBhIGNvb2tpZS4gWW91IGNvdWxkIGFsdGVybmF0aXZlbHlcbi8vIGFsc28gcmVhZCBpdCBmcm9tIGEgZGF0YWJhc2UsIGJhY2tlbmQgc2VydmljZSwgb3IgYW55IG90aGVyIHNvdXJjZS5cbmNvbnN0IENPT0tJRV9OQU1FID0gJ05FWFRfTE9DQUxFJztcblxuY29uc3QgZ2V0TG9jYWxlID0gYXN5bmMgKCkgPT4ge1xuICByZXR1cm4gKGF3YWl0IGNvb2tpZXMoKSkuZ2V0KENPT0tJRV9OQU1FKT8udmFsdWUgfHwgZGVmYXVsdExvY2FsZTtcbn07XG5cbmNvbnN0IHNldExvY2FsZSA9IGFzeW5jIChsb2NhbGU/OiBzdHJpbmcpID0+IHtcbiAgKGF3YWl0IGNvb2tpZXMoKSkuc2V0KENPT0tJRV9OQU1FLCAobG9jYWxlIGFzIExvY2FsZSkgfHwgZGVmYXVsdExvY2FsZSk7XG59O1xuXG5leHBvcnQgeyBnZXRMb2NhbGUsIHNldExvY2FsZSB9O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIwUkFvQm9CIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Root/Root.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Root",
    ()=>Root
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+sdk@3.1.2_typescript@5.9.3/node_modules/@tma.js/sdk/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$2d$react$40$3$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+sdk-react@3.0.11_@types+react@19.2.7_react@19.2.0_typescript@5.9.3/node_modules/@tma.js/sdk-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tonconnect$2b$ui$2d$react$40$2$2e$3$2e$1_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$tonconnect$2f$ui$2d$react$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tonconnect+ui-react@2.3.1_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@tonconnect/ui-react/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$AppRoot$2f$AppRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/AppRoot/AppRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ErrorBoundary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ErrorPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ErrorPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDidMount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDidMount.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$data$3a$ceb1ef__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/core/i18n/data:ceb1ef [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function RootInner({ children }) {
    _s();
    const lp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$2d$react$40$3$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useLaunchParams"])();
    const isDark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$2d$react$40$3$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useSignal"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["miniApp"].isDark);
    const initDataUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$2d$react$40$3$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useSignal"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initData"].user);
    // Set the user locale.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RootInner.useEffect": ()=>{
            initDataUser && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$i18n$2f$data$3a$ceb1ef__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["setLocale"])(initDataUser.language_code);
        }
    }["RootInner.useEffect"], [
        initDataUser
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tonconnect$2b$ui$2d$react$40$2$2e$3$2e$1_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$tonconnect$2f$ui$2d$react$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TonConnectUIProvider"], {
        manifestUrl: "/tonconnect-manifest.json",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$AppRoot$2f$AppRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppRoot"], {
            appearance: isDark ? 'dark' : 'light',
            platform: [
                'macos',
                'ios'
            ].includes(lp.tgWebAppPlatform) ? 'ios' : 'base',
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/Root/Root.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Root/Root.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(RootInner, "FW012uVxPU0nXTgn/mt1VV3GORk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$2d$react$40$3$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useLaunchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$2d$react$40$3$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useSignal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$2d$react$40$3$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useSignal"]
    ];
});
_c = RootInner;
function Root(props) {
    _s1();
    // Unfortunately, Telegram Mini Apps does not allow us to use all features of
    // the Server Side Rendering. That's why we are showing loader on the server
    // side.
    const didMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDidMount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDidMount"])();
    return didMount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
        fallback: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ErrorPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorPage"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RootInner, {
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/Root/Root.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Root/Root.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "root__loading",
        children: "Loading"
    }, void 0, false, {
        fileName: "[project]/src/components/Root/Root.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s1(Root, "0Pdi+v5w5O/ywgZT3kAe4rRjOvA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDidMount$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDidMount"]
    ];
});
_c1 = Root;
var _c, _c1;
__turbopack_context__.k.register(_c, "RootInner");
__turbopack_context__.k.register(_c1, "Root");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_3ada8feb._.js.map