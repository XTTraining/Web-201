/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./styles/main.scss */ \"./src/styles/main.scss\");\n\nvar _GlobalController = __webpack_require__(/*! ./scripts/controller/GlobalController.js */ \"./src/scripts/controller/GlobalController.js\");\n\n__webpack_require__(/*! babel-polyfill */ \"./node_modules/babel-polyfill/lib/index.js\");\n\n_GlobalController.app.loadPolyfills();\n_GlobalController.app.init();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scripts/Polyfills/CustomPolyfill.js":
/*!*************************************************!*\
  !*** ./src/scripts/Polyfills/CustomPolyfill.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Polyfills = exports.Polyfills = function () {\n    function Polyfills() {\n        _classCallCheck(this, Polyfills);\n    }\n\n    _createClass(Polyfills, null, [{\n        key: \"forEachPolyfill\",\n        value: function forEachPolyfill() {\n            if (window.NodeList && !NodeList.prototype.forEach) {\n                NodeList.prototype.forEach = function (callback, params) {\n                    params = params || window;\n                    for (var i = 0; i < this.length; i++) {\n                        callback.call(params, this[i], i, this);\n                    }\n                };\n            }\n        }\n    }, {\n        key: \"scrollBy\",\n        value: function scrollBy() {\n            if (!Element.prototype.scrollBy) {\n                Element.prototype.scrollBy = function (params) {\n                    this.scrollLeft = params.left;\n                };\n            }\n        }\n    }]);\n\n    return Polyfills;\n}();\n\n//# sourceURL=webpack:///./src/scripts/Polyfills/CustomPolyfill.js?");

/***/ }),

/***/ "./src/scripts/cart/CartController.js":
/*!********************************************!*\
  !*** ./src/scripts/cart/CartController.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.CartController = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _cartcontainer = __webpack_require__(/*! ./components/cartcontainer */ \"./src/scripts/cart/components/cartcontainer.js\");\n\nvar _common = __webpack_require__(/*! ./../common/common */ \"./src/scripts/common/common.js\");\n\nvar _lazyLoad = __webpack_require__(/*! ./../common/lazy-load */ \"./src/scripts/common/lazy-load.js\");\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CartController = exports.CartController = function () {\n    function CartController() {\n        _classCallCheck(this, CartController);\n    }\n\n    _createClass(CartController, [{\n        key: 'bindWindowEvents',\n        value: function bindWindowEvents() {\n            var _this = this;\n\n            window.addEventListener('load', function () {\n                (0, _lazyLoad.lazyImgBinder)(_this.storage);\n            });\n            window.addEventListener('scroll', function () {\n                (0, _lazyLoad.lazyImgBinder)(_this.storage);\n            });\n        }\n    }, {\n        key: 'bindComponentEvents',\n        value: function bindComponentEvents() {}\n    }, {\n        key: 'init',\n        value: function init(firebaseStorage) {\n            this.storage = firebaseStorage;\n            this.bindWindowEvents();\n            this.bindComponentEvents();\n\n            _reactDom2.default.render(_react2.default.createElement(_cartcontainer.CartContainerComponent, null), document.getElementById('cart-container'));\n        }\n    }]);\n\n    return CartController;\n}();\n\n//# sourceURL=webpack:///./src/scripts/cart/CartController.js?");

/***/ }),

/***/ "./src/scripts/cart/components/cart.js":
/*!*********************************************!*\
  !*** ./src/scripts/cart/components/cart.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.Cart = undefined;\n\nvar _common = __webpack_require__(/*! ../../common/common */ \"./src/scripts/common/common.js\");\n\nvar _CartItem = __webpack_require__(/*! ../models/CartItem */ \"./src/scripts/cart/models/CartItem.js\");\n\nvar addToCart = function addToCart(size, qty, itemid) {\n    var item = {\n        \"id\": Math.random(),\n        \"size\": size,\n        \"qty\": qty,\n        \"itemid\": itemid,\n        \"time\": new Date().getTime()\n    };\n    var itemstr = getLocalStorageCartItems();\n    var itemArr = void 0;\n    if (itemstr === null) {\n        itemArr = [];\n        itemArr.push(item);\n    } else {\n        itemArr = JSON.parse(itemstr);\n        itemArr.push(item);\n    }\n    itemstr = JSON.stringify(itemArr);\n    setLocalStorageCartItems(itemstr);\n    _common.Common.setCartCount();\n};\n\nvar loadFromCart = function loadFromCart() {\n    var itemstr = getLocalStorageCartItems();\n    var itemArr = void 0;\n    if (itemstr === null) {\n        return null;\n    } else {\n        itemArr = JSON.parse(itemstr);\n        var validItems = _common.Common.fetchItems('menu-items.json');\n        return itemArr.map(function (cartitem) {\n            //      debugger;\n            var validItem = validItems.find(function (t) {\n                return cartitem.itemid === t.id;\n            });\n            if (validItem !== null && validItem !== undefined) {\n                return new _CartItem.CartItem(validItem, cartitem.id, cartitem.size, cartitem.qty, cartitem.time);\n            }\n        });\n    }\n};\n\nvar validateMenuItem = function validateMenuItem(itemid) {\n    var validItems = _common.Common.fetchItems('menu-items.json');\n    var validItem = validItems.find(function (t) {\n        return itemid === t.id;\n    });\n    if (validItem !== null && validItem !== undefined) {\n        return true;\n    }\n    return false;\n};\n\nvar getLocalStorageCartItems = function getLocalStorageCartItems() {\n    return localStorage.getItem('cartItems');\n};\n\nvar setLocalStorageCartItems = function setLocalStorageCartItems(cartItemsstr) {\n    return localStorage.setItem('cartItems', cartItemsstr);\n};\n\nvar removeFromCart = function removeFromCart(cartid) {\n    var itemstr = getLocalStorageCartItems();\n    var arr = JSON.parse(itemstr);\n    arr = arr.filter(function (cartitem) {\n        return cartitem.id != cartid;\n    });\n    setLocalStorageCartItems(JSON.stringify(arr));\n};\n\nvar updateCart = function updateCart(cartitem) {\n    if (validateMenuItem(cartitem.itemid)) {\n        removeFromCart(cartitem.id);\n        var arr = getLocalStorageCartItems();\n        arr = JSON.parse(arr);\n        arr.push(cartitem);\n        setLocalStorageCartItems(JSON.stringify(arr));\n    }\n};\n\nvar getCartItem = function getCartItem(cartid) {\n    var itemstr = getLocalStorageCartItems();\n    var arr = JSON.parse(itemstr);\n    return arr.find(function (cartitem) {\n        return cartitem.id == cartid;\n    });\n};\n\nvar clearCart = function clearCart() {\n    localStorage.clear();\n};\n\nvar Cart = exports.Cart = {\n    loadFromCart: loadFromCart,\n    addToCart: addToCart,\n    getCartItem: getCartItem,\n    updateCart: updateCart,\n    removeFromCart: removeFromCart,\n    clearCart: clearCart\n};\n\n//# sourceURL=webpack:///./src/scripts/cart/components/cart.js?");

/***/ }),

