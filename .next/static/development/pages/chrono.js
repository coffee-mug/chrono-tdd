(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static/development/pages/chrono.js"],{

/***/ "./hooks/userInterval.js":
/*!*******************************!*\
  !*** ./hooks/userInterval.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useInterval(callback, delay) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
      count = _useState[0],
      setCount = _useState[1];

  var savedCallback = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    savedCallback.current = callback;
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      var id = setInterval(tick, delay);
      return function () {
        clearInterval(id);
      };
    }
  }, []);
}

/* harmony default export */ __webpack_exports__["default"] = (useInterval);

/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fchrono&absolutePagePath=%2Fhome%2Flucas%2FProgrammation%2Freact_with_tests%2Fchrono%2Fpages%2Fchrono.js!./":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fchrono&absolutePagePath=%2Fhome%2Flucas%2FProgrammation%2Freact_with_tests%2Fchrono%2Fpages%2Fchrono.js ***!
  \**************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/chrono", function() {
      var page = __webpack_require__(/*! ./pages/chrono.js */ "./pages/chrono.js")
      if(true) {
        module.hot.accept(/*! ./pages/chrono.js */ "./pages/chrono.js", function() {
          if(!next.router.components["/chrono"]) return
          var updatedPage = __webpack_require__(/*! ./pages/chrono.js */ "./pages/chrono.js")
          next.router.update("/chrono", updatedPage.default || updatedPage)
        })
      }
      return { page: page.default || page }
    }]);
  

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_129a35c7ec57967eb265 ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_129a35c7ec57967eb265 */ "dll-reference dll_129a35c7ec57967eb265"))("./node_modules/react/index.js");

/***/ }),

/***/ "./pages/chrono.js":
/*!*************************!*\
  !*** ./pages/chrono.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_userInterval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/userInterval */ "./hooks/userInterval.js");
var _jsxFileName = "/home/lucas/Programmation/react_with_tests/chrono/pages/chrono.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



function ChronoComponent() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
      count = _useState[0],
      setCount = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1000),
      delay = _useState2[0],
      setDelay = _useState2[1];

  Object(_hooks_userInterval__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
    setCount(count + 1);
  }, delay);

  function pause() {
    console.log("paused clickd");
    setDelay(null);
  }

  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, __jsx("div", {
    className: "chrono",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, count), __jsx("button", {
    onClick: pause,
    className: "pause",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, "Pause"));
}

/* harmony default export */ __webpack_exports__["default"] = (ChronoComponent);

/***/ }),

/***/ 0:
/*!******************************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2Fchrono&absolutePagePath=%2Fhome%2Flucas%2FProgrammation%2Freact_with_tests%2Fchrono%2Fpages%2Fchrono.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2Fchrono&absolutePagePath=%2Fhome%2Flucas%2FProgrammation%2Freact_with_tests%2Fchrono%2Fpages%2Fchrono.js! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fchrono&absolutePagePath=%2Fhome%2Flucas%2FProgrammation%2Freact_with_tests%2Fchrono%2Fpages%2Fchrono.js!./");


/***/ }),

/***/ "dll-reference dll_129a35c7ec57967eb265":
/*!*******************************************!*\
  !*** external "dll_129a35c7ec57967eb265" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_129a35c7ec57967eb265;

/***/ })

},[[0,"static/runtime/webpack.js"]]]);
//# sourceMappingURL=chrono.js.map