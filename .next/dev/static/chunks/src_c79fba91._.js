(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/core/init.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "init",
    ()=>init
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+bridge@2.2.0_typescript@5.9.3/node_modules/@tma.js/bridge/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+sdk@3.1.2_typescript@5.9.3/node_modules/@tma.js/sdk/dist/index.js [app-client] (ecmascript) <locals>");
;
async function init(options) {
    // Set @tma.js/sdk-react debug mode and initialize it.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDebug"])(options.debug);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"])();
    // Add Eruda if needed.
    options.eruda && void __turbopack_context__.A("[project]/node_modules/.pnpm/eruda@3.4.3/node_modules/eruda/eruda.js [app-client] (ecmascript, async loader)").then(({ default: eruda })=>{
        eruda.init();
        eruda.position({
            x: window.innerWidth - 50,
            y: 0
        });
    });
    // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
    // even response to the "web_app_request_theme" method. It also generates an incorrect
    // event for the "web_app_request_safe_area" method.
    if (options.mockForMacOS) {
        let firstThemeSent = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockTelegramEnv"])({
            onEvent (event, next) {
                if (event.name === 'web_app_request_theme') {
                    let tp = {};
                    if (firstThemeSent) {
                        const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["themeParams"].state;
                        tp = state;
                    } else {
                        firstThemeSent = true;
                        const lp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retrieveLaunchParams"])();
                        tp = lp.tgWebAppThemeParams || {};
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('theme_changed', {
                        theme_params: tp
                    });
                }
                if (event.name === 'web_app_request_safe_area') {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('safe_area_changed', {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    });
                }
                next();
            }
        });
    }
    // Mount all components used in the project.
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["backButton"].mount();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initData"].restore();
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["miniApp"].mount();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["themeParams"].bindCssVars();
    } catch (e) {
    // miniApp not available
    }
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["viewport"].mount().then(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["viewport"].bindCssVars();
        });
    } catch (e) {
    // viewport not available
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mockEnv.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockEnv",
    ()=>mockEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+bridge@2.2.0_typescript@5.9.3/node_modules/@tma.js/bridge/dist/index.js [app-client] (ecmascript) <locals>");
;
async function mockEnv() {
    return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isTMA"])('complete').then((isTma)=>{
        if (!isTma) {
            const themeParams = {
                accent_text_color: '#6ab2f2',
                bg_color: '#17212b',
                button_color: '#5288c1',
                button_text_color: '#ffffff',
                destructive_text_color: '#ec3942',
                header_bg_color: '#17212b',
                hint_color: '#708499',
                link_color: '#6ab3f3',
                secondary_bg_color: '#232e3c',
                section_bg_color: '#17212b',
                section_header_text_color: '#6ab3f3',
                subtitle_text_color: '#708499',
                text_color: '#f5f5f5'
            };
            const noInsets = {
                left: 0,
                top: 0,
                bottom: 0,
                right: 0
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockTelegramEnv"])({
                onEvent (e, next) {
                    // Here you can write your own handlers for all known Telegram Mini Apps methods.
                    if (e.name === 'web_app_request_theme') {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('theme_changed', {
                            theme_params: themeParams
                        });
                    }
                    if (e.name === 'web_app_request_viewport') {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('viewport_changed', {
                            height: window.innerHeight,
                            width: window.innerWidth,
                            is_expanded: true,
                            is_state_stable: true
                        });
                    }
                    if (e.name === 'web_app_request_content_safe_area') {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('content_safe_area_changed', noInsets);
                    }
                    if (e.name === 'web_app_request_safe_area') {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('safe_area_changed', noInsets);
                    }
                    next();
                },
                launchParams: new URLSearchParams([
                    // Discover more launch parameters:
                    // https://docs.telegram-mini-apps.com/platform/launch-parameters#parameters-list
                    [
                        'tgWebAppThemeParams',
                        JSON.stringify(themeParams)
                    ],
                    // Your init data goes here. Learn more about it here:
                    // https://docs.telegram-mini-apps.com/platform/init-data#parameters-list
                    //
                    // Note that to make sure, you are using a valid init data, you must pass it exactly as it
                    // is sent from the Telegram application. The reason is in case you will sort its keys
                    // (auth_date, hash, user, etc.) or values your own way, init data validation will more
                    // likely to fail on your server side. So, to make sure you are working with a valid init
                    // data, it is better to take a real one from your application and paste it here. It should
                    // look something like this (a correctly encoded URL search params):
                    // ```
                    // user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22...
                    // ```
                    // But in case you don't really need a valid init data, use this one:
                    [
                        'tgWebAppData',
                        new URLSearchParams([
                            [
                                'auth_date',
                                (new Date().getTime() / 1000 | 0).toString()
                            ],
                            [
                                'hash',
                                'some-hash'
                            ],
                            [
                                'signature',
                                'some-signature'
                            ],
                            [
                                'user',
                                JSON.stringify({
                                    id: 1,
                                    first_name: 'Vladislav'
                                })
                            ]
                        ]).toString()
                    ],
                    [
                        'tgWebAppVersion',
                        '8.4'
                    ],
                    [
                        'tgWebAppPlatform',
                        'tdesktop'
                    ]
                ])
            });
            console.info('⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.');
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/instrumentation-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file is normally used for setting up analytics and other
// services that require one-time initialization on the client.
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+bridge@2.2.0_typescript@5.9.3/node_modules/@tma.js/bridge/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$init$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/init.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockEnv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockEnv.ts [app-client] (ecmascript)");
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockEnv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockEnv"])().then(()=>{
    try {
        const launchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retrieveLaunchParams"])();
        const { tgWebAppPlatform: platform } = launchParams;
        const debug = (launchParams.tgWebAppStartParam || '').includes('debug') || ("TURBOPACK compile-time value", "development") === 'development';
        // Configure all application dependencies.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$init$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["init"])({
            debug,
            eruda: debug && [
                'ios',
                'android'
            ].includes(platform),
            mockForMacOS: platform === 'macos'
        });
    } catch (e) {
        console.log(e);
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_c79fba91._.js.map