/***/ "./src/scripts/cart/components/cartcontainer.js":
/*!******************************************************!*\
  !*** ./src/scripts/cart/components/cartcontainer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.CartContainerComponent = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _cartitems = __webpack_require__(/*! ./cartitems */ \"./src/scripts/cart/components/cartitems.js\");\n\nvar _cartitems2 = _interopRequireDefault(_cartitems);\n\nvar _subtotal = __webpack_require__(/*! ./subtotal */ \"./src/scripts/cart/components/subtotal.js\");\n\nvar _subtotal2 = _interopRequireDefault(_subtotal);\n\nvar _cart = __webpack_require__(/*! ./cart */ \"./src/scripts/cart/components/cart.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar CartContainerComponent = exports.CartContainerComponent = function (_React$Component) {\n    _inherits(CartContainerComponent, _React$Component);\n\n    function CartContainerComponent() {\n        _classCallCheck(this, CartContainerComponent);\n\n        var _this = _possibleConstructorReturn(this, (CartContainerComponent.__proto__ || Object.getPrototypeOf(CartContainerComponent)).call(this));\n\n        var cartitems = _cart.Cart.loadFromCart();\n        cartitems.sort(function (x, y) {\n            return x.time > y.time;\n        });\n        var sub = Array.from(cartitems);\n        _this.state = {\n            cartitems: cartitems,\n            subtotalitems: sub\n        };\n        return _this;\n    }\n\n    _createClass(CartContainerComponent, [{\n        key: 'cartUpdateCallback',\n        value: function cartUpdateCallback(cartitem) {\n            var isremoved = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n            var arr = this.state.subtotalitems.filter(function (item) {\n                return item.id != cartitem.id;\n            });\n            if (!isremoved) {\n                arr.push(cartitem);\n                var item = {\n                    \"id\": cartitem.id,\n                    \"size\": cartitem.size,\n                    \"qty\": cartitem.qty,\n                    \"itemid\": cartitem.item.id,\n                    \"time\": cartitem.time\n                };\n                _cart.Cart.updateCart(item);\n            } else {\n                _cart.Cart.removeFromCart(cartitem.id);\n            }\n            this.setState({\n                subtotalitems: arr\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                { className: 'cart-items-container col-9 auto-margin' },\n                _react2.default.createElement(\n                    'div',\n                    null,\n                    _react2.default.createElement(\n                        'div',\n                        { className: 'col-9 auto-margin' },\n                        _react2.default.createElement(\n                            'h2',\n                            null,\n                            'Cart'\n                        )\n                    ),\n                    _react2.default.createElement(\n                        'section',\n                        null,\n                        _react2.default.createElement(_cartitems2.default, { cartitems: this.state.cartitems, updatecart: this.cartUpdateCallback.bind(this) })\n                    )\n                ),\n                _react2.default.createElement(\n                    'section',\n                    { className: 'subtotal-container' },\n                    _react2.default.createElement(_subtotal2.default, { subtotalitems: this.state.subtotalitems })\n                )\n            );\n        }\n    }]);\n\n    return CartContainerComponent;\n}(_react2.default.Component);\n\n//# sourceURL=webpack:///./src/scripts/cart/components/cartcontainer.js?");

/***/ }),

/***/ "./src/scripts/cart/components/cartitems.js":
/*!**************************************************!*\
  !*** ./src/scripts/cart/components/cartitems.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.CartItemComponent = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _CartItem = __webpack_require__(/*! ../models/CartItem */ \"./src/scripts/cart/models/CartItem.js\");\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar CartItemComponent = exports.CartItemComponent = function (_React$Component) {\n    _inherits(CartItemComponent, _React$Component);\n\n    function CartItemComponent(props) {\n        _classCallCheck(this, CartItemComponent);\n\n        var _this = _possibleConstructorReturn(this, (CartItemComponent.__proto__ || Object.getPrototypeOf(CartItemComponent)).call(this, props));\n\n        _this.state = {\n            cartitem: props.cartitem\n        };\n        return _this;\n    }\n\n    _createClass(CartItemComponent, [{\n        key: 'getItemAvailableSizes',\n        value: function getItemAvailableSizes(cartitem) {\n            var size = 'size-' + cartitem.id;\n            return _react2.default.createElement(\n                'span',\n                { className: 'label' },\n                cartitem.item.price.h !== undefined ? _react2.default.createElement(\n                    'span',\n                    null,\n                    _react2.default.createElement(\n                        'label',\n                        null,\n                        'H'\n                    ),\n                    _react2.default.createElement('input', { onChange: this.handleSizeChange.bind(this), type: 'radio', name: size, value: 'h', className: 'halfSize', defaultChecked: cartitem.size === 'h' })\n                ) : '',\n                cartitem.item.price.f !== undefined ? _react2.default.createElement(\n                    'span',\n                    null,\n                    _react2.default.createElement(\n                        'label',\n                        null,\n                        'F'\n                    ),\n                    _react2.default.createElement('input', { type: 'radio', onChange: this.handleSizeChange.bind(this), name: size, value: 'f', className: 'fullSize', defaultChecked: cartitem.size === 'f' })\n                ) : ''\n            );\n        }\n    }, {\n        key: 'handleSizeChange',\n        value: function handleSizeChange(e) {\n            var cartitem = this.state.cartitem;\n            var tmp = new _CartItem.CartItem(cartitem.item, cartitem.id, e.target.value, cartitem.qty, cartitem.time);\n\n            this.setState({\n                cartitem: tmp\n            });\n            this.props.updatecart(tmp);\n        }\n    }, {\n        key: 'handleQtyChange',\n        value: function handleQtyChange(e) {\n            e.preventDefault();\n            var cartitem = this.state.cartitem;\n            var tmp = null;\n            if (e.target.className == 'increase-qty' && parseInt(cartitem.qty) < 5) {\n                tmp = new _CartItem.CartItem(cartitem.item, cartitem.id, cartitem.size, parseInt(cartitem.qty) + 1, cartitem.time);\n            } else if (e.target.className == 'reduce-qty' && parseInt(cartitem.qty) > 0) {\n                tmp = new _CartItem.CartItem(cartitem.item, cartitem.id, cartitem.size, parseInt(cartitem.qty) - 1, cartitem.time);\n            }\n            if (tmp != null) {\n                this.setState({\n                    cartitem: tmp\n                });\n            }\n            this.props.updatecart(tmp);\n        }\n    }, {\n        key: 'handleRemove',\n        value: function handleRemove(e) {\n            e.preventDefault();\n            this.props.updatecart(this.state.cartitem, true);\n            this.setState({\n                cartitem: null\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var flag = this.state.cartitem != null;\n            if (flag) {\n                return _react2.default.createElement(\n                    'li',\n                    null,\n                    _react2.default.createElement(\n                        'div',\n                        { className: 'cart-item', 'data-cart-id': this.state.cartitem.id, 'data-item-id': this.state.cartitem.item.id },\n                        _react2.default.createElement(\n                            'div',\n                            { className: 'cart-item-img' },\n                            _react2.default.createElement(\n                                'div',\n                                null,\n                                _react2.default.createElement('img', { 'lazy-img-src': this.state.cartitem.item.imgsrc, src: loaderbase64, alt: this.state.cartitem.item.name, 'img-loaded': 'false' })\n                            )\n                        ),\n                        _react2.default.createElement(\n                            'div',\n                            { className: 'cart-item-desc' },\n                            _react2.default.createElement(\n                                'div',\n                                null,\n                                _react2.default.createElement(\n                                    'h3',\n                                    null,\n                                    this.state.cartitem.item.name\n                                )\n                            ),\n                            _react2.default.createElement(\n                                'div',\n                                { className: 'size-container' },\n                                this.getItemAvailableSizes(this.state.cartitem)\n                            ),\n                            _react2.default.createElement(\n                                'div',\n                                { className: 'item-price' },\n                                _react2.default.createElement(\n                                    'span',\n                                    null,\n                                    '\\u20B9',\n                                    this.state.cartitem.price,\n                                    ' * ',\n                                    this.state.cartitem.qty\n                                )\n                            )\n                        ),\n                        _react2.default.createElement(\n                            'div',\n                            { className: 'item-qty' },\n                            _react2.default.createElement(\n                                'h4',\n                                null,\n                                _react2.default.createElement(\n                                    'span',\n                                    null,\n                                    _react2.default.createElement(\n                                        'a',\n                                        { className: 'reduce-qty', href: '#', onClick: this.handleQtyChange.bind(this) },\n                                        '-'\n                                    ),\n                                    _react2.default.createElement('input', { type: 'text', className: 'item-qty', readOnly: true, value: this.state.cartitem.qty }),\n                                    _react2.default.createElement(\n                                        'a',\n                                        { className: 'increase-qty', href: '#', onClick: this.handleQtyChange.bind(this) },\n                                        '+'\n                                    )\n                                )\n                            )\n                        ),\n                        _react2.default.createElement(\n                            'div',\n                            { className: 'remove-item' },\n                            _react2.default.createElement(\n                                'button',\n                                { onClick: this.handleRemove.bind(this) },\n                                'REMOVE'\n                            )\n                        )\n                    )\n                );\n            } else {\n                return '';\n            }\n        }\n    }]);\n\n    return CartItemComponent;\n}(_react2.default.Component);\n\nvar CartItemsComponent = function (_React$Component2) {\n    _inherits(CartItemsComponent, _React$Component2);\n\n    function CartItemsComponent(props) {\n        _classCallCheck(this, CartItemsComponent);\n\n        return _possibleConstructorReturn(this, (CartItemsComponent.__proto__ || Object.getPrototypeOf(CartItemsComponent)).call(this, props));\n    }\n\n    _createClass(CartItemsComponent, [{\n        key: 'render',\n        value: function render() {\n            var _this3 = this;\n\n            var items = this.props.cartitems.map(function (cartitem) {\n                return _react2.default.createElement(CartItemComponent, { updatecart: _this3.props.updatecart, cartitem: cartitem, key: cartitem.id });\n            });\n            if (items.length > 0) {\n                return _react2.default.createElement(\n                    'ol',\n                    null,\n                    items\n                );\n            } else {\n                return _react2.default.createElement(\n                    'div',\n                    { 'class': 'auto-margin col-9' },\n                    _react2.default.createElement(\n                        'h3',\n                        null,\n                        'Cart is empty!'\n                    ),\n                    ' ',\n                    _react2.default.createElement(\n                        'a',\n                        { href: '/index.html', style: { color: 'blue' } },\n                        'Go back to Menu'\n                    )\n                );\n            }\n        }\n    }]);\n\n    return CartItemsComponent;\n}(_react2.default.Component);\n\nexports.default = CartItemsComponent;\n\n\nvar loaderbase64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiNiZWJlYmUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2NCA2NCkiLz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjOTc5Nzk3IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iIzZlNmU2ZSIgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiMzYzNjM2MiIHRyYW5zZm9ybT0icm90YXRlKDMxNSA2NCA2NCkiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDY0IDY0OzQ1IDY0IDY0OzkwIDY0IDY0OzEzNSA2NCA2NDsxODAgNjQgNjQ7MjI1IDY0IDY0OzI3MCA2NCA2NDszMTUgNjQgNjQiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSI3MjBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PGc+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iNjMuNjYiIGN5PSI2My4xNiIgcj0iMTIiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBkdXI9IjcyMG1zIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBrZXlUaW1lcz0iMDswLjU7MSIgdmFsdWVzPSIxOzA7MSIvPjwvZz48L3N2Zz4=';\n\n//# sourceURL=webpack:///./src/scripts/cart/components/cartitems.js?");

