"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "lib_content_pages-wrapper_js";
exports.ids = ["lib_content_pages-wrapper_js"];
exports.modules = {

/***/ "./lib/content/pages-wrapper.js":
/*!**************************************!*\
  !*** ./lib/content/pages-wrapper.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getPageBySlug: () => (/* binding */ getPageBySlug),\n/* harmony export */   getPages: () => (/* binding */ getPages)\n/* harmony export */ });\n// 包装文件：动态导入生成的内容文件\n// 这个文件在构建时存在，可以避免 webpack 解析错误\nasync function getPages() {\n    try {\n        const pagesModule = await __webpack_require__.e(/*! import() */ \"lib_content_generated_pages_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./generated/pages.js */ \"./lib/content/generated/pages.js\"));\n        return pagesModule.PAGES || pagesModule.default?.PAGES || pagesModule;\n    } catch (error) {\n        console.error(\"[Content] Error loading pages:\", error.message);\n        return null;\n    }\n}\nasync function getPageBySlug(slug) {\n    const PAGES = await getPages();\n    if (!PAGES) {\n        return null;\n    }\n    return PAGES[slug] || null;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvY29udGVudC9wYWdlcy13cmFwcGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUJBQW1CO0FBQ25CLCtCQUErQjtBQUV4QixlQUFlQTtJQUNwQixJQUFJO1FBQ0YsTUFBTUMsY0FBYyxNQUFNLDJMQUFPO1FBQ2pDLE9BQU9BLFlBQVlDLEtBQUssSUFBSUQsWUFBWUUsT0FBTyxFQUFFRCxTQUFTRDtJQUM1RCxFQUFFLE9BQU9HLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGtDQUFrQ0EsTUFBTUUsT0FBTztRQUM3RCxPQUFPO0lBQ1Q7QUFDRjtBQUVPLGVBQWVDLGNBQWNDLElBQUk7SUFDdEMsTUFBTU4sUUFBUSxNQUFNRjtJQUNwQixJQUFJLENBQUNFLE9BQU87UUFDVixPQUFPO0lBQ1Q7SUFDQSxPQUFPQSxLQUFLLENBQUNNLEtBQUssSUFBSTtBQUN4QiIsInNvdXJjZXMiOlsid2VicGFjazovL2ltYWdlLXRvLXByb21wdC1nZW5lcmF0b3IvLi9saWIvY29udGVudC9wYWdlcy13cmFwcGVyLmpzP2RmZGIiXSwic291cmNlc0NvbnRlbnQiOlsiLy8g5YyF6KOF5paH5Lu277ya5Yqo5oCB5a+85YWl55Sf5oiQ55qE5YaF5a655paH5Lu2XHJcbi8vIOi/meS4quaWh+S7tuWcqOaehOW7uuaXtuWtmOWcqO+8jOWPr+S7pemBv+WFjSB3ZWJwYWNrIOino+aekOmUmeivr1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBhZ2VzKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwYWdlc01vZHVsZSA9IGF3YWl0IGltcG9ydCgnLi9nZW5lcmF0ZWQvcGFnZXMuanMnKTtcclxuICAgIHJldHVybiBwYWdlc01vZHVsZS5QQUdFUyB8fCBwYWdlc01vZHVsZS5kZWZhdWx0Py5QQUdFUyB8fCBwYWdlc01vZHVsZTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignW0NvbnRlbnRdIEVycm9yIGxvYWRpbmcgcGFnZXM6JywgZXJyb3IubWVzc2FnZSk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQYWdlQnlTbHVnKHNsdWcpIHtcclxuICBjb25zdCBQQUdFUyA9IGF3YWl0IGdldFBhZ2VzKCk7XHJcbiAgaWYgKCFQQUdFUykge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiBQQUdFU1tzbHVnXSB8fCBudWxsO1xyXG59XHJcblxyXG4iXSwibmFtZXMiOlsiZ2V0UGFnZXMiLCJwYWdlc01vZHVsZSIsIlBBR0VTIiwiZGVmYXVsdCIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJnZXRQYWdlQnlTbHVnIiwic2x1ZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./lib/content/pages-wrapper.js\n");

/***/ })

};
;