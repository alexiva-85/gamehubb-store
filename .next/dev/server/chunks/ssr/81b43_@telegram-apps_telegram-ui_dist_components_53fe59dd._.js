module.exports = [
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/components/Ripple/hooks/useRipple.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRipple",
    ()=>useRipple
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useTimeout.js [app-ssr] (ecmascript)");
'use client';
;
;
const RIPPLE_DELAY = 70;
const WAVE_LIVE = 225;
const useRipple = ()=>{
    const [clicks, setClicks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const pointerDelayTimers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new Map(), []);
    const clearClicks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimeout"])(()=>setClicks([]), WAVE_LIVE);
    function addClick(x, y, pointerId) {
        const dateNow = Date.now();
        const filteredClicks = clicks.filter((click)=>click.date + WAVE_LIVE > dateNow);
        setClicks([
            ...filteredClicks,
            {
                x,
                y,
                date: dateNow,
                pointerId
            }
        ]);
        clearClicks.set();
        pointerDelayTimers.delete(pointerId);
    }
    const onPointerDown = (e)=>{
        const { top, left } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - (left !== null && left !== void 0 ? left : 0);
        const y = e.clientY - (top !== null && top !== void 0 ? top : 0);
        pointerDelayTimers.set(e.pointerId, setTimeout(()=>addClick(x, y, e.pointerId), RIPPLE_DELAY));
    };
    const onPointerCancel = (e)=>{
        const timer = pointerDelayTimers.get(e.pointerId);
        clearTimeout(timer);
        pointerDelayTimers.delete(e.pointerId);
    };
    return {
        clicks,
        onPointerDown,
        onPointerCancel
    };
}; //# sourceMappingURL=useRipple.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/components/Ripple/Ripple.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ripple",
    ()=>Ripple
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
const Ripple = ({ clicks })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        "aria-hidden": true,
        className: "tgui-8071f6e38c77bc0b",
        children: clicks.map((wave)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                className: "tgui-e156954daf886976",
                style: {
                    top: wave.y,
                    left: wave.x
                }
            }, wave.date))
    }); //# sourceMappingURL=Ripple.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/Tappable.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tappable",
    ()=>Tappable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/usePlatform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$components$2f$Ripple$2f$hooks$2f$useRipple$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/components/Ripple/hooks/useRipple.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$components$2f$Ripple$2f$Ripple$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/components/Ripple/Ripple.js [app-ssr] (ecmascript)");
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
const Tappable = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { Component = 'div', children, className, interactiveAnimation = 'background', readOnly } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "Component",
        "children",
        "className",
        "interactiveAnimation",
        "readOnly"
    ]);
    const platform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlatform"])();
    const { clicks, onPointerCancel, onPointerDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$components$2f$Ripple$2f$hooks$2f$useRipple$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRipple"])();
    const hasRippleEffect = platform === 'base' && interactiveAnimation === 'background' && !readOnly;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-b5d680db78c4cc2e", platform === 'ios' && "tgui-34eb6f8b96874d40", interactiveAnimation === 'opacity' && "tgui-7c5d6c1f6bbe3eaf", className),
        onPointerCancel: onPointerCancel,
        onPointerDown: onPointerDown,
        readOnly: readOnly
    }, restProps), {
        children: [
            hasRippleEffect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$components$2f$Ripple$2f$Ripple$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ripple"], {
                clicks: clicks
            }),
            children
        ]
    }));
}); //# sourceMappingURL=Tappable.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/HorizontalScroll/HorizontalScroll.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HorizontalScroll",
    ()=>HorizontalScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
;
;
;
;
;
const HorizontalScroll = (_param)=>{
    var { Component = 'div', className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "Component",
        "className",
        "children"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-4614301efc783534", className)
    }, restProps), {
        children: children
    }));
}; //# sourceMappingURL=HorizontalScroll.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/RootRenderer/RootRenderer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RootRenderer",
    ()=>RootRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useAppRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useAppRootContext.js [app-ssr] (ecmascript)");
;
;
;
const RootRenderer = ({ children })=>{
    const { portalContainer } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useAppRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppRootContext"])();
    if (!(portalContainer === null || portalContainer === void 0 ? void 0 : portalContainer.current)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"])(children) ? children : null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(children, portalContainer.current);
}; //# sourceMappingURL=RootRenderer.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/VisuallyHidden/VisuallyHidden.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VisuallyHidden",
    ()=>VisuallyHidden
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const VisuallyHidden = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { Component = 'span', className } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "Component",
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restProps), {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-b9fd8cdf929947df", className)
    }));
}); //# sourceMappingURL=VisuallyHidden.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Touch/helpers/touch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "coordX",
    ()=>coordX,
    "coordY",
    ()=>coordY,
    "getSupportedEvents",
    ()=>getSupportedEvents,
    "initGesture",
    ()=>initGesture,
    "touchEnabled",
    ()=>touchEnabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/dom.js [app-ssr] (ecmascript)");
;
const initGesture = (startX, startY)=>({
        startX,
        startY,
        startT: new Date(),
        duration: 0,
        isPressed: true,
        isY: false,
        isX: false,
        isSlideX: false,
        isSlideY: false,
        isSlide: false,
        clientX: 0,
        clientY: 0,
        shiftX: 0,
        shiftY: 0,
        shiftXAbs: 0,
        shiftYAbs: 0
    });