/***/ }),

/***/ "./src/scripts/cart/components/subtotal.js":
/*!*************************************************!*\
  !*** ./src/scripts/cart/components/subtotal.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar SubTotalComponent = function (_React$Component) {\n    _inherits(SubTotalComponent, _React$Component);\n\n    function SubTotalComponent() {\n        _classCallCheck(this, SubTotalComponent);\n\n        return _possibleConstructorReturn(this, (SubTotalComponent.__proto__ || Object.getPrototypeOf(SubTotalComponent)).apply(this, arguments));\n    }\n\n    _createClass(SubTotalComponent, [{\n        key: \"calculateSubtotal\",\n        value: function calculateSubtotal(subtotalitems) {\n            var subtotal = subtotalitems.length > 1 ? subtotalitems.reduce(function (acc, value) {\n                if (acc.price != undefined) {\n                    acc = Number.parseInt(acc.price) * Number.parseInt(acc.qty);\n                }\n                return Number.parseInt(acc) + Number.parseInt(value.price) * Number.parseInt(value.qty);\n            }) : subtotalitems[0].price * subtotalitems[0].qty;\n            return subtotal;\n        }\n    }, {\n        key: \"render\",\n        value: function render() {\n            var subtotal = 0;\n\n            var items = this.props.subtotalitems.map(function (item, index) {\n                subtotal += item.price * item.qty;\n                return _react2.default.createElement(\n                    \"div\",\n                    { className: \"subtotal-item\", key: index },\n                    _react2.default.createElement(\n                        \"span\",\n                        null,\n                        item.item.name\n                    ),\n                    _react2.default.createElement(\n                        \"span\",\n                        { className: \"align-right\" },\n                        \"\\u20B9\",\n                        item.price,\n                        \" x \",\n                        item.qty\n                    )\n                );\n            });\n            return _react2.default.createElement(\n                \"div\",\n                { className: \"subtotal-container-div\" },\n                _react2.default.createElement(\n                    \"h3\",\n                    null,\n                    \"SUBTOTAL\"\n                ),\n                _react2.default.createElement(\n                    \"div\",\n                    { className: \"subtotal-items\" },\n                    items\n                ),\n                _react2.default.createElement(\n                    \"div\",\n                    { className: \"subtotal-price\" },\n                    _react2.default.createElement(\n                        \"span\",\n                        null,\n                        \"Subtotal(\",\n                        items.length,\n                        \" items)\"\n                    ),\n                    _react2.default.createElement(\n                        \"span\",\n                        { className: \"align-right\" },\n                        \"\\u20B9\",\n                        subtotal\n                    )\n                )\n            );\n        }\n    }]);\n\n    return SubTotalComponent;\n}(_react2.default.Component);\n\nexports.default = SubTotalComponent;\n\n//# sourceURL=webpack:///./src/scripts/cart/components/subtotal.js?");

/***/ }),

/***/ "./src/scripts/cart/index.js":
/*!***********************************!*\
  !*** ./src/scripts/cart/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.cart = undefined;\n\nvar _CartController = __webpack_require__(/*! ./CartController */ \"./src/scripts/cart/CartController.js\");\n\nvar cart = exports.cart = new _CartController.CartController();\n\n//# sourceURL=webpack:///./src/scripts/cart/index.js?");

/***/ }),

/***/ "./src/scripts/cart/models/CartItem.js":
/*!*********************************************!*\
  !*** ./src/scripts/cart/models/CartItem.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CartItem = exports.CartItem = function CartItem(item, id, size, qty, time) {\n    _classCallCheck(this, CartItem);\n\n    this.id = id;\n    this.item = item;\n    this.qty = qty;\n    this.size = size;\n    this.price = item.price[size];\n    this.time = time;\n};\n\n//# sourceURL=webpack:///./src/scripts/cart/models/CartItem.js?");

/***/ }),

/***/ "./src/scripts/checkout/CheckoutController.js":
/*!****************************************************!*\
  !*** ./src/scripts/checkout/CheckoutController.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.CheckoutController = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _common = __webpack_require__(/*! ./../common/common */ \"./src/scripts/common/common.js\");\n\nvar _accordian = __webpack_require__(/*! ./components/accordian */ \"./src/scripts/checkout/components/accordian.js\");\n\nvar _ordersummary = __webpack_require__(/*! ./components/ordersummary */ \"./src/scripts/checkout/components/ordersummary.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CheckoutController = exports.CheckoutController = function () {\n    function CheckoutController() {\n        _classCallCheck(this, CheckoutController);\n    }\n\n    _createClass(CheckoutController, [{\n        key: 'bindWindowEvents',\n        value: function bindWindowEvents() {}\n    }, {\n        key: 'bindComponentEvents',\n        value: function bindComponentEvents() {\n            _common.selector.proceed().forEach(function (t) {\n                return t.addEventListener('click', _accordian.accordian.openNxtAccordian);\n            });\n            _common.selector.accordianbtn().forEach(function (t) {\n                return t.addEventListener('click', _accordian.accordian.openAccordian);\n            });\n            _common.selector.pay().forEach(function (t) {\n                return t.addEventListener('click', _accordian.accordian.pay);\n            });\n        }\n    }, {\n        key: 'init',\n        value: function init() {\n\n            this.bindWindowEvents();\n            this.bindComponentEvents();\n            _ordersummary.order.populateOrderSummary();\n        }\n    }]);\n\n    return CheckoutController;\n}();\n\n//# sourceURL=webpack:///./src/scripts/checkout/CheckoutController.js?");

/***/ }),

/***/ "./src/scripts/checkout/components/accordian.js":
/*!******************************************************!*\
  !*** ./src/scripts/checkout/components/accordian.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.accordian = undefined;\n\nvar _common = __webpack_require__(/*! ../../common/common */ \"./src/scripts/common/common.js\");\n\nvar _cart = __webpack_require__(/*! ../../cart/components/cart */ \"./src/scripts/cart/components/cart.js\");\n\nvar openNxtAccordian = function openNxtAccordian(e) {\n\n    e.preventDefault();\n    var currentAccordian = e.target.parentElement.parentElement;\n    var nxtAccordian = currentAccordian.parentElement.nextElementSibling.querySelector('div');\n\n    currentAccordian.style['display'] = 'none';\n    nxtAccordian.style['display'] = 'grid';\n    _common.selector.addressaccordianinput().forEach(function (input) {\n        if (input.value == '' || input.value == undefined) {\n            currentAccordian.style['display'] = 'grid';\n            nxtAccordian.style['display'] = 'none';\n        }\n    });\n};\n\nvar openAccordian = function openAccordian(e) {\n    e.preventDefault();\n    _common.selector.addressaccordianinput().forEach(function (input) {\n        e.target.parentElement.querySelector('div').style['display'] = 'grid';\n        if (input.value == '' || input.value == undefined) {\n            e.target.parentElement.querySelector('div').style['display'] = 'none';\n        }\n    });\n};\n\nvar pay = function pay(e) {\n    e.preventDefault();\n    _cart.Cart.clearCart();\n    window.location = '/index.html';\n};\n\nvar accordian = exports.accordian = {\n    openAccordian: openAccordian,\n    openNxtAccordian: openNxtAccordian,\n    pay: pay\n};\n\n//# sourceURL=webpack:///./src/scripts/checkout/components/accordian.js?");

