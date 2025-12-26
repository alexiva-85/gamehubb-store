module.exports = [
"[project]/public/locales/en.json (json, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/public_locales_en_json_160f770a._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/public/locales/en.json (json)");
    });
});
}),
"[project]/public/locales/ru.json (json, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/public_locales_ru_json_5a94d092._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/public/locales/ru.json (json)");
    });
});
}),
];