const coordX = (e)=>{
    if (e.clientX != null) {
        return e.clientX;
    }
    return e.changedTouches && e.changedTouches[0].clientX;
};
const coordY = (e)=>{
    if (e.clientY != null) {
        return e.clientY;
    }
    return e.changedTouches && e.changedTouches[0].clientY;
};
const touchEnabled = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canUseDOM"] && 'ontouchstart' in window;
const getSupportedEvents = ()=>{
    if (touchEnabled()) {
        return [
            'touchstart',
            'touchmove',
            'touchend',
            'touchcancel'
        ];
    }
    return [
        'mousedown',
        'mousemove',
        'mouseup',
        'mouseleave'
    ];
}; //# sourceMappingURL=touch.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Touch/Touch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-use-before-define */ __turbopack_context__.s([
    "Touch",
    ()=>Touch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnhancedEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEventListener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEventListener.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Touch/helpers/touch.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const Touch = (_param)=>{
    var { Component = 'div', onStart, onStartX, onStartY, onMove: _onMove, onMoveX, onMoveY, onLeave, onEnter, onEnd: _onEnd, onEndX, onEndY, onClickCapture, usePointerHover, slideThreshold = 5, useCapture = false, noSlideClick = false, stopPropagation = false } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "Component",
        "onStart",
        "onStartX",
        "onStartY",
        "onMove",
        "onMoveX",
        "onMoveY",
        "onLeave",
        "onEnter",
        "onEnd",
        "onEndX",
        "onEndY",
        "onClickCapture",
        "usePointerHover",
        "slideThreshold",
        "useCapture",
        "noSlideClick",
        "stopPropagation"
    ]);
    const events = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupportedEvents"], []);
    const didSlide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const gesture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handle = (e, handlers)=>{
        stopPropagation && e.stopPropagation();
        handlers.forEach((cb)=>{
            var _gesture_current_startT, _gesture_current;
            var _gesture_current_startT_getTime;
            const duration = Date.now() - ((_gesture_current_startT_getTime = (_gesture_current = gesture.current) === null || _gesture_current === void 0 ? void 0 : (_gesture_current_startT = _gesture_current.startT) === null || _gesture_current_startT === void 0 ? void 0 : _gesture_current_startT.getTime()) !== null && _gesture_current_startT_getTime !== void 0 ? _gesture_current_startT_getTime : 0);
            cb && cb((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, gesture.current), {
                duration,
                originalEvent: e
            }));
        });
    };
    const listenerParams = {
        capture: useCapture,
        passive: false
    };
    const listeners = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEventListener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventListener"])(events[1], onMove, listenerParams),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEventListener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventListener"])(events[2], onEnd, listenerParams),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEventListener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventListener"])(events[3], onEnd, listenerParams)
    ];
    const subscribe = (el)=>{
        if (!el) {
            return;
        }
        listeners.forEach((l)=>l.add(el));
    };
    const unsubscribe = ()=>{
        listeners.forEach((l)=>l.remove());
    };
    const enterHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEventListener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventListener"])(usePointerHover ? 'pointerenter' : 'mouseenter', onEnter);
    const leaveHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEventListener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventListener"])(usePointerHover ? 'pointerleave' : 'mouseleave', onLeave);
    const startHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEventListener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventListener"])(events[0], (e)=>{
        gesture.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initGesture"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coordX"])(e), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coordY"])(e));
        handle(e, [
            onStart,
            onStartX,
            onStartY
        ]);
        subscribe((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["touchEnabled"])() ? e.target : // Can be fixed by PointerEvents' setPointerCapture later
        window.document);
    }, {
        capture: useCapture,
        passive: false
    });
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        const el = containerRef.current;
        if (el) {
            enterHandler.add(el);
            leaveHandler.add(el);
            startHandler.add(el);
        }
    }, [
        Component
    ]);
    function onMove(e) {
        var _gesture_current;
        const { isPressed, isX, isY, startX = 0, startY = 0 } = (_gesture_current = gesture.current) !== null && _gesture_current !== void 0 ? _gesture_current : {};
        if (isPressed) {
            var _gesture_current1;
            const clientX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coordX"])(e);
            const clientY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coordY"])(e);
            // Offsets
            const shiftX = clientX - startX;
            const shiftY = clientY - startY;
            // Absolute offset values
            const shiftXAbs = Math.abs(shiftX);
            const shiftYAbs = Math.abs(shiftY);
            // If determining multitouch, interrupt the gesture
            if (!!e.touches && e.touches.length > 1) {
                onEnd(e);
                return;
            }
            // If we haven't determined yet
            if (!isX && !isY) {
                const willBeX = shiftXAbs >= slideThreshold && shiftXAbs > shiftYAbs;
                const willBeY = shiftYAbs >= slideThreshold && shiftYAbs > shiftXAbs;
                const willBeSlidedX = willBeX && (!!onMoveX || !!_onMove);
                const willBeSlidedY = willBeY && (!!onMoveY || !!_onMove);
                if (gesture.current) {
                    Object.assign(gesture.current, {
                        isY: willBeY,
                        isX: willBeX,
                        isSlideX: willBeSlidedX,
                        isSlideY: willBeSlidedY,
                        isSlide: willBeSlidedX || willBeSlidedY
                    });
                }
            }
            if ((_gesture_current1 = gesture.current) === null || _gesture_current1 === void 0 ? void 0 : _gesture_current1.isSlide) {
                Object.assign(gesture.current, {
                    clientX,
                    clientY,
                    shiftX,
                    shiftY,
                    shiftXAbs,
                    shiftYAbs
                });
                handle(e, [
                    _onMove,
                    gesture.current.isSlideX && onMoveX,
                    gesture.current.isSlideY && onMoveY
                ]);
            }
        }
    }
    function onEnd(e) {
        var _gesture_current;
        const { isPressed, isSlide, isSlideX, isSlideY } = (_gesture_current = gesture.current) !== null && _gesture_current !== void 0 ? _gesture_current : {};
        if (isPressed) {
            handle(e, [
                _onEnd,
                isSlideY && onEndY,
                isSlideX && onEndX
            ]);
        }
        const isTouchEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Touch$2f$helpers$2f$touch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["touchEnabled"])();
        if (isTouchEnabled && isSlide) {
            // If it's a touch device and touchmove was detected,
            // the click event won't be triggered
            didSlide.current = false;
        } else {
            didSlide.current = Boolean(isSlide);
        }
        gesture.current = {};
        // If it was a touch event, simulate hover cancellation
        if (isTouchEnabled) {
            onLeave && onLeave(e);
        }
        unsubscribe();
    }
    /**
   * Dragstart event handler
   * Cancels the native browser behavior for nested links and images
   */ const onDragStart = (e)=>{
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'IMG') {
            e.preventDefault();
        }
    };
    /**
   * Click event handler for the component
   * Cancels the transition through the nested link if a swipe was detected
   */ const postGestureClick = (e)=>{
        if (!didSlide.current) {
            onClickCapture && onClickCapture(e);
            return;
        }
        if (noSlideClick) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            onClickCapture && onClickCapture(e);
        }
        didSlide.current = false;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restProps), {
        onDragStart: onDragStart,
        onClickCapture: postGestureClick,
        ref: containerRef
    }));
}; //# sourceMappingURL=Touch.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppRoot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$AppRoot$2f$AppRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppRoot"],
    "RootRenderer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$RootRenderer$2f$RootRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RootRenderer"],
    "Tappable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$Tappable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tappable"],
    "VisuallyHidden",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VisuallyHidden"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$AppRoot$2f$AppRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/AppRoot/AppRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$RootRenderer$2f$RootRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/RootRenderer/RootRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$Tappable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/Tappable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/VisuallyHidden/VisuallyHidden.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Typography.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Typography",
    ()=>Typography
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
;
;
;
;
;
const stylesWeight = {
    '1': "tgui-5c92f90c2701fa17",
    '2': "tgui-809f1f8a3f64154d",
    '3': "tgui-5b8bdfbd2af10f59"
};
const Typography = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { weight = '3', Component = 'span', plain = true, caps, className } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "weight",
        "Component",
        "plain",
        "caps",
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-c3e2e598bd70eee6", plain && "tgui-080a44e6ac3f4d27", weight && stylesWeight[weight], caps && "tgui-c602097b30e4ede9", className)
    }, restProps));
}); //# sourceMappingURL=Typography.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Subheadline/Subheadline.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Subheadline",
    ()=>Subheadline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Typography.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const subheadlineLevelStyles = {
    '1': "tgui-30064fce0d501f17",
    '2': "tgui-8f63cd31b2513281"
};
const Subheadline = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { level = '1', className, Component } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "level",
        "className",
        "Component"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typography"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restProps), {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-266b6ffdbad2b90e", subheadlineLevelStyles[level], className),
        Component: Component || 'h6'
    }));
}); //# sourceMappingURL=Subheadline.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Text/Text.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Text",
    ()=>Text
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Typography.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const Text = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { weight, className, Component } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "weight",
        "className",
        "Component"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typography"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        ref: ref
    }, restProps), {
        weight: weight,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-65c206f0fd891b6b", className),
        Component: Component || 'span'
    }));
}); //# sourceMappingURL=Text.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Caption/Caption.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Caption",
    ()=>Caption
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Typography.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const captionLevelStyles = {
    '1': "tgui-2916d621b0ea5857",
    '2': "tgui-937d123c23df98b3"
};
const Caption = (_param)=>{
    var { level = '1', className, Component } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "level",
        "className",
        "Component"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typography"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restProps), {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-f37a43dcc29ade55", captionLevelStyles[level], className),
        Component: Component || 'span'
    }));
}; //# sourceMappingURL=Caption.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Headline/Headline.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Headline",
    ()=>Headline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Typography.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const Headline = (_param)=>{
    var { className, Component } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "Component"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typography"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restProps), {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-e05fce4753086879", className),
        Component: Component || 'h5'
    }));
}; //# sourceMappingURL=Headline.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/LargeTitle/LargeTitle.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LargeTitle",
    ()=>LargeTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Typography.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const LargeTitle = (_param)=>{
    var { className, Component } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "Component"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typography"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restProps), {
        Component: Component || 'h1',
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-c6d7432a5c12debe", className)
    }));
}; //# sourceMappingURL=LargeTitle.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Title/Title.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Title",
    ()=>Title
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Typography.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const titleLevelTags = {
    '1': 'h2',
    '2': 'h3',
    '3': 'h4'
};
const titleLevelStyles = {
    '1': "tgui-2fc52ee93e8068a6",
    '2': "tgui-72c2a480384c4fb1",
    '3': "tgui-45c5f45d3e9105f4"
};
const Title = (_param)=>{
    var { level = '2', className, Component } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "level",
        "className",
        "Component"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typography"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restProps), {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-da537051a4a87aec", titleLevelStyles[level], className),
        Component: Component || titleLevelTags[level]
    }));
}; //# sourceMappingURL=Title.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Caption",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Caption$2f$Caption$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Caption"],
    "Headline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Headline$2f$Headline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Headline"],
    "LargeTitle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$LargeTitle$2f$LargeTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LargeTitle"],
    "Subheadline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Subheadline$2f$Subheadline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Subheadline"],
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"],
    "Title",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Title$2f$Title$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"],
    "Typography",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typography"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Caption$2f$Caption$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Caption/Caption.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Headline$2f$Headline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Headline/Headline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$LargeTitle$2f$LargeTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/LargeTitle/LargeTitle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Subheadline$2f$Subheadline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Subheadline/Subheadline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Text/Text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Title$2f$Title$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Title/Title.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Typography.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Misc/Divider/Divider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Divider",
    ()=>Divider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