/***/ }),

/***/ "./src/scripts/checkout/components/ordersummary.js":
/*!*********************************************************!*\
  !*** ./src/scripts/checkout/components/ordersummary.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.order = undefined;\n\nvar _common = __webpack_require__(/*! ../../common/common */ \"./src/scripts/common/common.js\");\n\nvar _cart = __webpack_require__(/*! ../../cart/components/cart */ \"./src/scripts/cart/components/cart.js\");\n\nvar _ordersummary = __webpack_require__(/*! ./../templates/ordersummary */ \"./src/scripts/checkout/templates/ordersummary.js\");\n\nvar populateOrderSummary = function populateOrderSummary() {\n    //  selector.ordersummary().innerHTML = '';\n    _common.selector.ordersummary().insertAdjacentHTML('afterbegin', orderSummaryDom());\n};\n\nvar orderSummaryDom = function orderSummaryDom() {\n    var cartitems = _cart.Cart.loadFromCart();\n    if (cartitems.length < 1) {\n        window.location = '/index.html';\n    }\n    var subtotal = cartitems.length > 1 ? cartitems.reduce(function (acc, value) {\n        if (acc.price != undefined) {\n            acc = Number.parseInt(acc.price) * Number.parseInt(acc.qty);\n        }\n        return Number.parseInt(acc) + Number.parseInt(value.price) * Number.parseInt(value.qty);\n    }) : Number.parseInt(cartitems[0].price) * Number.parseInt(cartitems[0].qty);\n    var tax = subtotal * .05;\n    var total = parseFloat(subtotal + tax).toFixed(2);\n    return (0, _ordersummary.orderSummaryTemplate)(cartitems, subtotal, tax, total);\n};\n\nvar order = exports.order = {\n    populateOrderSummary: populateOrderSummary\n};\n\n//# sourceURL=webpack:///./src/scripts/checkout/components/ordersummary.js?");

/***/ }),

/***/ "./src/scripts/checkout/index.js":
/*!***************************************!*\
  !*** ./src/scripts/checkout/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.checkout = undefined;\n\nvar _CheckoutController = __webpack_require__(/*! ./CheckoutController */ \"./src/scripts/checkout/CheckoutController.js\");\n\nvar checkout = exports.checkout = new _CheckoutController.CheckoutController();\n\n//# sourceURL=webpack:///./src/scripts/checkout/index.js?");

/***/ }),

/***/ "./src/scripts/checkout/templates/ordersummary.js":
/*!********************************************************!*\
  !*** ./src/scripts/checkout/templates/ordersummary.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n                value: true\n});\nvar orderSummaryTemplate = exports.orderSummaryTemplate = function orderSummaryTemplate(cartitems, subtotal, tax, total) {\n\n                return cartitems.map(function (cartitem) {\n                                return '<span>' + cartitem.item.name + ' (' + cartitem.size + ') x ' + cartitem.qty + '</span><span>\\u20B9' + cartitem.price * cartitem.qty + '</span>';\n                }).join('') + '<span>SUBTOTAL</span><span>\\u20B9' + subtotal + '</span>\\n                    <span>TAX (5%)</span><span>\\u20B9' + tax + '</span>\\n                    <span class=\\'total-price\\'>TOTAL</span><span class=\\'total-price\\'>\\u20B9' + total + '</span>';\n};\n\n//# sourceURL=webpack:///./src/scripts/checkout/templates/ordersummary.js?");

/***/ }),

/***/ "./src/scripts/common/common.js":
/*!**************************************!*\
  !*** ./src/scripts/common/common.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n\nvar selector = exports.selector = function () {\n    return {\n        \"leftarrow\": function leftarrow() {\n            return document.querySelector('.featured-carousel .arrow.left');\n        },\n        \"rightarrow\": function rightarrow() {\n            return document.querySelector('.featured-carousel .arrow.right');\n        },\n        \"featureditems\": function featureditems() {\n            return document.querySelectorAll('.featured-carousel .featured-item');\n        },\n        \"slider\": function slider() {\n            return document.querySelector('.slider');\n        },\n        \"categories\": function categories() {\n            return document.querySelectorAll('.categories li');\n        },\n        \"categories_ul\": function categories_ul() {\n            return document.querySelector('.categories ul');\n        },\n        \"category\": function category() {\n            return document.querySelectorAll('section.category:not(.search-result-section)');\n        },\n        \"categorytarget\": function categorytarget() {\n            return document.querySelector('section.category:target');\n        },\n        \"header\": function header() {\n            return document.querySelector('header');\n        },\n        \"menuitems\": function menuitems() {\n            return document.querySelector('.menu-items');\n        },\n        \"lazyimg\": function lazyimg() {\n            return document.querySelectorAll('img[lazy-img-src]');\n        },\n        \"menuitemcontainer\": function menuitemcontainer() {\n            return document.querySelector('.menu-item-container');\n        },\n        \"adddummybtn\": function adddummybtn() {\n            return document.querySelectorAll('.add-btn-dummy-container button');\n        },\n        \"searchbar\": function searchbar() {\n            return document.querySelector('.search-bar input');\n        },\n        \"searchresults\": function searchresults() {\n            return document.querySelector('.search-results');\n        },\n        \"searchresultsection\": function searchresultsection() {\n            return document.querySelector('.search-result-section');\n        },\n        \"searchresultsectionmenuitems\": function searchresultsectionmenuitems() {\n            return document.querySelector('.search-result-section .menu-items');\n        },\n        \"searchIcon\": function searchIcon() {\n            return document.querySelector('.search-icon');\n        },\n        \"closeIcon\": function closeIcon() {\n            return document.querySelector('.close-icon');\n        },\n        \"fullmenudiv\": function fullmenudiv() {\n            return document.querySelector('.full-menu div');\n        },\n        \"itemSize\": function itemSize() {\n            return document.querySelectorAll('.fullSize,.halfSize');\n        },\n        \"reduceQty\": function reduceQty() {\n            return document.querySelectorAll('a.reduce-qty');\n        },\n        \"increaseQty\": function increaseQty() {\n            return document.querySelectorAll('a.increase-qty');\n        },\n        \"removeItem\": function removeItem() {\n            return document.querySelectorAll('.remove-item');\n        },\n        \"addtocartbtn\": function addtocartbtn() {\n            return document.querySelectorAll('button.add-to-cart-btn');\n        },\n        \"cartcount\": function cartcount() {\n            return document.querySelector('.cart-count');\n        },\n        //\"cartcounts\": () => document.querySelector('ol.cart-items'),\n        \"cartcounts\": function cartcounts() {\n            return document.querySelector('.cart-container div section');\n        },\n        \"cartprice\": function cartprice() {\n            return document.querySelectorAll('.item-price span');\n        },\n        \"subtotalcontainer\": function subtotalcontainer() {\n            return document.querySelector('.subtotal-container div');\n        },\n        \"proceed\": function proceed() {\n            return document.querySelectorAll('.accordian-container a');\n        },\n        \"addressaccordianinput\": function addressaccordianinput() {\n            return document.querySelectorAll('#address div input');\n        },\n        \"accordianbtn\": function accordianbtn() {\n            return document.querySelectorAll('.accordian-container button');\n        },\n        \"ordersummary\": function ordersummary() {\n            return document.querySelector('.summary');\n        },\n        \"pay\": function pay() {\n            return document.querySelectorAll('.pay');\n        }\n\n    };\n}();\n\nvar Common = exports.Common = function () {\n    function Common() {\n        _classCallCheck(this, Common);\n    }\n\n    _createClass(Common, null, [{\n        key: \"fetchItems\",\n        value: function fetchItems(filename) {\n            var tmp = void 0;\n            $.ajax({\n                url: '/static/' + filename,\n                datatype: \"json\",\n                async: false,\n                success: function success(items) {\n                    tmp = Object.values(items);\n                }\n            });\n            return tmp;\n        }\n    }, {\n        key: \"setCartCount\",\n        value: function setCartCount() {\n            selector.cartcount().innerText = loadFromCart().length;\n        }\n    }]);\n\n    return Common;\n}();\n\nvar loadFromCart = function loadFromCart() {\n    var itemstr = localStorage.getItem('cartItems');\n    var itemArr = void 0;\n    if (itemstr === null) {\n        return [];\n    } else {\n        itemArr = JSON.parse(itemstr);\n        return itemArr;\n    }\n};\n\n//# sourceURL=webpack:///./src/scripts/common/common.js?");

/***/ }),

