(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/core/init.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "init",
    ()=>init
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+bridge@2.2.0_typescript@5.9.3/node_modules/@tma.js/bridge/dist/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+sdk@3.1.2_typescript@5.9.3/node_modules/@tma.js/sdk/dist/index.js [client] (ecmascript) <locals>");
;
async function init(options) {
    // Set @tma.js/sdk-react debug mode and initialize it.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDebug"])(options.debug);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"])();
    // Add Eruda if needed.
    options.eruda && void __turbopack_context__.A("[project]/node_modules/.pnpm/eruda@3.4.3/node_modules/eruda/eruda.js [client] (ecmascript, async loader)").then(({ default: eruda })=>{
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockTelegramEnv"])({
            onEvent (event, next) {
                if (event.name === 'web_app_request_theme') {
                    let tp = {};
                    if (firstThemeSent) {
                        const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["themeParams"].state;
                        tp = state;
                    } else {
                        firstThemeSent = true;
                        const lp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retrieveLaunchParams"])();
                        tp = lp.tgWebAppThemeParams || {};
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('theme_changed', {
                        theme_params: tp
                    });
                }
                if (event.name === 'web_app_request_safe_area') {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('safe_area_changed', {
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
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["backButton"].mount();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initData"].restore();
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["miniApp"].mount();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["themeParams"].bindCssVars();
    } catch (e) {
    // miniApp not available
    }
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["viewport"].mount().then(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$sdk$40$3$2e$1$2e$2_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$sdk$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["viewport"].bindCssVars();
        });
    } catch (e) {
    // viewport not available
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mockEnv.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockEnv",
    ()=>mockEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+bridge@2.2.0_typescript@5.9.3/node_modules/@tma.js/bridge/dist/index.js [client] (ecmascript) <locals>");
;
async function mockEnv() {
    return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isTMA"])('complete').then((isTma)=>{
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockTelegramEnv"])({
                onEvent (e, next) {
                    // Here you can write your own handlers for all known Telegram Mini Apps methods.
                    if (e.name === 'web_app_request_theme') {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('theme_changed', {
                            theme_params: themeParams
                        });
                    }
                    if (e.name === 'web_app_request_viewport') {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('viewport_changed', {
                            height: window.innerHeight,
                            width: window.innerWidth,
                            is_expanded: true,
                            is_state_stable: true
                        });
                    }
                    if (e.name === 'web_app_request_content_safe_area') {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('content_safe_area_changed', noInsets);
                    }
                    if (e.name === 'web_app_request_safe_area') {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitEvent"])('safe_area_changed', noInsets);
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
"[project]/src/instrumentation-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file is normally used for setting up analytics and other
// services that require one-time initialization on the client.
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$playwright$2b$test$40$1$2e$57$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tma.js+bridge@2.2.0_typescript@5.9.3/node_modules/@tma.js/bridge/dist/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$init$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/init.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockEnv$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockEnv.ts [client] (ecmascript)");
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockEnv$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["mockEnv"])().then(()=>{
    try {
        const launchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tma$2e$js$2b$bridge$40$2$2e$2$2e$0_typescript$40$5$2e$9$2e$3$2f$node_modules$2f40$tma$2e$js$2f$bridge$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retrieveLaunchParams"])();
        const { tgWebAppPlatform: platform } = launchParams;
        const debug = (launchParams.tgWebAppStartParam || '').includes('debug') || ("TURBOPACK compile-time value", "development") === 'development';
        // Configure all application dependencies.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$init$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["init"])({
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
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/_error\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@playwright+test@1.57.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/error.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1557a722._.js.map