;
;
;
;
const Divider = (_param)=>{
    var { className } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("hr", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-8af0d10d5540c6cc", className)
    }, restProps));
}; //# sourceMappingURL=Divider.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Misc/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Misc/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Divider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Misc$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Divider"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Misc$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Misc/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Misc$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Misc/Divider/Divider.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/components/FloatingArrow/helpers/getArrowPositionData.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getArrowPositionData",
    ()=>getArrowPositionData
]);
const getArrowPositionData = (placement, coords = {
    x: 0,
    y: 0
}, offset = 0, isStaticOffset = false)=>{
    const withOffset = (isVerticalPlacement)=>{
        const parsedCoords = {
            x: coords.x || 0,
            y: coords.y || 0
        };
        return isStaticOffset ? offset : parsedCoords[isVerticalPlacement ? 'y' : 'x'] + offset;
    };
    if (placement.startsWith('top')) {
        return [
            'bottom',
            {
                top: '100%',
                left: withOffset(false)
            }
        ];
    }
    if (placement.startsWith('right')) {
        return [
            'left',
            {
                top: withOffset(true),
                left: 0
            }
        ];
    }
    if (placement.startsWith('bottom')) {
        return [
            undefined,
            {
                bottom: '100%',
                left: withOffset(false)
            }
        ];
    }
    return [
        'right',
        {
            top: withOffset(true),
            right: 0
        }
    ];
}; //# sourceMappingURL=getArrowPositionData.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/components/FloatingArrow/icons/arrow.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ARROW_HEIGHT",
    ()=>DEFAULT_ARROW_HEIGHT,
    "DEFAULT_ARROW_PADDING",
    ()=>DEFAULT_ARROW_PADDING,
    "DEFAULT_ARROW_WIDTH",
    ()=>DEFAULT_ARROW_WIDTH,
    "DefaultIcon",
    ()=>DefaultIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
const DEFAULT_ARROW_WIDTH = 22;
const DEFAULT_ARROW_HEIGHT = 6;
const DEFAULT_ARROW_PADDING = 12;
const PLATFORM_HEIGHT = 1;
const ARROW_HEIGHT_WITH_WHITE_SPACE = DEFAULT_ARROW_HEIGHT + PLATFORM_HEIGHT;
const DefaultIcon = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        width: DEFAULT_ARROW_WIDTH,
        height: ARROW_HEIGHT_WITH_WHITE_SPACE,
        viewBox: `0 0 ${DEFAULT_ARROW_WIDTH} ${ARROW_HEIGHT_WITH_WHITE_SPACE}`,
        xmlns: "http://www.w3.org/2000/svg"
    }, props), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M10.804 0C6.387 0 6.94 6 .865 6h19.878c-6.074 0-5.521-6-9.939-6Z",
            fill: "currentColor"
        })
    })); //# sourceMappingURL=arrow.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/components/FloatingArrow/FloatingArrow.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingArrow",
    ()=>FloatingArrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$helpers$2f$getArrowPositionData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/components/FloatingArrow/helpers/getArrowPositionData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$icons$2f$arrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/components/FloatingArrow/icons/arrow.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const placementStyles = {
    right: "tgui-6c3deae89ec68e99",
    bottom: "tgui-fed67e27ad8cb75f",
    left: "tgui-b27d1c4f6222569e"
};
const FloatingArrow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { style, offset, isStaticOffset, coords, placement = 'bottom', Icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$icons$2f$arrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefaultIcon"], className } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "style",
        "offset",
        "isStaticOffset",
        "coords",
        "placement",
        "Icon",
        "className"
    ]);
    const [arrowPlacement, arrowStyles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$helpers$2f$getArrowPositionData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getArrowPositionData"])(placement, coords, offset, isStaticOffset);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, arrowStyles, style),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-97a62789a70393d0", arrowPlacement && placementStyles[arrowPlacement], className)
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Icon, {
            className: "tgui-6ae8c47f9448321b"
        })
    }));
}); //# sourceMappingURL=FloatingArrow.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/helpers/autoUpdateFloatingElement.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoUpdateFloatingElement",
    ()=>autoUpdateFloatingElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+dom@1.7.4/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