/***/ "./src/scripts/common/header.js":
/*!**************************************!*\
  !*** ./src/scripts/common/header.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.Header = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _common = __webpack_require__(/*! ./common */ \"./src/scripts/common/common.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Header = exports.Header = function () {\n    function Header() {\n        _classCallCheck(this, Header);\n    }\n\n    _createClass(Header, null, [{\n        key: 'reduceHeaderOnScroll',\n        value: function reduceHeaderOnScroll() {\n\n            if (Math.floor(window.scrollY) > 10) {\n                _common.selector.header().className = 'header-height-s';\n            } else if (_common.selector.header().className === 'header-height-s') {\n                _common.selector.header().className = 'header-height-l';\n            }\n        }\n    }]);\n\n    return Header;\n}();\n\n//# sourceURL=webpack:///./src/scripts/common/header.js?");

/***/ }),

/***/ "./src/scripts/common/lazy-load.js":
/*!*****************************************!*\
  !*** ./src/scripts/common/lazy-load.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.lazyImgBinder = undefined;\n\nvar _common = __webpack_require__(/*! ./common */ \"./src/scripts/common/common.js\");\n\nvar lazyBind = function lazyBind(firebasestorage, ele) {\n    var rect = ele.getBoundingClientRect();\n    if (ele.attributes['img-loaded'].value === 'false' && (rect.top < window.innerHeight - 100 && rect.top > 0 || rect.bottom > 0 && rect.bottom < window.innerHeight + 100)) {\n        var imgname = ele.attributes['lazy-img-src'].value;\n        firebasestorage.ref().child('menuitems/' + imgname).getDownloadURL().then(function (url) {\n            ele.attributes['src'].value = url;\n        }).catch(function () {\n            ele.attributes['src'].value = '/static/dummy.jpg';\n        });\n        ele.attributes['img-loaded'].value = 'true';\n    }\n};\n\nvar lazyImgBinder = exports.lazyImgBinder = function lazyImgBinder(firebasestorage) {\n    _common.selector.lazyimg().forEach(function (img) {\n        lazyBind(firebasestorage, img);\n    });\n};\n\n//# sourceURL=webpack:///./src/scripts/common/lazy-load.js?");

/***/ }),

/***/ "./src/scripts/controller/ComponentsController.js":
/*!********************************************************!*\
  !*** ./src/scripts/controller/ComponentsController.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.ComponentsController = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _index = __webpack_require__(/*! ../home/index.js */ \"./src/scripts/home/index.js\");\n\nvar _index2 = __webpack_require__(/*! ../cart/index.js */ \"./src/scripts/cart/index.js\");\n\nvar _header = __webpack_require__(/*! ../common/header.js */ \"./src/scripts/common/header.js\");\n\nvar _common = __webpack_require__(/*! ../common/common.js */ \"./src/scripts/common/common.js\");\n\nvar _index3 = __webpack_require__(/*! ./../checkout/index.js */ \"./src/scripts/checkout/index.js\");\n\nvar _app = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/index.cjs.js\");\n\nvar _app2 = _interopRequireDefault(_app);\n\n__webpack_require__(/*! firebase/storage */ \"./node_modules/firebase/storage/dist/index.esm.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ComponentsController = exports.ComponentsController = function () {\n    function ComponentsController(page) {\n        _classCallCheck(this, ComponentsController);\n\n        this.page = page;\n        var config = {\n            apiKey: \"AIzaSyB9NBMkReB1oOkdSO4Csk9qbZPqx4uXh20\",\n            authDomain: \"web201-201.firebaseapp.com\",\n            databaseURL: \"https://web201-201.firebaseio.com\",\n            projectId: \"web201-201\",\n            storageBucket: \"web201-201.appspot.com\",\n            messagingSenderId: \"527954885165\"\n        };\n        _app2.default.initializeApp(config);\n        this.firebaseStorage = _app2.default.storage();\n    }\n\n    _createClass(ComponentsController, [{\n        key: 'init',\n        value: function init() {\n            window.addEventListener('scroll', _header.Header.reduceHeaderOnScroll);\n            window.addEventListener('load', _header.Header.reduceHeaderOnScroll);\n            window.addEventListener('load', _common.Common.setCartCount);\n            switch (this.page) {\n                case 'cart':\n                    {\n                        _index2.cart.init(this.firebaseStorage);\n                        break;\n                    }\n                case 'checkout':\n                    {\n                        _index3.checkout.init(this.firebaseStorage);\n                        break;\n                    }\n                default:\n                    {\n                        _index.home.init(this.firebaseStorage);\n                        break;\n                    }\n            }\n        }\n    }]);\n\n    return ComponentsController;\n}();\n\n//# sourceURL=webpack:///./src/scripts/controller/ComponentsController.js?");

/***/ }),

/***/ "./src/scripts/controller/GlobalController.js":
/*!****************************************************!*\
  !*** ./src/scripts/controller/GlobalController.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.app = undefined;\n\nvar _ComponentsController = __webpack_require__(/*! ./ComponentsController.js */ \"./src/scripts/controller/ComponentsController.js\");\n\nvar _routes = __webpack_require__(/*! ./../routes/routes.js */ \"./src/scripts/routes/routes.js\");\n\nvar _CustomPolyfill = __webpack_require__(/*! ../Polyfills/CustomPolyfill.js */ \"./src/scripts/Polyfills/CustomPolyfill.js\");\n\nvar initComponents = function initComponents() {\n    var ci = new _ComponentsController.ComponentsController(_routes.Route.getPage());\n    ci.init();\n};\n\nvar loadPolyfills = function loadPolyfills() {\n    _CustomPolyfill.Polyfills.forEachPolyfill();\n    _CustomPolyfill.Polyfills.scrollBy();\n};\n\nvar app = exports.app = {\n    init: initComponents,\n    loadPolyfills: loadPolyfills\n};\n\n//# sourceURL=webpack:///./src/scripts/controller/GlobalController.js?");

/***/ }),

/***/ "./src/scripts/home/HomeController.js":
/*!********************************************!*\
  !*** ./src/scripts/home/HomeController.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.HomeController = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _category = __webpack_require__(/*! ./components/category.js */ \"./src/scripts/home/components/category.js\");\n\nvar _carousel = __webpack_require__(/*! ./components/carousel.js */ \"./src/scripts/home/components/carousel.js\");\n\nvar _menuitem = __webpack_require__(/*! ./components/menuitem.js */ \"./src/scripts/home/components/menuitem.js\");\n\nvar _lazyLoad = __webpack_require__(/*! ./../common/lazy-load */ \"./src/scripts/common/lazy-load.js\");\n\nvar _common = __webpack_require__(/*! ../common/common.js */ \"./src/scripts/common/common.js\");\n\nvar _search = __webpack_require__(/*! ./components/search */ \"./src/scripts/home/components/search.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar HomeController = exports.HomeController = function () {\n    function HomeController() {\n        _classCallCheck(this, HomeController);\n    }\n\n    _createClass(HomeController, [{\n        key: 'populateData',\n        value: function populateData() {\n            _menuitem.menuItems.populateData();\n            _menuitem.menuItems.populateFullMenuData();\n            _category.category.populateData();\n        }\n    }, {\n        key: 'init',\n        value: function init(firebaseStorage) {\n            this.storage = firebaseStorage;\n            this.populateData();\n            _search.search.generateMenuIndex();\n            this.bindWindowEvents();\n            this.bindComponentEvents();\n        }\n    }, {\n        key: 'bindWindowEvents',\n        value: function bindWindowEvents() {\n            var _this = this;\n\n            window.addEventListener('scroll', _category.category.selectCategory);\n            window.addEventListener('load', function () {\n                (0, _lazyLoad.lazyImgBinder)(_this.storage);\n            });\n            window.addEventListener('scroll', function () {\n                (0, _lazyLoad.lazyImgBinder)(_this.storage);\n            });\n        }\n    }, {\n        key: 'bindComponentEvents',\n        value: function bindComponentEvents() {\n            _common.selector.rightarrow().addEventListener('click', _carousel.carousel.moveRight);\n            _common.selector.leftarrow().addEventListener('click', _carousel.carousel.moveLeft);\n            _common.selector.searchbar().addEventListener('keyup', _search.search.searchForInput);\n            _common.selector.searchIcon().addEventListener('click', _search.search.searchAndGetAll);\n            _common.selector.closeIcon().addEventListener('click', _search.search.clearSearch);\n            _common.selector.adddummybtn().forEach(function (t) {\n                return t.addEventListener('focusin', _menuitem.menuItems.showAddToCart);\n            });\n            _common.selector.adddummybtn().forEach(function (t) {\n                return t.addEventListener('focusout', _menuitem.menuItems.hideAddToCart);\n            });\n\n            _common.selector.itemSize().forEach(function (size) {\n                size.addEventListener('click', _menuitem.menuItems.selectSize);\n            });\n\n            _common.selector.reduceQty().forEach(function (t) {\n                t.addEventListener('click', _menuitem.menuItems.reduceQty);\n            });\n            _common.selector.increaseQty().forEach(function (t) {\n                t.addEventListener('click', _menuitem.menuItems.increaseQty);\n            });\n            _common.selector.addtocartbtn().forEach(function (t) {\n                t.addEventListener('click', _menuitem.menuItems.getSelectedItem);\n            });\n        }\n    }]);\n\n    return HomeController;\n}();\n\n//# sourceURL=webpack:///./src/scripts/home/HomeController.js?");

/***/ }),

/***/ "./src/scripts/home/components/carousel.js":
/*!*************************************************!*\
  !*** ./src/scripts/home/components/carousel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.carousel = undefined;\n\nvar _common = __webpack_require__(/*! ../../common/common.js */ \"./src/scripts/common/common.js\");\n\nvar moveRight = function moveRight() {\n    _common.selector.slider().scrollBy({\n        left: window.innerWidth * 0.85,\n        behavior: 'smooth'\n    });\n    if (_common.selector.slider().scrollWidth < _common.selector.slider().scrollLeft + window.innerWidth * 0.85) {\n        _common.selector.slider().scrollBy({\n            left: _common.selector.slider().scrollWidth * -1,\n            behavior: 'smooth'\n        });\n    }\n};\n\nvar moveLeft = function moveLeft() {\n    _common.selector.slider().scrollBy({\n        left: window.innerWidth * 0.85 * -1,\n        behavior: 'smooth'\n    });\n};\n\nvar carousel = exports.carousel = {\n    moveRight: moveRight,\n    moveLeft: moveLeft\n};\n\n//# sourceURL=webpack:///./src/scripts/home/components/carousel.js?");

/***/ }),

/***/ "./src/scripts/home/components/category.js":
/*!*************************************************!*\
  !*** ./src/scripts/home/components/category.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.category = exports.allCategoriesDom = undefined;\n\nvar _common = __webpack_require__(/*! ../../common/common.js */ \"./src/scripts/common/common.js\");\n\nvar _Category = __webpack_require__(/*! ../models/Category */ \"./src/scripts/home/models/Category.js\");\n\nvar _category = __webpack_require__(/*! ../templates/category */ \"./src/scripts/home/templates/category.js\");\n\nvar _common2 = __webpack_require__(/*! ../../common/common */ \"./src/scripts/common/common.js\");\n\nvar selectCategory = function selectCategory() {\n    _common.selector.category().forEach(function (ele) {\n        var bufferheight = window.innerHeight * 0.08;\n        var winloc = bufferheight + window.scrollY;\n\n        if (Math.floor(winloc) >= Math.floor(ele.offsetTop - bufferheight) && Math.floor(winloc) <= Math.floor(ele.offsetTop + ele.offsetHeight - bufferheight)) {\n\n            _common.selector.categories().forEach(function (x) {\n                if (x.id == 'cat-' + ele.id) {\n                    x.style['background-color'] = \"#f7a91980\";\n                    x.style['font-weight'] = \"600\";\n                } else {\n                    x.style['background-color'] = '#fff';\n                    x.style['font-weight'] = \"400\";\n                }\n            });\n        } else {\n            ele.style['background-color'] = '#fff';\n            //ele.style = \"background-color:#fff\";\n        }\n    });\n};\n\nvar fetchCategories = function fetchCategories() {\n    var tmp = [];\n    var items = _common2.Common.fetchItems('categories.json');\n    for (var i = 0; i < items.length; i++) {\n        tmp.push(new _Category.Category(items[i].id, items[i].name, items[i].imgsrc));\n    }\n    return tmp;\n};\n\nvar fetchCategories2 = function fetchCategories2() {\n    var tmp = [];\n    var items = _common2.Common.fetchItems('categories2.json');\n    for (var i = 0; i < items.length; i++) {\n        tmp.push(new _Category.Category(items[i].id, items[i].name));\n    }\n    return tmp;\n};\n\nvar allCategoriesDom = exports.allCategoriesDom = function allCategoriesDom() {\n\n    var _allcategories = '';\n    fetchCategories().forEach(function (cat) {\n        _allcategories += (0, _category.categoryTemplate)(cat);\n    });\n    return _allcategories;\n};\n\nvar populateData = function populateData() {\n    _common.selector.categories_ul().innerHTML = '';\n    _common.selector.categories_ul().insertAdjacentHTML(\"afterbegin\", allCategoriesDom());\n};\n\nvar category = exports.category = {\n    selectCategory: selectCategory,\n    populateData: populateData,\n    allCategoriesDom: allCategoriesDom,\n    fetchCategories: fetchCategories,\n    fetchCategories2: fetchCategories2\n};\n\n//# sourceURL=webpack:///./src/scripts/home/components/category.js?");

/***/ }),