const defaultOptions = {
    ancestorScroll: true,
    ancestorResize: true,
    elementResize: false,
    animationFrame: false
};
const autoUpdateFloatingElement = (reference, floating, update, options = defaultOptions)=>{
    const { elementResize = false } = options, restOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(options, [
        "elementResize"
    ]);
    const autoUpdateLibDisposer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$7$2e$4$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"])(reference, floating, update, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restOptions), {
        elementResize: false
    }));
    let observer = null;
    if (elementResize) {
        let initialUpdate = true;
        observer = new MutationObserver(()=>{
            if (!initialUpdate) {
                update();
            }
            initialUpdate = false;
        });
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(reference)) {
            observer.observe(reference, {
                childList: true,
                subtree: true
            });
        }
        observer.observe(floating, {
            childList: true,
            subtree: true
        });
    }
    return ()=>{
        if (observer !== null) {
            observer.disconnect();
            observer = null;
        }
        autoUpdateLibDisposer();
    };
}; //# sourceMappingURL=autoUpdateFloatingElement.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/hooks/helpers/alignment.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAutoPlacementAlignment",
    ()=>getAutoPlacementAlignment,
    "isNotAutoPlacement",
    ()=>isNotAutoPlacement
]);
const isNotAutoPlacement = (placement)=>{
    return !placement.startsWith('auto');
};
const getAutoPlacementAlignment = (placement)=>{
    const align = placement.replace(/auto-|auto/, '');
    return align === 'start' || align === 'end' ? align : null;
}; //# sourceMappingURL=alignment.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/hooks/useFloatingMiddlewares.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFloatingMiddlewares",
    ()=>useFloatingMiddlewares
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+react-dom@2.1.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$hooks$2f$helpers$2f$alignment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/hooks/helpers/alignment.js [app-ssr] (ecmascript)");
;
;
;
const useFloatingMiddlewares = ({ placement = 'bottom-start', arrowRef = null, withArrow, arrowHeight, arrowPadding, sameWidth, offsetByMainAxis = 0, offsetByCrossAxis = 0, customMiddlewares })=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const isNotAutoPlaced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$hooks$2f$helpers$2f$alignment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNotAutoPlacement"])(placement);
        const middlewares = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"])({
                crossAxis: offsetByCrossAxis,
                mainAxis: withArrow && arrowHeight ? offsetByMainAxis + arrowHeight : offsetByMainAxis
            })
        ];
        if (isNotAutoPlaced) {
            middlewares.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flip"])({
                fallbackAxisSideDirection: 'start'
            }));
        } else {
            middlewares.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoPlacement"])({
                alignment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$hooks$2f$helpers$2f$alignment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAutoPlacementAlignment"])(placement)
            }));
        }
        middlewares.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shift"])());
        if (sameWidth) {
            middlewares.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["size"])({
                apply ({ rects, elements }) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`
                    });
                }
            }));
        }
        if (customMiddlewares) {
            middlewares.push(...customMiddlewares);
        }
        if (withArrow) {
            middlewares.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["arrow"])({
                element: arrowRef,
                padding: arrowPadding
            }));
        }
        return {
            middlewares,
            strictPlacement: isNotAutoPlaced ? placement : undefined
        };
    }, [
        offsetByCrossAxis,
        arrowRef,
        withArrow,
        arrowHeight,
        arrowPadding,
        offsetByMainAxis,
        sameWidth,
        customMiddlewares,
        placement
    ]);
}; //# sourceMappingURL=useFloatingMiddlewares.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/Popper.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popper",
    ()=>Popper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/react/refs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnhancedEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+react-dom@2.1.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$RootRenderer$2f$RootRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/RootRenderer/RootRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$FloatingArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/components/FloatingArrow/FloatingArrow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$icons$2f$arrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/components/FloatingArrow/icons/arrow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$helpers$2f$autoUpdateFloatingElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/helpers/autoUpdateFloatingElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$hooks$2f$useFloatingMiddlewares$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/hooks/useFloatingMiddlewares.js [app-ssr] (ecmascript)");
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
;
;
;
;
;
const Popper = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { placement = 'auto', sameWidth, offsetByMainAxis = 8, offsetByCrossAxis = 0, withArrow = true, customMiddlewares, autoUpdateOnTargetResize = false, arrowProps, ArrowIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$icons$2f$arrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefaultIcon"], Component = 'div', style, targetRef, className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "placement",
        "sameWidth",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "withArrow",
        "customMiddlewares",
        "autoUpdateOnTargetResize",
        "arrowProps",
        "ArrowIcon",
        "Component",
        "style",
        "targetRef",
        "className",
        "children"
    ]);
    const [arrowRef, setArrowRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { strictPlacement, middlewares } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$hooks$2f$useFloatingMiddlewares$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingMiddlewares"])({
        placement,
        sameWidth,
        withArrow,
        arrowRef,
        arrowHeight: (arrowProps === null || arrowProps === void 0 ? void 0 : arrowProps.height) || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$icons$2f$arrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ARROW_HEIGHT"],
        arrowPadding: (arrowProps === null || arrowProps === void 0 ? void 0 : arrowProps.padding) || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$icons$2f$arrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ARROW_PADDING"],
        offsetByMainAxis,
        offsetByCrossAxis,
        customMiddlewares
    });
    const { placement: resolvedPlacement, refs, middlewareData, floatingStyles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloating"])({
        placement: strictPlacement,
        middleware: middlewares,
        whileElementsMounted (...args) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$helpers$2f$autoUpdateFloatingElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["autoUpdateFloatingElement"])(...args, {
                elementResize: autoUpdateOnTargetResize
            });
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        refs.setReference('current' in targetRef ? targetRef.current : targetRef);
    }, [
        refs.setReference,
        targetRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$RootRenderer$2f$RootRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RootRenderer"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, restProps), {
            ref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["multipleRef"])(ref, refs.setFloating),
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, style, floatingStyles),
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-e9c83f4f150e5513", className),
            children: [
                withArrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$components$2f$FloatingArrow$2f$FloatingArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingArrow"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, arrowProps), {
                    coords: middlewareData.arrow,
                    placement: resolvedPlacement,
                    ref: setArrowRef,
                    Icon: ArrowIcon
                })),
                children
            ]
        }))
    });
}); //# sourceMappingURL=Popper.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalClose",
    ()=>ModalClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@xelene+vaul-with-scroll-fix@0.1.4_@types+react-dom@19.2.3_@types+react@19.2.7__@types+_07b9eb154b1d6f1ea2298d34893a1755/node_modules/@xelene/vaul-with-scroll-fix/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
const ModalClose = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"].Close, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        asChild: true
    }, props)); //# sourceMappingURL=ModalClose.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalHeader",
    ()=>ModalHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/usePlatform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Text/Text.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const ModalHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { before, after, className, children } = _param, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "before",
        "after",
        "className",
        "children"
    ]);
    const platform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlatform"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("header", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-f67c8fb3553eee55", className)
    }, props), {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "tgui-09b5f6cfd7ba56ab",
                children: before
            }),
            platform === 'ios' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                weight: "2",
                className: "tgui-7ce1022bfdcb0ae3",
                children: children
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "tgui-fe1d6742d85038d7",
                children: after
            })
        ]
    }));
}); //# sourceMappingURL=ModalHeader.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalOverlay/ModalOverlay.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalOverlay",
    ()=>ModalOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$color$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/color.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$telegram$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/telegram.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useAppRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useAppRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@xelene+vaul-with-scroll-fix@0.1.4_@types+react-dom@19.2.3_@types+react@19.2.7__@types+_07b9eb154b1d6f1ea2298d34893a1755/node_modules/@xelene/vaul-with-scroll-fix/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const DEFAULT_LIGHT_OVERLAY_RGB = [
    255,
    255,
    255
];
const DEFAULT_DARK_OVERLAY_RGB = [
    33,
    33,
    33
];
const ModalOverlay = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { className } = _param, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useAppRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppRootContext"])();
    // We don't use getComputedStyle because overlay renders before the appearance is changing
    const [r, g, b] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const telegramData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$telegram$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTelegramData"])();
        if (telegramData && telegramData.themeParams.bg_color) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$color$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexToRGB"])(telegramData.themeParams.bg_color);
        }
        return context.appearance === 'light' ? DEFAULT_LIGHT_OVERLAY_RGB : DEFAULT_DARK_OVERLAY_RGB;
    }, [
        context.appearance
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"].Overlay, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        // Opacity on overlay is dynamically calculated based on the percentage of opened drawers
        // This is why we use rgba here and not background: token + opacity
        style: {
            background: `rgba(${r}, ${g}, ${b}, .4)`
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-3197096cb603b35a", className)
    }, props));
}); //# sourceMappingURL=ModalOverlay.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Modal/Modal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useAppRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useAppRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@xelene+vaul-with-scroll-fix@0.1.4_@types+react-dom@19.2.3_@types+react@19.2.7__@types+_07b9eb154b1d6f1ea2298d34893a1755/node_modules/@xelene/vaul-with-scroll-fix/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$components$2f$ModalClose$2f$ModalClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$components$2f$ModalHeader$2f$ModalHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$components$2f$ModalOverlay$2f$ModalOverlay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalOverlay/ModalOverlay.js [app-ssr] (ecmascript)");
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
;
;
const Modal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((_param, ref)=>{
    var { overlayComponent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$components$2f$ModalOverlay$2f$ModalOverlay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"], {}), open, onOpenChange, header, className, children, nested, trigger, closeThreshold, scrollLockTimeout, snapPoints, fadeFromIndex, modal, preventScrollRestoration, dismissible } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "overlayComponent",
        "open",
        "onOpenChange",
        "header",
        "className",
        "children",
        "nested",
        "trigger",
        "closeThreshold",
        "scrollLockTimeout",
        "snapPoints",
        "fadeFromIndex",
        "modal",
        "preventScrollRestoration",
        "dismissible"
    ]);
    var _container_portalContainer;
    const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useAppRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppRootContext"])();
    const [portal, setPortal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((_container_portalContainer = container.portalContainer) === null || _container_portalContainer === void 0 ? void 0 : _container_portalContainer.current);
    // This is internal optimization for AppRoot
    // React sets ref to normal value only after the first render
    // If we will have this logic inside the AppRoot component, then all tree will be re-rendered
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        var _container_portalContainer;
        setPortal((_container_portalContainer = container.portalContainer) === null || _container_portalContainer === void 0 ? void 0 : _container_portalContainer.current);
    }, [
        container.portalContainer
    ]);
    const Component = nested ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"].NestedRoot : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"].Root;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(Component, {
        open: open,
        onOpenChange: onOpenChange,
        closeThreshold: closeThreshold,
        scrollLockTimeout: scrollLockTimeout,
        snapPoints: snapPoints,
        fadeFromIndex: fadeFromIndex,
        modal: modal,
        preventScrollRestoration: preventScrollRestoration,
        dismissible: dismissible,
        children: [
            trigger && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"].Trigger, {
                asChild: true,
                children: trigger
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"].Portal, {
                container: portal,
                children: [
                    overlayComponent,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$xelene$2b$vaul$2d$with$2d$scroll$2d$fix$40$0$2e$1$2e$4_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$_07b9eb154b1d6f1ea2298d34893a1755$2f$node_modules$2f40$xelene$2f$vaul$2d$with$2d$scroll$2d$fix$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Drawer"].Content, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
                        ref: ref,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-cc76354712c6e8d9", className)
                    }, restProps), {
                        children: [
                            header,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                className: "tgui-5dc6ad1ca3ac3ed4",
                                children: children
                            })
                        ]
                    }))
                ]
            })
        ]
    });
});
Modal.Header = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$components$2f$ModalHeader$2f$ModalHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalHeader"];
Modal.Overlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$components$2f$ModalOverlay$2f$ModalOverlay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalOverlay"];
Modal.Close = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$components$2f$ModalClose$2f$ModalClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalClose"]; //# sourceMappingURL=Modal.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Tooltip/Tooltip.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$Popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/Popper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Caption$2f$Caption$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Caption/Caption.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const Tooltip = (_param)=>{
    var { mode = 'light', children, className, arrowProps } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "mode",
        "children",
        "className",
        "arrowProps"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$Popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Popper"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        withArrow: true,
        arrowProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, arrowProps), {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-e0107e1e5ea5b9f3", arrowProps === null || arrowProps === void 0 ? void 0 : arrowProps.className)
        }),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-5638a4ef4e806d8c", mode === 'dark' && "tgui-bc60ca772e3ae3c6", className)
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Caption$2f$Caption$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Caption"], {
            level: "1",
            children: children
        })
    }));
}; //# sourceMappingURL=Tooltip.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$Modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"],
    "Popper",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$Popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Popper"],
    "Tooltip",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Modal$2f$Modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Modal/Modal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Popper$2f$Popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Popper/Popper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/Tooltip/Tooltip.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/FixedLayout/FixedLayout.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FixedLayout",
    ()=>FixedLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
;
;
;
;
;
const verticalStyles = {
    top: "tgui-d83e15d73344cdc0",
    bottom: "tgui-01790b7e59088ea5"
};
const FixedLayout = (_param)=>{
    var { Component = 'div', vertical = 'bottom', className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "Component",
        "vertical",
        "className",
        "children"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-7a5facec9dc28fae", vertical && verticalStyles[vertical], className)
    }, restProps), {
        children: children
    }));
}; //# sourceMappingURL=FixedLayout.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/Tabbar/components/TabbarItem/TabbarItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabbarItem",
    ()=>TabbarItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/react/node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/usePlatform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$Tappable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/Tappable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Caption$2f$Caption$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Caption/Caption.js [app-ssr] (ecmascript)");
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
const TabbarItem = (_param)=>{
    var { selected, text, children, className } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "selected",
        "text",
        "children",
        "className"
    ]);
    const platform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlatform"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$Tappable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tappable"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        Component: "button",
        interactiveAnimation: "opacity",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-64cd0db020a9bacf", platform === 'ios' && "tgui-ecbb746748ea4134", selected && "tgui-e6658d0b8927f95e", className)
    }, restProps), {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasReactNode"])(children) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "tgui-44d48e11585af170",
                children: children
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasReactNode"])(text) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Caption$2f$Caption$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Caption"], {
                className: "tgui-aeab497081949a15",
                weight: "2",
                level: platform === 'ios' ? '2' : '1',
                children: text
            })
        ]
    }));
}; //# sourceMappingURL=TabbarItem.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/Tabbar/Tabbar.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabbar",
    ()=>Tabbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/usePlatform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$FixedLayout$2f$FixedLayout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/FixedLayout/FixedLayout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$Tabbar$2f$components$2f$TabbarItem$2f$TabbarItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/Tabbar/components/TabbarItem/TabbarItem.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const Tabbar = (_param)=>{
    var { children, className } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "children",
        "className"
    ]);
    const platform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlatform"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$FixedLayout$2f$FixedLayout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FixedLayout"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-53cb2ebed0c3b08f", platform === 'ios' && "tgui-a2b4713d67582227", className)
    }, restProps), {
        children: children
    }));
};
Tabbar.Item = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$Tabbar$2f$components$2f$TabbarItem$2f$TabbarItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabbarItem"]; //# sourceMappingURL=Tabbar.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FixedLayout",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$FixedLayout$2f$FixedLayout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FixedLayout"],
    "Tabbar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$Tabbar$2f$Tabbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabbar"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$FixedLayout$2f$FixedLayout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/FixedLayout/FixedLayout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$Tabbar$2f$Tabbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/Tabbar/Tabbar.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/components/BreadCrumbsItem/BreadCrumbsItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BreadCrumbsItem",
    ()=>BreadCrumbsItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Subheadline$2f$Subheadline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Subheadline/Subheadline.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const BreadCrumbsItem = (_param)=>{
    var { Component = 'div', className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "Component",
        "className",
        "children"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Component, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-32fe6ce00169d72e", className)
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Subheadline$2f$Subheadline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Subheadline"], {
            level: "2",
            weight: "2",
            children: children
        })
    }));
}; //# sourceMappingURL=BreadCrumbsItem.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/icons/dot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IconDot",
    ()=>IconDot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
;
const IconDot = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        width: "21",
        height: "20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
            cx: "10.5",
            cy: "10",
            r: "2",
            fill: "currentColor"
        })
    }));
}; //# sourceMappingURL=dot.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/icons/slash.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IconSlash",
    ()=>IconSlash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_destructuring_empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
;
const IconSlash = (_param)=>{
    var restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_destructuring_empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M13 5L8 15",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round"
        })
    }));
}; //# sourceMappingURL=slash.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/Breadcrumbs.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Breadcrumbs",
    ()=>Breadcrumbs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$icons$2f$16$2f$chevron$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/16/chevron.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Breadcrumbs$2f$components$2f$BreadCrumbsItem$2f$BreadCrumbsItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/components/BreadCrumbsItem/BreadCrumbsItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Breadcrumbs$2f$icons$2f$dot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/icons/dot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Breadcrumbs$2f$icons$2f$slash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/icons/slash.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const Breadcrumbs = ({ divider = 'dot', className, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-68fc52f1068b8e16", className),
        children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].map(children, (child, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    child,
                    index !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].count(children) - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: "tgui-0eddcd83377979c2",
                        children: [
                            divider === 'dot' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Breadcrumbs$2f$icons$2f$dot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconDot"], {}),
                            divider === 'slash' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Breadcrumbs$2f$icons$2f$slash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconSlash"], {}),
                            divider === 'chevron' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$icons$2f$16$2f$chevron$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon16Chevron"], {
                                className: "tgui-a9c3d618b6e43d64"
                            })
                        ]
                    })
                ]
            }))
    });
Breadcrumbs.Item = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Breadcrumbs$2f$components$2f$BreadCrumbsItem$2f$BreadCrumbsItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BreadCrumbsItem"]; //# sourceMappingURL=Breadcrumbs.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/CompactPagination/components/CompactPaginationItem/CompactPaginationItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompactPaginationItem",
    ()=>CompactPaginationItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/react/node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/VisuallyHidden/VisuallyHidden.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const CompactPaginationItem = (_param)=>{
    var { selected, className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "selected",
        "className",
        "children"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        type: "button",
        role: "tab",
        "aria-selected": selected,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-747563e660315b07", selected && "tgui-6d14364fac453a65", className)
    }, restProps), {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$react$2f$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasReactNode"])(children) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VisuallyHidden"], {
            children: children
        }) : undefined
    }));
}; //# sourceMappingURL=CompactPaginationItem.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/CompactPagination/CompactPagination.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompactPagination",
    ()=>CompactPagination
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$CompactPagination$2f$components$2f$CompactPaginationItem$2f$CompactPaginationItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/CompactPagination/components/CompactPaginationItem/CompactPaginationItem.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const modeStyles = {
    default: undefined,
    ambient: "tgui-15adbef8fe5efed9",
    white: "tgui-cdc228e9d92dac5b"
};
const CompactPagination = (_param)=>{
    var { mode = 'default', children, className } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "mode",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        role: "tablist",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-442a9579d6c19dc4", modeStyles[mode], className)
    }, restProps), {
        children: children
    }));
};
CompactPagination.Item = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$CompactPagination$2f$components$2f$CompactPaginationItem$2f$CompactPaginationItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompactPaginationItem"]; //# sourceMappingURL=CompactPagination.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Link/Link.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
;
;
;
;
;
const Link = (_param)=>{
    var { className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "children"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-bfabaddd169233a9", className)
    }, restProps), {
        children: children
    }));
}; //# sourceMappingURL=Link.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Pagination/hooks/enum.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaginationType",
    ()=>PaginationType
]);
var PaginationType;
(function(PaginationType) {
    PaginationType["Page"] = "page";
    PaginationType["Next"] = "next";
    PaginationType["Previous"] = "previous";
    PaginationType["StartEllipsis"] = "start-ellipsis";
    PaginationType["EndEllipsis"] = "end-ellipsis";
})(PaginationType || (PaginationType = {})); //# sourceMappingURL=enum.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Pagination/hooks/usePagination.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePagination",
    ()=>usePagination
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/array.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnsureControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/useEnsureControl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Pagination/hooks/enum.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const usePagination = ({ boundaryCount = 1, count = 1, defaultPage = 1, hideNextButton = false, hidePrevButton = false, onChange, page: pageProp, siblingCount = 1 })=>{
    const [page, setPageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$useEnsureControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCustomEnsuredControl"])({
        value: pageProp,
        defaultValue: defaultPage
    });
    const handleClick = (event, value)=>{
        if (!pageProp) {
            setPageState(value);
        }
        if (onChange) {
            onChange(event, value);
        }
    };
    const startPages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["range"])(1, Math.min(boundaryCount, count));
    const endPages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["range"])(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
    const siblingsStart = Math.max(Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1), boundaryCount + 2);
    const siblingsEnd = Math.min(Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2), endPages.length > 0 ? endPages[0] - 2 : count - 1);
    // Basic list of items to render
    // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
    const itemList = [
        ...hidePrevButton ? [] : [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].Previous
        ],
        ...startPages,
        // Start ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...siblingsStart > boundaryCount + 2 ? [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].StartEllipsis
        ] : boundaryCount + 1 < count - boundaryCount ? [
            boundaryCount + 1
        ] : [],
        // Sibling pages
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["range"])(siblingsStart, siblingsEnd),
        // End ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...siblingsEnd < count - boundaryCount - 1 ? [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].EndEllipsis
        ] : count - boundaryCount > boundaryCount ? [
            count - boundaryCount
        ] : [],
        ...endPages,
        ...hideNextButton ? [] : [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].Next
        ]
    ];
    // Map the button type to its page number
    const buttonPage = (type)=>{
        switch(type){
            case 'previous':
                return page - 1;
            case 'next':
                return page + 1;
            default:
                return null;
        }
    };
    return itemList.map((typeOrPageNumber)=>{
        if (typeof typeOrPageNumber === 'number') {
            return {
                onClick: (event)=>handleClick(event, typeOrPageNumber),
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].Page,
                page: typeOrPageNumber,
                selected: typeOrPageNumber === page,
                disabled: false,
                'aria-current': typeOrPageNumber === page ? 'true' : undefined
            };
        }
        return {
            onClick: (event)=>handleClick(event, buttonPage(typeOrPageNumber) || 0),
            type: typeOrPageNumber,
            page: buttonPage(typeOrPageNumber),
            selected: false,
            disabled: ![
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].StartEllipsis,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].EndEllipsis
            ].includes(typeOrPageNumber) && (typeOrPageNumber === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].Next ? page >= count : page <= 1)
        };
    });
}; //# sourceMappingURL=usePagination.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Pagination/Pagination.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pagination",
    ()=>Pagination
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$icons$2f$24$2f$chevron_left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/24/chevron_left.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$icons$2f$24$2f$chevron_right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/icons/24/chevron_right.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Headline$2f$Headline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Headline/Headline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Pagination/hooks/enum.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$usePagination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Pagination/hooks/usePagination.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const Pagination = (_param)=>{
    var { boundaryCount, count, defaultPage, hideNextButton, hidePrevButton, onChange, page, disabled, siblingCount, className } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "boundaryCount",
        "count",
        "defaultPage",
        "hideNextButton",
        "hidePrevButton",
        "onChange",
        "page",
        "disabled",
        "siblingCount",
        "className"
    ]);
    const paginationItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$usePagination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePagination"])({
        boundaryCount,
        count,
        defaultPage,
        hideNextButton,
        hidePrevButton,
        onChange,
        page,
        siblingCount
    });
    const getPaginationChild = (item)=>{
        switch(item.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].Previous:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$icons$2f$24$2f$chevron_left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon24ChevronLeft"], {
                    className: "tgui-2636b28cb21c42cc"
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].Next:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$icons$2f$24$2f$chevron_right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon24ChevronRight"], {
                    className: "tgui-2636b28cb21c42cc"
                });
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].StartEllipsis:
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].EndEllipsis:
                return '...';
            default:
                return item.page;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        role: "tablist",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-38580a5c868cecc4", disabled && "tgui-645f8efe8c9c3cc5", className),
        "aria-disabled": disabled
    }, restProps), {
        children: paginationItems.map((item)=>{
            const isEllipsis = [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].StartEllipsis,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$hooks$2f$enum$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationType"].EndEllipsis
            ].includes(item.type);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Headline$2f$Headline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Headline"], {
                Component: isEllipsis ? 'div' : 'button',
                weight: "2",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-8dab5cf704c88e82", {
                    ["tgui-670c6b2f3c8df445"]: isEllipsis,
                    ["tgui-64016be270020f33"]: item.selected,
                    ["tgui-a43e090d3501d4ca"]: item.disabled
                }),
                "aria-disabled": item.disabled || undefined,
                "aria-current": item['aria-current'],
                onClick: item.disabled || isEllipsis ? undefined : item.onClick,
                children: getPaginationChild(item)
            }, `${item.type}${item.page}`);
        })
    }));
}; //# sourceMappingURL=Pagination.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/SegmentedControl/components/SegmentedControlItem/SegmentedControlItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SegmentedControlItem",
    ()=>SegmentedControlItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/usePlatform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$Tappable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/Tappable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Caption$2f$Caption$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Caption/Caption.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const SegmentedControlItem = (_param)=>{
    var { selected, className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "selected",
        "className",
        "children"
    ]);
    const platform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlatform"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$Tappable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tappable"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        role: "tab",
        Component: "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-bbfb272d22eb23e8", platform === 'ios' && "tgui-513fce1023cbbd63", className)
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Caption$2f$Caption$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Caption"], {
            weight: selected ? '2' : '3',
            children: children
        })
    }));
}; //# sourceMappingURL=SegmentedControlItem.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/SegmentedControl/SegmentedControl.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SegmentedControl",
    ()=>SegmentedControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/usePlatform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$SegmentedControl$2f$components$2f$SegmentedControlItem$2f$SegmentedControlItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/SegmentedControl/components/SegmentedControlItem/SegmentedControlItem.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const SegmentedControl = (_param)=>{
    var { className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "children"
    ]);
    const platform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlatform"])();
    const childrenAsArray = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].toArray(children);
    const checkedIndex = childrenAsArray.findIndex((option)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"])(option) && option.props.selected;
    });
    const translateX = `translateX(${100 * checkedIndex}%)`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        role: "tablist",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-71259e3311d7116e", platform === 'ios' && "tgui-16c6b1986a48e2b5", className)
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: "tgui-b0a9057ab5d33005",
            children: [
                checkedIndex > -1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    "aria-hidden": true,
                    className: "tgui-31f461ccfea23ec3",
                    style: {
                        width: `${100 / childrenAsArray.length}%`,
                        transform: translateX
                    }
                }),
                children
            ]
        })
    }));
};
SegmentedControl.Item = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$SegmentedControl$2f$components$2f$SegmentedControlItem$2f$SegmentedControlItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SegmentedControlItem"]; //# sourceMappingURL=SegmentedControl.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsItem",
    ()=>TabsItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/hooks/usePlatform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$Tappable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/Tappable/Tappable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/Text/Text.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const TabsItem = (_param)=>{
    var { selected, className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "selected",
        "className",
        "children"
    ]);
    const platform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$hooks$2f$usePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlatform"])();
    const iosWeight = selected ? '1' : '2';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$Tappable$2f$Tappable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tappable"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        role: "tab",
        Component: "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-96892ceed80c1bf3", selected && "tgui-44ea091aea23df33", className)
    }, restProps), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
            weight: platform === 'ios' ? iosWeight : '2',
            children: children
        })
    }));
}; //# sourceMappingURL=TabsItem.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/TabsList.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsList",
    ()=>TabsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_spread_props.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_object_without_properties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/helpers/classNames.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$TabsList$2f$components$2f$TabsItem$2f$TabsItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const TabsList = (_param)=>{
    var { className, children } = _param, restProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "children"
    ]);
    const childrenAsArray = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].toArray(children);
    const checkedIndex = childrenAsArray.findIndex((option)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"])(option) && option.props.selected;
    });
    const translateX = `translateX(${100 * checkedIndex}%)`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])({
        role: "tablist",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$helpers$2f$classNames$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])("tgui-89d3925598b8fd68", className)
    }, restProps), {
        children: [
            checkedIndex > -1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                "aria-hidden": true,
                className: "tgui-8e986e14448c29e6",
                style: {
                    width: `${100 / childrenAsArray.length}%`,
                    transform: translateX
                }
            }),
            children
        ]
    }));
};
TabsList.Item = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$TabsList$2f$components$2f$TabsItem$2f$TabsItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsItem"]; //# sourceMappingURL=TabsList.js.map
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Breadcrumbs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Breadcrumbs$2f$Breadcrumbs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Breadcrumbs"],
    "CompactPagination",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$CompactPagination$2f$CompactPagination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompactPagination"],
    "Link",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Link$2f$Link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"],
    "Pagination",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$Pagination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pagination"],
    "SegmentedControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$SegmentedControl$2f$SegmentedControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SegmentedControl"],
    "TabsList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$TabsList$2f$TabsList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Breadcrumbs$2f$Breadcrumbs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/Breadcrumbs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$CompactPagination$2f$CompactPagination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/CompactPagination/CompactPagination.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Link$2f$Link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Link/Link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$Pagination$2f$Pagination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/Pagination/Pagination.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$SegmentedControl$2f$SegmentedControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/SegmentedControl/SegmentedControl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$TabsList$2f$TabsList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/TabsList.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Accordion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Accordion"],
    "AppRoot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppRoot"],
    "Avatar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"],
    "AvatarStack",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarStack"],
    "Badge",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"],
    "Banner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Banner"],
    "Blockquote",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Blockquote"],
    "Breadcrumbs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Breadcrumbs"],
    "Button",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"],
    "ButtonCell",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ButtonCell"],
    "Caption",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Caption"],
    "Card",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"],
    "Cell",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"],
    "Checkbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"],
    "Chip",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Chip"],
    "CircularProgress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CircularProgress"],
    "ColorInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorInput"],
    "CompactPagination",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompactPagination"],
    "Divider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Misc$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Divider"],
    "FileInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileInput"],
    "FixedLayout",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FixedLayout"],
    "Headline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Headline"],
    "IconButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconButton"],
    "IconContainer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconContainer"],
    "Image",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Image"],
    "Info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Info"],
    "InlineButtons",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InlineButtons"],
    "Input",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"],
    "LargeTitle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LargeTitle"],
    "Link",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"],
    "List",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["List"],
    "Modal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"],
    "Multiselect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Multiselect"],
    "Multiselectable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Multiselectable"],
    "Navigation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navigation"],
    "Pagination",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pagination"],
    "PinInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PinInput"],
    "Placeholder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Placeholder"],
    "Popper",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Popper"],
    "Progress",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Progress"],
    "Radio",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Radio"],
    "Rating",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Rating"],
    "RootRenderer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RootRenderer"],
    "Section",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Section"],
    "SegmentedControl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SegmentedControl"],
    "Select",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"],
    "Selectable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Selectable"],
    "Skeleton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"],
    "Slider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slider"],
    "Snackbar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Snackbar"],
    "Spinner",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"],
    "Spoiler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spoiler"],
    "Steps",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Steps"],
    "Subheadline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Subheadline"],
    "Switch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Switch"],
    "Tabbar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabbar"],
    "TabsList",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"],
    "Tappable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tappable"],
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"],
    "Textarea",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"],
    "Timeline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timeline"],
    "Title",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"],
    "Tooltip",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"],
    "Typography",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Typography"],
    "VisuallyHidden",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VisuallyHidden"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Blocks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Blocks/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Feedback$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Feedback/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Form/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Layout$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Layout/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Misc$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Misc/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Navigation$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Navigation/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Overlays$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Overlays/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Service$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Service/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$telegram$2d$apps$2b$telegram$2d$ui$40$2$2e$1$2e$13_$40$types$2b$react$2d$dom$40$19$2e$2$2e$3_$40$types$2b$react$40$19$2e$2$2e$7_$5f40$types$2b$r_cd2a85882c477b95a917a92df729637e$2f$node_modules$2f40$telegram$2d$apps$2f$telegram$2d$ui$2f$dist$2f$components$2f$Typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@telegram-apps+telegram-ui@2.1.13_@types+react-dom@19.2.3_@types+react@19.2.7__@types+r_cd2a85882c477b95a917a92df729637e/node_modules/@telegram-apps/telegram-ui/dist/components/Typography/index.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=81b43_%40telegram-apps_telegram-ui_dist_components_53fe59dd._.js.map