/***/ "./src/scripts/home/components/menuitem.js":
/*!*************************************************!*\
  !*** ./src/scripts/home/components/menuitem.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.menuItems = undefined;\n\nvar _MenuItem = __webpack_require__(/*! ../models/MenuItem */ \"./src/scripts/home/models/MenuItem.js\");\n\nvar _menuItem = __webpack_require__(/*! ../templates/menu-item */ \"./src/scripts/home/templates/menu-item.js\");\n\nvar _menuItemSection = __webpack_require__(/*! ../templates/menu-item-section */ \"./src/scripts/home/templates/menu-item-section.js\");\n\nvar _common = __webpack_require__(/*! ../../common/common */ \"./src/scripts/common/common.js\");\n\nvar _category = __webpack_require__(/*! ./category */ \"./src/scripts/home/components/category.js\");\n\nvar _cart = __webpack_require__(/*! ../../cart/components/cart */ \"./src/scripts/cart/components/cart.js\");\n\nvar fetchMenuItems = function fetchMenuItems() {\n    var items = _common.Common.fetchItems('menu-items.json');\n    var tmp = [];\n    for (var i = 0; i < items.length; i++) {\n        tmp.push(new _MenuItem.MenuItem(items[i].id, items[i].name, items[i].price, items[i].description, items[i].imgsrc, items[i].splcategoryid, items[i].categoryid, items[i].tags));\n    }\n    return tmp;\n};\n\nvar populateData = function populateData() {\n    _common.selector.menuitemcontainer().insertAdjacentHTML('beforeend', menuItemSectionDom());\n};\n\nvar populateFullMenuData = function populateFullMenuData() {\n    _common.selector.fullmenudiv().insertAdjacentHTML('beforeend', fullMenuItemSectionDom());\n};\n\nvar populateSearchData = function populateSearchData(item) {\n    _common.selector.searchresultsectionmenuitems().insertAdjacentHTML('beforeend', (0, _menuItem.menuItemTemplate)(item));\n};\n\nvar menuItemSectionDom = function menuItemSectionDom() {\n    var c = _category.category.fetchCategories();\n    var cat_menuitem_map = new Map();\n    var menuitems = fetchMenuItems();\n    c.forEach(function (cat) {\n        var item_arr = menuitems.filter(function (item) {\n            return item.splcategoryid.includes(cat.id);\n        });\n        cat_menuitem_map.set(cat, item_arr);\n    });\n    var final = '';\n    cat_menuitem_map.forEach(function (value, key) {\n        final += (0, _menuItemSection.menuItemSectionTemplate)(key, value);\n    });\n    return final;\n};\n\nvar fullMenuItemSectionDom = function fullMenuItemSectionDom() {\n    var c = _category.category.fetchCategories2();\n    var cat_menuitem_map = new Map();\n    var menuitems = fetchMenuItems();\n    c.forEach(function (cat) {\n        var item_arr = menuitems.filter(function (item) {\n            return item.categoryid.includes(cat.id);\n        });\n        cat_menuitem_map.set(cat, item_arr);\n    });\n    var final = '';\n    cat_menuitem_map.forEach(function (value, key) {\n        final += (0, _menuItemSection.menuItemSectionTemplate)(key, value);\n    });\n    return final;\n};\n\nvar selectSize = function selectSize(e) {\n    if (e.target.className === 'halfSize') {\n        var h = e.target.parentElement.parentElement.parentElement.querySelector('div span.price-half');\n        h.style['display'] = 'inline-block';\n        var f = e.target.parentElement.parentElement.parentElement.querySelector('div span.price-full');\n        f.style['display'] = 'none';\n    } else if (e.target.className === 'fullSize') {\n        var _h = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('div span.price-half');\n        _h.style['display'] = 'none';\n        var _f = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('div span.price-full');\n        _f.style['display'] = 'inline-block';\n    }\n};\n\nvar reduceQty = function reduceQty(e) {\n    e.preventDefault();\n    var input = e.target.parentElement.querySelector('input.item-qty');\n    if (parseInt(input.value) > 0) input.value = parseInt(input.value) - 1;\n};\n\nvar increaseQty = function increaseQty(e) {\n    e.preventDefault();\n    var input = e.target.parentElement.querySelector('input.item-qty');\n    if (parseInt(input.value) < 5) input.value = parseInt(input.value) + 1;\n};\n\nvar getSelectedItem = function getSelectedItem(e) {\n    e.preventDefault();\n    var ele = e.target.parentElement.parentElement.querySelector('input[type=\"radio\"]:checked');\n    var size = 'f';\n    if (ele !== null) {\n        size = ele.value;\n    }\n    if (size === null) {\n        size = 'f';\n    }\n    var qty = e.target.parentElement.parentElement.querySelector('input.item-qty').value;\n    if (qty == '0') {\n        qty = '1';\n    }\n    var id = e.target.parentElement.parentElement.parentElement.id;\n    if (id != undefined && id.length > 0) {\n        _cart.Cart.addToCart(size, qty, id);\n        animateCart();\n    }\n};\n\nvar animateCart = function animateCart() {\n    var l = document.querySelector('.cart-link');\n    l.classList.remove('cart-link');\n    setTimeout(function () {\n        var animate = function animate(l) {\n            l.className = 'cart-link';\n        };\n        animate(l);\n    }, 50);\n};\n\n//added for accessibility\nvar showAddToCart = function showAddToCart(e) {\n\n    e.target.parentElement.nextElementSibling.style['transform'] = 'scaleY(1)';\n};\n\n//added for accessibility\n/*/\r\nconst hideAddToCart = (e) => {\r\n    e.target.parentElement.nextElementSibling.style['transform'] = 'scaleY(0)';\r\n};\r\n/*/\n\nvar menuItems = exports.menuItems = {\n    populateData: populateData,\n    menuItemSectionDom: menuItemSectionDom,\n    populateSearchData: populateSearchData,\n    populateFullMenuData: populateFullMenuData,\n    fullMenuItemSectionDom: fullMenuItemSectionDom,\n    selectSize: selectSize,\n    reduceQty: reduceQty,\n    increaseQty: increaseQty,\n    getSelectedItem: getSelectedItem,\n    showAddToCart: showAddToCart\n};\n\n//# sourceURL=webpack:///./src/scripts/home/components/menuitem.js?");

/***/ }),

/***/ "./src/scripts/home/components/search.js":
/*!***********************************************!*\
  !*** ./src/scripts/home/components/search.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.search = undefined;\n\nvar _common = __webpack_require__(/*! ../../common/common */ \"./src/scripts/common/common.js\");\n\nvar _searchResult = __webpack_require__(/*! ../templates/search-result */ \"./src/scripts/home/templates/search-result.js\");\n\nvar _MenuItem = __webpack_require__(/*! ../models/MenuItem */ \"./src/scripts/home/models/MenuItem.js\");\n\nvar _menuitem = __webpack_require__(/*! ./menuitem.js */ \"./src/scripts/home/components/menuitem.js\");\n\nvar $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n\nvar populateSearchDropDown = function populateSearchDropDown(menuitem) {\n    _common.selector.searchresults().insertAdjacentHTML('beforeend', (0, _searchResult.searchResultTemplate)(menuitem));\n};\n\nvar searchForInput = function searchForInput() {\n    _common.selector.searchresults().style['display'] = 'block';\n    _common.selector.searchresults().innerHTML = '';\n    _common.selector.searchbar().removeEventListener('keyup', searchForInput);\n    setTimeout(function () {\n        _common.selector.searchbar().addEventListener('keyup', searchForInput);\n        searchKeys(populateSearchDropDown);\n    }, 400);\n};\n\nvar searchAndGetAll = function searchAndGetAll() {\n    clearSearch();\n    _common.selector.searchresultsection().style['display'] = 'block';\n    _common.selector.searchresultsectionmenuitems().innerHTML = '';\n    searchKeys(_menuitem.menuItems.populateSearchData, NoResultFound);\n    window.scrollBy(0, 1);\n};\n\nvar NoResultFound = function NoResultFound() {\n    _common.selector.searchresultsectionmenuitems().innerHTML = '<span style=\"margin-left:5%\">No Result Found.<span>';\n};\n\nvar searchKeys = function searchKeys(fn) {\n    // let flag = false;\n    if (_common.selector.searchbar().value.length > 0) {\n        index.forEach(function (value, key) {\n            var reg1 = new RegExp('(.*)' + _common.selector.searchbar().value.toLowerCase() + '(.*)');\n            var reg2 = new RegExp('(.*)' + key.toLowerCase() + '(.*)');\n            if (reg1.test(key.toLowerCase()) || reg2.test(_common.selector.searchbar().value.toLowerCase())) {\n                value.forEach(function (menuitem) {\n                    fn(menuitem);\n                    //      flag = true;\n                });\n            }\n        });\n    }\n};\n\nvar index = new Map();\nvar generateMenuIndex = function generateMenuIndex() {\n    index = new Map();\n    $.ajax({\n        url: '/static/menu-items.json',\n        datatype: 'json',\n        async: true,\n        success: function success(items) {\n            items = Object.values(items);\n\n            var _loop = function _loop(i) {\n                var m = new _MenuItem.MenuItem(items[i].id, items[i].name, items[i].price, items[i].description, items[i].imgsrc, items[i].categoryid, items[i].tags);\n                var tags = items[i].tags.split(',');\n                tags.forEach(function (tag) {\n                    tag = tag.trim().toLowerCase();\n                    if (index.has(tag)) {\n                        index.get(tag).push(m);\n                    } else if (!index.has(tag)) {\n                        var arr = [];\n                        arr.push(m);\n                        index.set(tag.toLowerCase(), arr);\n                    }\n                });\n            };\n\n            for (var i = 0; i < items.length; i++) {\n                _loop(i);\n            }\n        }\n    });\n};\n\nvar clearSearch = function clearSearch() {\n    _common.selector.searchresults().style['display'] = 'none';\n    _common.selector.searchresults().innerHTML = '';\n    _common.selector.searchresultsection().style['display'] = 'none';\n};\n\nvar search = exports.search = {\n    searchForInput: searchForInput,\n    generateMenuIndex: generateMenuIndex,\n    searchAndGetAll: searchAndGetAll,\n    clearSearch: clearSearch\n};\n\n//# sourceURL=webpack:///./src/scripts/home/components/search.js?");

/***/ }),

/***/ "./src/scripts/home/index.js":
/*!***********************************!*\
  !*** ./src/scripts/home/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.home = undefined;\n\nvar _HomeController = __webpack_require__(/*! ./HomeController */ \"./src/scripts/home/HomeController.js\");\n\nvar home = exports.home = new _HomeController.HomeController();\n\n//# sourceURL=webpack:///./src/scripts/home/index.js?");

/***/ }),

/***/ "./src/scripts/home/models/Category.js":
/*!*********************************************!*\
  !*** ./src/scripts/home/models/Category.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Category = exports.Category = function Category(id, name, imgsrc) {\n    _classCallCheck(this, Category);\n\n    this.id = id;\n    this.name = name;\n    this.imgsrc = imgsrc;\n};\n\n//# sourceURL=webpack:///./src/scripts/home/models/Category.js?");

/***/ }),

/***/ "./src/scripts/home/models/MenuItem.js":
/*!*********************************************!*\
  !*** ./src/scripts/home/models/MenuItem.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar MenuItem = exports.MenuItem = function MenuItem(id, name, price, description, imgsrc, splcategoryid, categoryid, tags) {\n    _classCallCheck(this, MenuItem);\n\n    this.id = id;\n    this.name = name;\n    this.price = price;\n    this.description = description;\n    this.imgsrc = imgsrc;\n    this.splcategoryid = splcategoryid;\n    this.categoryid = categoryid;\n    this.tags = tags;\n};\n\n//# sourceURL=webpack:///./src/scripts/home/models/MenuItem.js?");

/***/ }),

/***/ "./src/scripts/home/templates/category.js":
/*!************************************************!*\
  !*** ./src/scripts/home/templates/category.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar categoryTemplate = exports.categoryTemplate = function categoryTemplate(cat) {\n  return \"<li id=\\\"cat-\" + escape(cat.name) + \"\\\"><a href='#\" + escape(cat.name) + \"-placeholder'><img class='category-logo' src='\" + cat.imgsrc + \"' alt='\" + cat.name + \"' width='50px'><span>\" + cat.name + \"</span></a></li>\";\n};\n\n//# sourceURL=webpack:///./src/scripts/home/templates/category.js?");

/***/ }),

/***/ "./src/scripts/home/templates/menu-item-section.js":
/*!*********************************************************!*\
  !*** ./src/scripts/home/templates/menu-item-section.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.menuItemSectionTemplate = undefined;\n\nvar _menuItem = __webpack_require__(/*! ../templates/menu-item */ \"./src/scripts/home/templates/menu-item.js\");\n\nvar menuItemSectionTemplate = exports.menuItemSectionTemplate = function menuItemSectionTemplate(cat, menuitems) {\n    return '<section id=\\'' + escape(cat.name) + '\\' class=\\'category\\' vocab=\\'http://schema.org/\\' typeof=\\'MenuSection\\'>\\n                        <div id=\\'' + escape(cat.name) + '-placeholder\\' class=\\'category-placeholder\\'></div>\\n                        <h2 property=\\'name\\'>\\n                            ' + cat.name + '\\n                        </h2>\\n                        <section class=\\'menu-items\\' property=\\'hasMenuItem\\'>\\n                          ' + transformMenuItems(menuitems, cat.name) + '\\n                        </section>\\n                        <hr>\\n                    </section>';\n};\n\nvar transformMenuItems = function transformMenuItems(menuitems, catname) {\n\n    var final = '';\n    menuitems.forEach(function (item) {\n        return final += (0, _menuItem.menuItemTemplate)(item, catname);\n    });\n    return final;\n};\n\n//# sourceURL=webpack:///./src/scripts/home/templates/menu-item-section.js?");

/***/ }),

/***/ "./src/scripts/home/templates/menu-item.js":
/*!*************************************************!*\
  !*** ./src/scripts/home/templates/menu-item.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar menuItemTemplate = exports.menuItemTemplate = function menuItemTemplate(item) {\n    return '<div class=\\'menu-item\\' id=\\'' + item.id + '\\' vocab=\\'http://schema.org/\\' typeof=\\'MenuItem\\'>\\n                                <div><img src=\\'' + loaderbase64 + '\\' img-loaded=\\'false\\' alt=\\'' + item.name + '\\' lazy-img-src=\\'' + item.imgsrc + '\\'/>\\n                                </div>\\n                                <h3 property=\\'name\\'>' + item.name + '</h3>\\n                                <div class=\\'item-description\\'>\\n                                    <hr/>\\n                                    \\n                                        <h4><span property=\\'description\\' class=\\'description\\'>' + item.description + '</span></h4>\\n                                    \\n                                    <div class=\\'add-btn-dummy-container\\'>\\n                                        <button>Add</button>\\n                                    </div>\\n                                    <div class=\\'add-to-cart-container\\'>\\n                                        <div>\\n                                             <span class=\\'label\\'>PRICE</span>\\n                                                <span class=\\'price price-half\\'>\\u20B9' + item.price.h + '</span>\\n                                                <span class=\\'price price-full\\'>\\u20B9' + item.price.f + '</span>\\n                                             \\n                                        </div>\\n                                        <div>\\n                                           \\n                                                <span class=\\'label\\'>SIZE: </span>\\n                                                <span class=\\'label\\'>\\n                                                    ' + getItemAvailableSizes(item) + '\\n                                                </span>\\n                                           \\n                                        </div>\\n                                        <div>\\n                                             \\n                                                <span class=\\'label\\'>QTY: </span>\\n                                                <span>\\n                                                    <a class=\\'reduce-qty\\' href=\\'#\\'>-</a>\\n                                                    <input type=\\'text\\' class=\\'item-qty\\' value=0 readonly>\\n                                                    <a class=\\'increase-qty\\' href=\\'#\\'>+</a>\\n                                                </span>\\n                                             \\n                                        </div>\\n                                        <button class=\\'add-to-cart-btn\\'>Add to cart</button>\\n                                    </div>\\n                                </div>\\n                            </div>';\n};\n\nvar getItemAvailableSizes = function getItemAvailableSizes(item) {\n    var final = '';\n    if (item.price.h !== undefined) {\n        final += 'H<input type=\\'radio\\' name=\\'size\\' value=\\'h\\' class=\\'halfSize\\'>';\n    }\n    if (item.price.f !== undefined) {\n        final += 'F<input type=\\'radio\\' name=\\'size\\' value=\\'f\\' class=\\'fullSize\\' checked=\\'checked\\'>';\n    }\n    return final;\n};\n\nvar loaderbase64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiNiZWJlYmUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2NCA2NCkiLz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjOTc5Nzk3IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iIzZlNmU2ZSIgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiMzYzNjM2MiIHRyYW5zZm9ybT0icm90YXRlKDMxNSA2NCA2NCkiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDY0IDY0OzQ1IDY0IDY0OzkwIDY0IDY0OzEzNSA2NCA2NDsxODAgNjQgNjQ7MjI1IDY0IDY0OzI3MCA2NCA2NDszMTUgNjQgNjQiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSI3MjBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PGc+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iNjMuNjYiIGN5PSI2My4xNiIgcj0iMTIiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBkdXI9IjcyMG1zIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBrZXlUaW1lcz0iMDswLjU7MSIgdmFsdWVzPSIxOzA7MSIvPjwvZz48L3N2Zz4=';\n\n//# sourceURL=webpack:///./src/scripts/home/templates/menu-item.js?");

/***/ }),

/***/ "./src/scripts/home/templates/search-result.js":
/*!*****************************************************!*\
  !*** ./src/scripts/home/templates/search-result.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar searchResultTemplate = exports.searchResultTemplate = function searchResultTemplate(s) {\n    return \"<div class='search-result'><a href='#\" + s.id + \"'>\" + s.name + \"</a></div>\";\n};\n\n//# sourceURL=webpack:///./src/scripts/home/templates/search-result.js?");

/***/ }),

/***/ "./src/scripts/routes/routes.js":
/*!**************************************!*\
  !*** ./src/scripts/routes/routes.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Route = exports.Route = function () {\n    function Route() {\n        _classCallCheck(this, Route);\n    }\n\n    _createClass(Route, null, [{\n        key: 'getPage',\n        value: function getPage() {\n            var arr = window.location.pathname.trim().split('/');\n            if (arr[1].length > 0) {\n                return arr[1].split('.')[0];\n            } else {\n                return 'home';\n            }\n        }\n    }]);\n\n    return Route;\n}();\n\n//# sourceURL=webpack:///./src/scripts/routes/routes.js?");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/main.scss?");

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi babel-polyfill ./src/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"./node_modules/babel-polyfill/lib/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./src/index.js?");

/***/ })

/******/ });