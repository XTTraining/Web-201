/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modifyCartItems = exports.MODIFY_CART_ITEMS = exports.pushMenuItems = exports.PUSH_MENU_ITEMS = exports.fetchRestaurantData = exports.FETCH_RESTAURANT_DATA = undefined;

var _request = __webpack_require__(25);

var _config = __webpack_require__(27);

var _config2 = _interopRequireDefault(_config);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FETCH_RESTAURANT_DATA = exports.FETCH_RESTAURANT_DATA = 'FETCH_RESTAURANT_DATA';

var fetchRestaurantData = exports.fetchRestaurantData = function fetchRestaurantData() {
    return function (dispatch) {
        var res = (0, _request.getApiResponse)(_config2.default.restaurantDataUrl);
        res.then(function (outdata) {
            var data = outdata.data;
            dispatch({
                type: "FETCH_RESTAURANT_DATA",
                payload: data
            });
        });
    };
};

var PUSH_MENU_ITEMS = exports.PUSH_MENU_ITEMS = 'PUSH_MENU_ITEMS';

var pushMenuItems = exports.pushMenuItems = function pushMenuItems(menuItems) {
    return function (dispatch) {
        dispatch({
            type: "PUSH_MENU_ITEMS",
            payload: menuItems
        });
    };
};

var MODIFY_CART_ITEMS = exports.MODIFY_CART_ITEMS = 'MODIFY_CART_ITEMS';

var modifyCartItems = exports.modifyCartItems = function modifyCartItems(menuItem, operation) {
    return function (dispatch) {
        dispatch({
            type: "MODIFY_CART_ITEMS",
            payload: {
                item: menuItem,
                operation: operation
            }
        });
    };
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _templateObject = _taggedTemplateLiteral(['\n@import url(\'https://fonts.googleapis.com/css?family=Lato:100,300,400\');\n\n*{\n    margin:0;\n    padding:0;\n}\n\nhtml, body{\n    padding: 0;\n    margin:0;\n    box-sizing:border-box;\n    font-family: \'Lato\', \'Arial\', \'sans-serrif\';\n    font-size: 16px;\n    text-rendering: optimizeLegibility;\n    letter-spacing:1px;\n    font-weight: 300;\n}\n'], ['\n@import url(\'https://fonts.googleapis.com/css?family=Lato:100,300,400\');\n\n*{\n    margin:0;\n    padding:0;\n}\n\nhtml, body{\n    padding: 0;\n    margin:0;\n    box-sizing:border-box;\n    font-family: \'Lato\', \'Arial\', \'sans-serrif\';\n    font-size: 16px;\n    text-rendering: optimizeLegibility;\n    letter-spacing:1px;\n    font-weight: 300;\n}\n']);

var _styledComponents = __webpack_require__(1);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _styledComponents.injectGlobal)(_templateObject);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _headerData = __webpack_require__(18);

var _headerStyle = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this.getMenuItems = function () {
            var menuItems = [];
            var items = _this.props.navigation;
            for (var i = 0; i < items.length; i++) {
                menuItems.push(_react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(
                        'a',
                        { href: items[i].link.href },
                        items[i].title
                    )
                ));
            };
            return menuItems;
        };

        _this.showMenu = function () {
            _this.setState({ ishamburger: false });
        };

        _this.hideMenu = function () {
            _this.setState({ ishamburger: true });
        };

        _this.state = {
            ishamburger: true
        };
        return _this;
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                _headerStyle.HeaderStyle,
                null,
                _react2.default.createElement(
                    _headerStyle.NavFlexContainer,
                    { Row: true },
                    _react2.default.createElement(
                        'a',
                        { href: '/', alt: '' },
                        _react2.default.createElement(_headerStyle.LogoImage, { src: this.props.headerLogoImage, alt: 'khaana-peena' })
                    ),
                    _react2.default.createElement(
                        _headerStyle.MenuUnorderedList,
                        { actionHamburger: this.state.ishamburger },
                        this.getMenuItems()
                    ),
                    _react2.default.createElement(
                        _headerStyle.HamBurgerWrapper,
                        { onClick: this.showMenu, actionHamburger: this.state.ishamburger },
                        _react2.default.createElement(_headerStyle.HamBurger, null),
                        _react2.default.createElement(_headerStyle.HamBurger, null),
                        _react2.default.createElement(_headerStyle.HamBurger, null)
                    ),
                    _react2.default.createElement(
                        _headerStyle.CloseIcon,
                        { onClick: this.hideMenu, actionHamburger: this.state.ishamburger },
                        'X'
                    )
                )
            );
        }
    }]);

    return Header;
}(_react2.default.Component);

Header.defaultProps = {
    headerTitle: _headerData.HeaderData.title,
    navigation: _headerData.HeaderData.navigationItems,
    headerLogoImage: _headerData.HeaderData.logoImage
};

exports.default = Header;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NonVegeterian = exports.Vegeterian = exports.Row = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    margin: 0 auto;\n    max-width: 1145px;\n'], ['\n    margin: 0 auto;\n    max-width: 1145px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    border: 2px solid #00ff00;\n    >div{\n        margin: 2px auto;\n        width: 10px;\n        height: 10px;\n        border-radius: 50%;\n        background-color: #00ff00;\n    }\n'], ['\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    border: 2px solid #00ff00;\n    >div{\n        margin: 2px auto;\n        width: 10px;\n        height: 10px;\n        border-radius: 50%;\n        background-color: #00ff00;\n    }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    border: 2px solid #ff0000;\n    >div{\n        margin: 2px auto;\n        width: 10px;\n        height: 10px;\n        border-radius: 50%;\n        background-color: #ff0000;\n    }\n'], ['\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    border: 2px solid #ff0000;\n    >div{\n        margin: 2px auto;\n        width: 10px;\n        height: 10px;\n        border-radius: 50%;\n        background-color: #ff0000;\n    }\n']);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Row = exports.Row = _styledComponents2.default.div(_templateObject);

var Vegeterian = exports.Vegeterian = _styledComponents2.default.div(_templateObject2);

var NonVegeterian = exports.NonVegeterian = _styledComponents2.default.div(_templateObject3);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _actions = __webpack_require__(3);

var _reactRouterDom = __webpack_require__(4);

var _minicartStyle = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MiniCart = function (_React$Component) {
    _inherits(MiniCart, _React$Component);

    function MiniCart(props) {
        _classCallCheck(this, MiniCart);

        var _this = _possibleConstructorReturn(this, (MiniCart.__proto__ || Object.getPrototypeOf(MiniCart)).call(this, props));

        _this.getCartItems = function (menuItems) {
            var cartItems = [];

            var _loop = function _loop(i) {
                cartItems.push(_react2.default.createElement(
                    _minicartStyle.MiniCartItem,
                    { key: i },
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            menuItems[i].name
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'ul',
                                null,
                                _react2.default.createElement(
                                    'li',
                                    { onClick: function onClick() {
                                            return _this.props.modifyCartItems(menuItems[i], 'add');
                                        } },
                                    '\u2295'
                                ),
                                menuItems[i].quantity && menuItems[i].quantity.numericValue && _react2.default.createElement(
                                    'li',
                                    null,
                                    menuItems[i].quantity.numericValue
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { onClick: function onClick() {
                                            return _this.props.modifyCartItems(menuItems[i], 'remove');
                                        } },
                                    '\u2296'
                                )
                            )
                        ),
                        menuItems[i].price && menuItems[i].price.amount && _react2.default.createElement(
                            'li',
                            null,
                            parseInt(menuItems[i].price.amount) * menuItems[i].quantity.numericValue
                        )
                    )
                ));
            };

            for (var i = 0; i < menuItems.length; i++) {
                _loop(i);
            }
            return cartItems;
        };

        _this.getSum = function (total, num) {
            return total + num;
        };

        _this.getTaxes = function (allItems) {
            var gst = allItems.map(function (current) {
                if (current.price && current.price.amount && current.gst) {
                    return parseInt(current.price.amount) * parseInt(current.gst) / 100;
                }
            });
            var totalTax = gst.length > 0 ? Math.floor(gst.reduce(_this.getSum)) : 0;
            return totalTax;
        };

        _this.getSubTotal = function (allItems) {
            if (allItems.length > 0) {
                var itemPrice = allItems.map(function (current) {
                    if (current.price && current.price.amount) {
                        var gst = current.price.amount * current.gst / 100;
                        return parseInt(current.price.amount) * current.quantity.numericValue;
                    }
                });
                var totalSum = itemPrice.length > 0 ? itemPrice.reduce(_this.getSum) : 0;
                return totalSum + _this.getTaxes(allItems);
            }
        };

        return _this;
    }

    _createClass(MiniCart, [{
        key: 'render',
        value: function render() {
            var selectedItems = this.props.selectedMenuItems;
            return _react2.default.createElement(
                _minicartStyle.MiniCartSection,
                null,
                _react2.default.createElement(
                    _minicartStyle.MiniCartHeading,
                    null,
                    'Cart'
                ),
                selectedItems && selectedItems.length > 0 && this.getSubTotal(selectedItems) > 0 && _react2.default.createElement(
                    _minicartStyle.MiniCartInformation,
                    null,
                    this.getCartItems(selectedItems),
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'Taxes'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            this.getTaxes(selectedItems)
                        )
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'Subtotal'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            this.getSubTotal(selectedItems)
                        )
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/order' },
                        _react2.default.createElement(
                            _minicartStyle.CheckoutButton,
                            null,
                            'Checkout'
                        )
                    )
                )
            );
        }
    }]);

    return MiniCart;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state) {
    return {
        selectedMenuItems: state.selectedItems
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { modifyCartItems: _actions.modifyCartItems })(MiniCart);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _footerData = __webpack_require__(30);

var _commonStyles = __webpack_require__(7);

var _footerStyle = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
    _inherits(Footer, _React$Component);

    function Footer(props) {
        _classCallCheck(this, Footer);

        var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

        _this.getSocialIcons = function (icons) {
            var socialLinks = [];
            for (var i = 0; i < icons.length; i++) {
                var socialLink = icons[i];
                socialLinks.push(_react2.default.createElement(
                    'li',
                    { key: i },
                    _react2.default.createElement(
                        'a',
                        { href: socialLink.link.href, alt: '' },
                        _react2.default.createElement(
                            'figure',
                            null,
                            _react2.default.createElement('img', { src: socialLink.image.src, alt: socialLink.image.alt })
                        )
                    )
                ));
            }
            return socialLinks;
        };

        return _this;
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _footerStyle.FooterSection,
                null,
                _react2.default.createElement(
                    _commonStyles.Row,
                    null,
                    _react2.default.createElement(
                        _footerStyle.FooterLinks,
                        null,
                        this.props.footerImage && _react2.default.createElement(
                            'a',
                            { href: this.props.footerLink },
                            _react2.default.createElement(
                                'figure',
                                null,
                                _react2.default.createElement('img', { src: this.props.footerImage, alt: this.props.footerImageAlt })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _footerStyle.FooterSocialLinks,
                        null,
                        this.props.socialLinks && this.props.socialLinks.length > 0 && _react2.default.createElement(
                            _footerStyle.SocialLinks,
                            null,
                            this.getSocialIcons(this.props.socialLinks)
                        )
                    ),
                    this.props.copyRightText && _react2.default.createElement(
                        _footerStyle.CopyRightText,
                        null,
                        this.props.copyRightText
                    )
                )
            );
        }
    }]);

    return Footer;
}(_react2.default.Component);

;

Footer.defaultProps = {
    footerImage: _footerData.FooterData.footerLeftSection.img.src,
    footerImageAlt: _footerData.FooterData.footerLeftSection.img.alt,
    footerLink: _footerData.FooterData.footerLeftSection.link.href,
    footerAlt: _footerData.FooterData.footerLeftSection.link.alt,
    copyRightText: _footerData.FooterData.footerLeftSection.copyRightText,
    socialLinks: _footerData.FooterData.footerSocialLinks
};

exports.default = Footer;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _renderer = __webpack_require__(14);

var _renderer2 = _interopRequireDefault(_renderer);

var _reducers = __webpack_require__(36);

var _reducers2 = _interopRequireDefault(_reducers);

var _redux = __webpack_require__(11);

var _reduxThunk = __webpack_require__(39);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.static('public'));

app.get('*', function (req, res) {
    var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default));

    res.send((0, _renderer2.default)(req, store));
});

app.listen(3000, function () {
    console.log('listening on port 3000 :)');
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(15);

var _reactRouterDom = __webpack_require__(4);

var _Routes = __webpack_require__(16);

var _Routes2 = _interopRequireDefault(_Routes);

var _reactRedux = __webpack_require__(2);

var _styledComponents = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, store) {
    var sheet = new _styledComponents.ServerStyleSheet();

    var content = (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _reactRouterDom.StaticRouter,
            { location: req.path, context: {} },
            _react2.default.createElement(
                _styledComponents.StyleSheetManager,
                { sheet: sheet.instance },
                _react2.default.createElement(_Routes2.default, null)
            )
        )
    ));
    return '<html><head>\n                <title>Khana Peena</title>\n                <meta name="viewport" content="width=device-width, initial-scale=1">\n                <meta name="description" content="Free Web tutorials">\n                <meta name="keywords" content="HTML,CSS,XML,JavaScript">\n            </head>\n                <body>\n                    <div id="root">' + content + '</div>\n                    <script src="bundle.js" type="text/javascript">\n                    </script>\n                </body>\n            </html>';
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _home = __webpack_require__(17);

var _home2 = _interopRequireDefault(_home);

var _order = __webpack_require__(32);

var _order2 = _interopRequireDefault(_order);

var _cartPage = __webpack_require__(35);

var _cartPage2 = _interopRequireDefault(_cartPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _home2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/order', component: _order2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/cart', component: _cartPage2.default })
    );
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(5);

var _header = __webpack_require__(6);

var _header2 = _interopRequireDefault(_header);

var _carousel = __webpack_require__(20);

var _carousel2 = _interopRequireDefault(_carousel);

var _restaurantGallery = __webpack_require__(23);

var _restaurantGallery2 = _interopRequireDefault(_restaurantGallery);

var _footer = __webpack_require__(10);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home(props) {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_header2.default, null),
                _react2.default.createElement(_carousel2.default, null),
                _react2.default.createElement(_restaurantGallery2.default, null),
                _react2.default.createElement(_footer2.default, null)
            );
        }
    }]);

    return Home;
}(_react2.default.Component);

;

exports.default = Home;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var HeaderData = exports.HeaderData = {
    title: "header",
    logoImage: "/assets/img/logo.png",
    navigationItems: [{
        title: "Home",
        link: {
            title: "",
            href: "/"
        },
        image: {
            src: "",
            alt: ""
        },
        child: []
    }, {
        title: "Products",
        link: {
            title: "",
            href: ""
        },
        image: {
            src: "",
            alt: ""
        },
        child: [{
            title: "cat1",
            link: "",
            image: "",
            child: []
        }, {
            title: "cat2",
            link: "",
            image: "",
            child: []
        }]
    }, {
        title: "Cart",
        link: {
            title: "",
            href: ""
        },
        image: {
            src: "",
            alt: ""
        },
        child: []
    }, {
        title: "SignUp",
        link: {
            title: "",
            href: ""
        },
        image: {
            src: "",
            alt: ""
        },
        child: []
    }]
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MenuUnorderedList = exports.NavFlexContainer = exports.LogoImage = exports.HamBurger = exports.HamBurgerWrapper = exports.CloseIcon = exports.HeaderStyle = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    background-color: #ff7400;\n'], ['\n    background-color: #ff7400;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    color: #fff;\n    font-weight: 1000;\n    font-size: 185%;\n    display: block;\n    margin: 20px 20px auto 0;\n    cursor: pointer;\n    display: ', ';\n'], ['\n    color: #fff;\n    font-weight: 1000;\n    font-size: 185%;\n    display: block;\n    margin: 20px 20px auto 0;\n    cursor: pointer;\n    display: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    display: none;\n    margin: auto 20px auto 0;\n    vertical-align: middle;\n    @media(max-width: 480px){\n        display: ', ';\n    }\n'], ['\n    display: none;\n    margin: auto 20px auto 0;\n    vertical-align: middle;\n    @media(max-width: 480px){\n        display: ', ';\n    }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    width: 35px;\n    height: 5px;\n    background-color: #fff;\n    margin: 6px 0;\n'], ['\n    width: 35px;\n    height: 5px;\n    background-color: #fff;\n    margin: 6px 0;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n    height:70px;\n    margin:5px 0;\n'], ['\n    height:70px;\n    margin:5px 0;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n    display: flex;\n    margin: 0 auto;\n    max-width: 1145px;\n    justify-content: space-between;\n'], ['\n    display: flex;\n    margin: 0 auto;\n    max-width: 1145px;\n    justify-content: space-between;\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n    margin-top:30px;\n    >li{\n        list-style: none;\n        display: inline;\n        margin-left:20px;\n    }\n    >li>a{\n        color: #fff;\n        text-decoration: none;\n        text-transform: uppercase;\n    }\n    @media (max-width: 768px){\n        margin-right: 20px;\n    }\n    @media (max-width: 480px){\n        z-index: 10;\n        width: 100%;\n        margin-top: 100px;\n        text-align: center;\n        display: ', ';\n    >li{\n        display: block;\n        margin-bottom: 10px;\n        font-size: 80%;\n    }\n    >li:before{\n        content: \'\';\n        height: 2px;\n        display: block;\n        background-color: #fff;\n        margin: 10px 0;\n    }\n    }\n    '], ['\n    margin-top:30px;\n    >li{\n        list-style: none;\n        display: inline;\n        margin-left:20px;\n    }\n    >li>a{\n        color: #fff;\n        text-decoration: none;\n        text-transform: uppercase;\n    }\n    @media (max-width: 768px){\n        margin-right: 20px;\n    }\n    @media (max-width: 480px){\n        z-index: 10;\n        width: 100%;\n        margin-top: 100px;\n        text-align: center;\n        display: ', ';\n    >li{\n        display: block;\n        margin-bottom: 10px;\n        font-size: 80%;\n    }\n    >li:before{\n        content: \'\';\n        height: 2px;\n        display: block;\n        background-color: #fff;\n        margin: 10px 0;\n    }\n    }\n    ']);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var HeaderStyle = exports.HeaderStyle = _styledComponents2.default.header(_templateObject);

var CloseIcon = exports.CloseIcon = _styledComponents2.default.p(_templateObject2, function (props) {
    if (props.actionHamburger === true) {
        return 'none';
    } else {
        return 'block';
    }
});

var HamBurgerWrapper = exports.HamBurgerWrapper = _styledComponents2.default.div(_templateObject3, function (props) {
    if (props.actionHamburger === true) {
        return 'block';
    } else {
        return 'none';
    }
});

var HamBurger = exports.HamBurger = _styledComponents2.default.div(_templateObject4);

var LogoImage = exports.LogoImage = _styledComponents2.default.img(_templateObject5);

var NavFlexContainer = exports.NavFlexContainer = _styledComponents2.default.nav(_templateObject6);

var MenuUnorderedList = exports.MenuUnorderedList = _styledComponents2.default.ul(_templateObject7, function (props) {
    if (props.actionHamburger === true) {
        return 'none';
    } else {
        return 'block';
    }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _carouselData = __webpack_require__(21);

var _carouselStyle = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_React$Component) {
    _inherits(Carousel, _React$Component);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this.rotateCarousel = function (direction) {
            var position = _this.state.position;
            var totalItems = _this.props.totalItems;

            if (direction === 'next') {
                _this.slider(direction, position === totalItems - 1 ? 0 : position + 1);
            } else {
                _this.slider(direction, position === 0 ? totalItems - 1 : position - 1);
            }
        };

        _this.getCarouselItemPosition = function (itemIndex) {
            var position = _this.state.position;
            var totalItems = _this.props.totalItems;

            if (itemIndex - position < 0) {
                return totalItems - Math.abs(itemIndex - position);
            }
            return itemIndex - position;
        };

        _this.slider = function (direction, position) {
            _this.setState({
                sliding: true,
                direction: direction,
                position: position
            });
            setTimeout(function () {
                _this.setState({
                    sliding: false
                });
            }, 50);
        };

        _this.autoRotate = function (direction) {
            setInterval(function () {
                _this.rotateCarousel(direction);
            }, 3000);
        };

        _this.getCarousel = function () {
            var carouselHtml = [];
            var carouselInfo = _carouselData.CarouselData;
            for (var i = 0; i < _this.props.totalItems; i++) {
                carouselHtml.push(_react2.default.createElement(
                    _carouselStyle.CarouselImage,
                    { order: _this.getCarouselItemPosition(i), key: i },
                    _react2.default.createElement(
                        'p',
                        null,
                        carouselInfo[i].description
                    ),
                    _react2.default.createElement('img', { src: carouselInfo[i].image.src, alt: carouselInfo[i].image.alt })
                ));
            };
            return carouselHtml;
        };

        _this.getCarouselIndicators = function () {
            var indicators = [];
            for (var i = 0; i < _this.props.totalItems; i++) {
                indicators.push(_react2.default.createElement(_carouselStyle.Indicator, { key: i, isCurrent: i === _this.state.position }));
            };
            return indicators;
        };

        _this.state = {
            position: 0
        };
        return _this;
    }

    _createClass(Carousel, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _carouselStyle.ParentCarouselSection,
                null,
                _react2.default.createElement(
                    _carouselStyle.CarouselSection,
                    { sliding: true },
                    this.getCarousel()
                ),
                _react2.default.createElement(
                    _carouselStyle.ControlWrapper,
                    null,
                    _react2.default.createElement(_carouselStyle.NavigationButton, { previous: true, onClick: function onClick() {
                            return _this2.rotateCarousel('previous');
                        } }),
                    _react2.default.createElement(_carouselStyle.NavigationButton, { next: true, onClick: function onClick() {
                            return _this2.rotateCarousel('next');
                        } })
                ),
                _react2.default.createElement(
                    _carouselStyle.CarouselIndicatorWrapper,
                    null,
                    _react2.default.createElement(
                        _carouselStyle.CarouselIndicator,
                        null,
                        this.getCarouselIndicators()
                    )
                )
            );
        }
    }]);

    return Carousel;
}(_react2.default.Component);

;

Carousel.defaultProps = {
    totalItems: _carouselData.CarouselData.length
};

exports.default = Carousel;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var CarouselData = exports.CarouselData = [{
    title: "",
    description: "Enjoy 10% Discount With SS10",
    image: {
        title: "",
        alt: "daal",
        src: "/assets/img/slide1.jpg"
    },
    link: {
        href: "",
        label: "",
        alt: ""
    }
}, {
    title: "",
    description: "Enjoy 5% Discount With YO5",
    image: {
        title: "",
        alt: "pizza",
        src: "/assets/img/slide2.jpg"
    },
    link: {
        href: "",
        label: "",
        alt: ""
    }
}, {
    title: "",
    description: "Enjoy 15% Discount With BURGER15",
    image: {
        title: "",
        alt: "pizza",
        src: "/assets/img/slide3.jpg"
    },
    link: {
        href: "",
        label: "",
        alt: ""
    }
}];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Indicator = exports.CarouselIndicator = exports.CarouselIndicatorWrapper = exports.NavigationButton = exports.ControlWrapper = exports.CarouselSection = exports.CarouselImage = exports.ParentCarouselSection = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    position: relative;\n    height:400px;\n    margin-bottom: 10px;\n    @media(max-width: 480px){\n        height: 225px;\n    }\n'], ['\n    position: relative;\n    height:400px;\n    margin-bottom: 10px;\n    @media(max-width: 480px){\n        height: 225px;\n    }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    position: relative;\n    margin-top: -5%;\n    height: 100%;\n    width:100%;\n    flex-shrink:0;\n    order: ', ';\n    >img{\n        height: 100%;\n        width: 100%;\n    }\n    >p{\n        position: relative;\n        width: 25%;\n        height: 20%;\n        top: 40%;\n        left: 10%;\n        text-transform: uppercase;\n        font-size: 140%;\n        color: #60b246;\n        border: 1px solid #60b246;\n        text-align: center;\n        z-index:999;\n    }\n    \n    @media(max-width:768px){\n        margin-top:0;\n        >p{\n            display: none;\n        }\n        \n    }\n'], ['\n    position: relative;\n    margin-top: -5%;\n    height: 100%;\n    width:100%;\n    flex-shrink:0;\n    order: ', ';\n    >img{\n        height: 100%;\n        width: 100%;\n    }\n    >p{\n        position: relative;\n        width: 25%;\n        height: 20%;\n        top: 40%;\n        left: 10%;\n        text-transform: uppercase;\n        font-size: 140%;\n        color: #60b246;\n        border: 1px solid #60b246;\n        text-align: center;\n        z-index:999;\n    }\n    \n    @media(max-width:768px){\n        margin-top:0;\n        >p{\n            display: none;\n        }\n        \n    }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    position:absolute;\n    display:flex;\n    overflow-x: hidden;\n    transition: ', ';\n    transform:', ';\n'], ['\n    position:absolute;\n    display:flex;\n    overflow-x: hidden;\n    transition: ', ';\n    transform:', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    margin: 0 auto;\n    position:absolute;\n    top:40%;\n    display:flex;\n    justify-content:space-between;\n    width: 100%;\n'], ['\n    margin: 0 auto;\n    position:absolute;\n    top:40%;\n    display:flex;\n    justify-content:space-between;\n    width: 100%;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n    height:30px;\n    width: 30px;\n    border-style: solid;\n    border-width: 5px 5px 0 0;\n    border-color: #fff;\n    ', ';\n    ', ';\n'], ['\n    height:30px;\n    width: 30px;\n    border-style: solid;\n    border-width: 5px 5px 0 0;\n    border-color: #fff;\n    ', ';\n    ', ';\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n        transform:rotate(225deg);\n        margin-left:30px;\n        '], ['\n        transform:rotate(225deg);\n        margin-left:30px;\n        ']),
    _templateObject7 = _taggedTemplateLiteral(['\n        transform:rotate(45deg);\n        margin-right: 30px;\n        '], ['\n        transform:rotate(45deg);\n        margin-right: 30px;\n        ']),
    _templateObject8 = _taggedTemplateLiteral(['\n        width: 10%;\n        margin: 0 auto;\n        transform: translateY(350px);\n        @media(max-width: 480px){\n            transform: translateY(190px);\n            width: 15%;\n        }\n'], ['\n        width: 10%;\n        margin: 0 auto;\n        transform: translateY(350px);\n        @media(max-width: 480px){\n            transform: translateY(190px);\n            width: 15%;\n        }\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n        display: flex;\n        justify-content: space-between;\n'], ['\n        display: flex;\n        justify-content: space-between;\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n    background-color: ', ';\n    list-style:none;\n    height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    border: 2px solid #fff;\n    z-index: 1;\n    cursor: pointer;\n'], ['\n    background-color: ', ';\n    list-style:none;\n    height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    border: 2px solid #fff;\n    z-index: 1;\n    cursor: pointer;\n']);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ParentCarouselSection = exports.ParentCarouselSection = _styledComponents2.default.section(_templateObject);

var CarouselImage = exports.CarouselImage = _styledComponents2.default.div(_templateObject2, function (props) {
    return props.order;
});

var CarouselSection = exports.CarouselSection = _styledComponents2.default.div(_templateObject3, function (props) {
    props.sliding ? 'none' : 'transform 1s ease';
}, function (props) {
    if (!props.sliding) {
        return 'translateX(-100%)';
    }
    if (props.direction === 'previous') {
        return 'translateX(200%)';
    };
    return 'translateX(0%)';
});

var ControlWrapper = exports.ControlWrapper = _styledComponents2.default.div(_templateObject4);

var NavigationButton = exports.NavigationButton = _styledComponents2.default.div(_templateObject5, function (props) {
    return props.previous && (0, _styledComponents.css)(_templateObject6);
}, function (props) {
    return props.next && (0, _styledComponents.css)(_templateObject7);
});

var CarouselIndicatorWrapper = exports.CarouselIndicatorWrapper = _styledComponents2.default.div(_templateObject8);

var CarouselIndicator = exports.CarouselIndicator = _styledComponents2.default.ul(_templateObject9);

var Indicator = exports.Indicator = _styledComponents2.default.li(_templateObject10, function (props) {
    return props.isCurrent ? '#ff7400' : 'gainsboro';
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(24);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(2);

var _actions = __webpack_require__(3);

var _miniCart = __webpack_require__(9);

var _miniCart2 = _interopRequireDefault(_miniCart);

var _commonStyles = __webpack_require__(7);

var _restaurantGalleryStyles = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RestaurantGallery = function (_React$Component) {
    _inherits(RestaurantGallery, _React$Component);

    function RestaurantGallery(props) {
        _classCallCheck(this, RestaurantGallery);

        var _this = _possibleConstructorReturn(this, (RestaurantGallery.__proto__ || Object.getPrototypeOf(RestaurantGallery)).call(this, props));

        _this.toggle = function (index, total, visibility) {
            if (visibility === 'show') {
                _this.setState({
                    isOpen: true,
                    accordianTriggered: index + 1
                });
            } else {
                _this.setState({
                    isOpen: false,
                    accordianTriggered: index + 1
                });
            }
            var referredDiv = 'menu-' + index;
            var menuItemsDom = _reactDom2.default.findDOMNode(_this.refs[referredDiv]);
            if (menuItemsDom !== undefined) {
                menuItemsDom.style.display = menuItemsDom.style.display === 'block' ? 'none' : 'block';
            }
            for (var i = 0; i < total; i++) {
                if (i !== index) {
                    var currentDiv = 'menu-' + i;
                    var menuItems = _reactDom2.default.findDOMNode(_this.refs[currentDiv]);
                    menuItems.style.display = menuItemsDom.style.display === 'block' ? 'none' : 'block';
                }
            }
        };

        _this.distinctCuisines = function (menuitem) {
            var menuItems = menuitem.map(function (currentval) {
                return currentval.cuisine;
            });
            menuItems = menuItems.filter(function (curr, item) {
                return menuItems.indexOf(curr) === item && curr != undefined && curr != "";
            });
            return menuItems.join();
        };

        _this.getMenuItems = function (item, restaurantId) {
            var menu = item;
            menu.restaurantId = restaurantId;
            return menu;
        };

        _this.createFoodItems = function (menuItems, restaurantid) {
            var menuItemsHtml = [];
            var imagePath = '/assets/img/';

            var _loop = function _loop(i) {
                menuItemsHtml.push(_react2.default.createElement(
                    _restaurantGalleryStyles.ItemDetails,
                    { key: i },
                    _react2.default.createElement(
                        _restaurantGalleryStyles.ItemImageBlock,
                        null,
                        _react2.default.createElement(
                            'figure',
                            null,
                            _react2.default.createElement('img', { src: '' + imagePath + menuItems[i].image + '.jpg', alt: menuItems[i].image })
                        )
                    ),
                    _react2.default.createElement(
                        _restaurantGalleryStyles.ItemDescription,
                        null,
                        menuItems[i].subcategory && menuItems[i].subcategory === 'non-veg' ? _react2.default.createElement(
                            _commonStyles.NonVegeterian,
                            null,
                            _react2.default.createElement('div', null)
                        ) : _react2.default.createElement(
                            _commonStyles.Vegeterian,
                            null,
                            _react2.default.createElement('div', null)
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            menuItems[i].name
                        )
                    ),
                    _react2.default.createElement(
                        _restaurantGalleryStyles.ItemAddBtn,
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            menuItems[i].price.currency + ' ' + menuItems[i].price.amount
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: function onClick() {
                                    return _this.props.pushMenuItems(_this.getMenuItems(menuItems[i], restaurantid));
                                } },
                            'Add'
                        )
                    )
                ));
            };

            for (var i = 0; i < menuItems.length; i++) {
                _loop(i);
            }
            return menuItemsHtml;
        };

        _this.createGalleryItems = function (restaurants) {
            var gallery = [];

            var _loop2 = function _loop2(i) {
                var menuItem = restaurants[i].menu;
                gallery.push(_react2.default.createElement(
                    _restaurantGalleryStyles.FoodItemWrapper,
                    { key: i },
                    _react2.default.createElement(
                        _restaurantGalleryStyles.RestaurantItem,
                        { key: i },
                        _react2.default.createElement(
                            'h2',
                            null,
                            restaurants[i].name
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            _this.distinctCuisines(menuItem)
                        ),
                        _react2.default.createElement(
                            _restaurantGalleryStyles.ExpandSpan,
                            { iconVisibility: _this.state.isOpen, onClick: function onClick() {
                                    return _this.toggle(i, restaurants.length, 'show');
                                } },
                            '+'
                        ),
                        _react2.default.createElement(
                            _restaurantGalleryStyles.CollapseSpan,
                            { onClick: function onClick() {
                                    return _this.toggle(i, 'hide');
                                } },
                            'X'
                        )
                    ),
                    _react2.default.createElement(
                        _restaurantGalleryStyles.ItemWrapper,
                        { ref: 'menu-' + i, accordianState: _this.state.isOpen },
                        _this.createFoodItems(menuItem, restaurants[i]._id)
                    )
                ));
            };

            for (var i = 0; i < restaurants.length; i++) {
                _loop2(i);
            }
            return gallery;
        };

        _this.state = {
            isOpen: false,
            accordianTriggered: 0
        };
        return _this;
    }

    _createClass(RestaurantGallery, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.props.fetchRestaurantData();
        }
    }, {
        key: 'render',
        value: function render() {
            var restaurants = this.props.restaurant;
            return _react2.default.createElement(
                _restaurantGalleryStyles.SectionGallery,
                null,
                _react2.default.createElement(
                    _restaurantGalleryStyles.ItemDetailsWrapper,
                    { accordianState: this.state.isOpen, accordianToShow: this.state.accordianTriggered },
                    this.createGalleryItems(restaurants),
                    _react2.default.createElement(
                        _restaurantGalleryStyles.ViewCart,
                        { cartButtonDisplay: this.props.menuSelected.length },
                        _react2.default.createElement(
                            'a',
                            { href: '/cart' },
                            'View Cart'
                        )
                    )
                ),
                _react2.default.createElement(
                    _restaurantGalleryStyles.CartWrapper,
                    null,
                    _react2.default.createElement(_miniCart2.default, null)
                )
            );
        }
    }]);

    return RestaurantGallery;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state) {
    return {
        restaurant: state.restaurants,
        menuSelected: state.selectedItems
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchRestaurantData: _actions.fetchRestaurantData, pushMenuItems: _actions.pushMenuItems })(RestaurantGallery);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getApiResponse = undefined;

__webpack_require__(8);

__webpack_require__(26);

var getApiResponse = exports.getApiResponse = function getApiResponse(apiUrl) {
    var outPut = {
        status: 400,
        data: ""
    };
    {
        return fetch(apiUrl).then(function (response) {
            status = response.status;
            return response.json();
        }).then(function (data) {
            if (status === 200) {
                outPut.status = status;
                outPut.data = data;
                return outPut;
            } else {
                outPut.status = status;
                outPut.data = data;
                return outPut;
            }
        });
    }
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    restaurantDataUrl: 'http://localhost:5000/getrestaurantdata'
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckoutButton = exports.MiniCartInformation = exports.MiniCartItem = exports.MiniCartHeading = exports.MiniCartSection = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    width: 80%;\n    margin: 0 auto;\n    @media(max-width: 480px){\n        margin-top: 20px;\n    };\n'], ['\n    width: 80%;\n    margin: 0 auto;\n    @media(max-width: 480px){\n        margin-top: 20px;\n    };\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    background-color: gainsboro;\n    color: #fff;\n    text-align: center;\n    border-radius: 3px;\n    font-size: 200%;\n    letter-spacing: 3px;\n    font-weight: 300;\n    @media(max-width: 768px){\n        font-size: 125%;\n        display: none;\n    };\n    @media(max-width:480px){\n        display: none;\n    }\n'], ['\n    background-color: gainsboro;\n    color: #fff;\n    text-align: center;\n    border-radius: 3px;\n    font-size: 200%;\n    letter-spacing: 3px;\n    font-weight: 300;\n    @media(max-width: 768px){\n        font-size: 125%;\n        display: none;\n    };\n    @media(max-width:480px){\n        display: none;\n    }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    font-size: 90%;\n    margin: 10px 0;\n    >ul{\n        display: flex;\n        justify-content: space-around;\n    }\n    >ul>li{\n        list-style: none;\n    }\n    >ul>li:first-child{\n        width: 40%;\n        margin-top: 5px;\n    }\n    >ul>li:nth-child(2){\n        width: 35%;\n    }\n    >ul>li:last-child{\n        width: 25%;\n        text-align: right;\n        margin-top: 5px;\n    }\n    >ul>li>ul{\n        display: flex;\n        justify-content: space-around;\n    }\n    >ul>li>ul>li{\n        list-style:none\n        cursor: pointer;\n        margin-left: 5px;\n        font-size: 150%;\n        \n    }\n    >ul>li>ul>li:first-child, >ul>li>ul>li:last-child{\n        color: #000;\n        font-weight: 200;\n        margin-top: 4px;\n    }\n    >ul>li>ul>li:nth-child(2){\n        border: 3px solid gainsboro;\n        vertical align: center;\n        font-size: 95%;\n        font-weight: 500;\n        margin-top:5px;\n        width: 50%;\n        text-align: center;\n    }\n'], ['\n    font-size: 90%;\n    margin: 10px 0;\n    >ul{\n        display: flex;\n        justify-content: space-around;\n    }\n    >ul>li{\n        list-style: none;\n    }\n    >ul>li:first-child{\n        width: 40%;\n        margin-top: 5px;\n    }\n    >ul>li:nth-child(2){\n        width: 35%;\n    }\n    >ul>li:last-child{\n        width: 25%;\n        text-align: right;\n        margin-top: 5px;\n    }\n    >ul>li>ul{\n        display: flex;\n        justify-content: space-around;\n    }\n    >ul>li>ul>li{\n        list-style:none\n        cursor: pointer;\n        margin-left: 5px;\n        font-size: 150%;\n        \n    }\n    >ul>li>ul>li:first-child, >ul>li>ul>li:last-child{\n        color: #000;\n        font-weight: 200;\n        margin-top: 4px;\n    }\n    >ul>li>ul>li:nth-child(2){\n        border: 3px solid gainsboro;\n        vertical align: center;\n        font-size: 95%;\n        font-weight: 500;\n        margin-top:5px;\n        width: 50%;\n        text-align: center;\n    }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    margin-top: 5px;\n    >ul{\n        display: flex;\n        justify-content: space-between;\n    }\n    >ul>li{\n        list-style: none;\n    }\n    >ul>li:first-child{\n        font-weight: 300;\n    }\n'], ['\n    margin-top: 5px;\n    >ul{\n        display: flex;\n        justify-content: space-between;\n    }\n    >ul>li{\n        list-style: none;\n    }\n    >ul>li:first-child{\n        font-weight: 300;\n    }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n    width: 100%;\n    text-transform: uppercase;\n    background-color: #60b246;\n    color: #fff;\n    height: 50px;\n    margin-top: 20px;\n    cursor: pointer;\n'], ['\n    width: 100%;\n    text-transform: uppercase;\n    background-color: #60b246;\n    color: #fff;\n    height: 50px;\n    margin-top: 20px;\n    cursor: pointer;\n']);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MiniCartSection = exports.MiniCartSection = _styledComponents2.default.section(_templateObject);

var MiniCartHeading = exports.MiniCartHeading = _styledComponents2.default.h2(_templateObject2);

var MiniCartItem = exports.MiniCartItem = _styledComponents2.default.div(_templateObject3);

var MiniCartInformation = exports.MiniCartInformation = _styledComponents2.default.div(_templateObject4);

var CheckoutButton = exports.CheckoutButton = _styledComponents2.default.button(_templateObject5);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CollapseSpan = exports.ExpandSpan = exports.ViewCart = exports.FoodItemWrapper = exports.ItemAddBtn = exports.ItemDescription = exports.ItemImageBlock = exports.ItemDetails = exports.ItemWrapper = exports.RestaurantItem = exports.CartWrapper = exports.ItemDetailsWrapper = exports.SectionGallery = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    margin: 10px auto 10px 20px;\n    max-width: 1145px;\n'], ['\n    margin: 10px auto 10px 20px;\n    max-width: 1145px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    width: 70%;\n    display: inline-block;\n\n\n    >div:nth-child(', ') span:first-of-type{\n        display: ', ';\n    };\n\n    >div:nth-child(', ') span:last-of-type{\n        display: ', ';\n    };\n    \n    @media(max-width:480px){\n        width: 95%;\n        margin: 0 auto;\n    }\n\n    @media(max-width:768px){\n        width: 95%;\n        margin: 0 auto;\n    }\n'], ['\n    width: 70%;\n    display: inline-block;\n\n\n    >div:nth-child(', ') span:first-of-type{\n        display: ', ';\n    };\n\n    >div:nth-child(', ') span:last-of-type{\n        display: ', ';\n    };\n    \n    @media(max-width:480px){\n        width: 95%;\n        margin: 0 auto;\n    }\n\n    @media(max-width:768px){\n        width: 95%;\n        margin: 0 auto;\n    }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    width: 30%;\n    display: inline-block;\n    vertical-align: top;\n    @media(max-width:480px){\n        display: none;\n    }\n    @media(max-width:768px){\n        display: none;\n    }\n'], ['\n    width: 30%;\n    display: inline-block;\n    vertical-align: top;\n    @media(max-width:480px){\n        display: none;\n    }\n    @media(max-width:768px){\n        display: none;\n    }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    display: flex;\n    margin-bottom: 10px;\n    background-color: gainsboro;\n    align-items: center;\n    color: #fff;\n    border-radius: 3px;\n    >h2{\n        margin-left: 5px;\n        width: 30%;\n        letter-spacing: 3px;\n        font-weight: 300;\n        font-size: 200%;\n    }\n    >p{\n        width: 70%;\n        margin-right: 15px;\n        letter-spacing: 2px;\n        text-transform: uppercase;\n    }\n    @media (max-width : 768px){\n        >h2{\n            font-size: 125%;\n        }\n        >p{\n            display: none;\n        }\n    }\n'], ['\n    display: flex;\n    margin-bottom: 10px;\n    background-color: gainsboro;\n    align-items: center;\n    color: #fff;\n    border-radius: 3px;\n    >h2{\n        margin-left: 5px;\n        width: 30%;\n        letter-spacing: 3px;\n        font-weight: 300;\n        font-size: 200%;\n    }\n    >p{\n        width: 70%;\n        margin-right: 15px;\n        letter-spacing: 2px;\n        text-transform: uppercase;\n    }\n    @media (max-width : 768px){\n        >h2{\n            font-size: 125%;\n        }\n        >p{\n            display: none;\n        }\n    }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n    width: 100%;\n    display: none;\n'], ['\n    width: 100%;\n    display: none;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n    display: inline-block;\n    margin-bottom: 40px;\n    border-radius: 3px;\n    width: 45%;\n    height: 300px;\n    margin-left: 10px;\n    :hover{\n        border: 2px solid gainsboro;\n    }\n    @media(max-width:480px){\n        width: 90%;\n    }\n    @media(max-width:768px){\n        height: 250px;\n    }\n'], ['\n    display: inline-block;\n    margin-bottom: 40px;\n    border-radius: 3px;\n    width: 45%;\n    height: 300px;\n    margin-left: 10px;\n    :hover{\n        border: 2px solid gainsboro;\n    }\n    @media(max-width:480px){\n        width: 90%;\n    }\n    @media(max-width:768px){\n        height: 250px;\n    }\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n    overflow: hidden;\n    background: #000;\n    height: 65%;\n    margin: auto;\n    width: 75%;\n    margin-top: 10px;\n    >figure>img{\n        background: #000;\n        width: 100%;\n        height: 100%;\n        opacity: 0.7;\n        border: 2px transparent;\n        transform: scale(1.15);\n        transition: transform 0.5s, opacity 0.5s;\n    }\n    >figure>img:hover{\n        opacity: 1;\n        transform: scale(1.13);\n        box-shadow: 2px gainsboro;\n    }\n    @media(max-width:768px){\n        height: 160px;\n    }\n    @media(max-width: 480px){\n        width:90%;\n        height: 60%;\n    }\n'], ['\n    overflow: hidden;\n    background: #000;\n    height: 65%;\n    margin: auto;\n    width: 75%;\n    margin-top: 10px;\n    >figure>img{\n        background: #000;\n        width: 100%;\n        height: 100%;\n        opacity: 0.7;\n        border: 2px transparent;\n        transform: scale(1.15);\n        transition: transform 0.5s, opacity 0.5s;\n    }\n    >figure>img:hover{\n        opacity: 1;\n        transform: scale(1.13);\n        box-shadow: 2px gainsboro;\n    }\n    @media(max-width:768px){\n        height: 160px;\n    }\n    @media(max-width: 480px){\n        width:90%;\n        height: 60%;\n    }\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n    width: 75%;\n    display: flex;\n    margin: 10px auto 10px auto;\n    >p{\n        display: inline-block;\n        text-align: center;\n        font-size: 90%;\n        font-weight: 400;\n        margin-left: 10px;\n    }\n    @media(max-width:480px){\n        width: 90%;\n        margin: 6px auto;\n        display:flex;\n    }\n'], ['\n    width: 75%;\n    display: flex;\n    margin: 10px auto 10px auto;\n    >p{\n        display: inline-block;\n        text-align: center;\n        font-size: 90%;\n        font-weight: 400;\n        margin-left: 10px;\n    }\n    @media(max-width:480px){\n        width: 90%;\n        margin: 6px auto;\n        display:flex;\n    }\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    width: 75%;\n    margin: auto;\n    >p{\n        font-weight: 300;\n        font-size: 75%;\n    }\n    >button{\n        border: 1px solid gainsboro;\n        font-size: 95%;\n        text-transform: uppercase;\n        padding: 5px 15px;\n        background-color: #60b246;\n        color: #fff;\n        font-weight:200;\n        cursor: pointer\n    }\n    @media(max-width:480px){\n        width: 90%;\n    }\n    >button{\n        font-size: 80%;\n        align-self:center;\n    }\n'], ['\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    width: 75%;\n    margin: auto;\n    >p{\n        font-weight: 300;\n        font-size: 75%;\n    }\n    >button{\n        border: 1px solid gainsboro;\n        font-size: 95%;\n        text-transform: uppercase;\n        padding: 5px 15px;\n        background-color: #60b246;\n        color: #fff;\n        font-weight:200;\n        cursor: pointer\n    }\n    @media(max-width:480px){\n        width: 90%;\n    }\n    >button{\n        font-size: 80%;\n        align-self:center;\n    }\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n\n'], ['\n\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n    width: 90%;\n    position: fixed;\n    bottom:0;\n    background-color: #60b246;\n    height: 7%;\n    text-align: center;\n    display: none;\n    &:before{\n        content:\'\';\n        display:block;\n        vertical-align: middle;\n        height: 32%;\n    }\n    >a{\n        font-size: 90%;\n        text-decoration: none;\n        color: #fff;\n        text-transform: uppercase;\n        letter-spacing: 2px;\n        font-weight: 400;\n    }\n    @media(max-width:480px){\n        display: ', ';\n    }\n    @media(max-width:768px){\n        display: ', ';\n    }\n'], ['\n    width: 90%;\n    position: fixed;\n    bottom:0;\n    background-color: #60b246;\n    height: 7%;\n    text-align: center;\n    display: none;\n    &:before{\n        content:\'\';\n        display:block;\n        vertical-align: middle;\n        height: 32%;\n    }\n    >a{\n        font-size: 90%;\n        text-decoration: none;\n        color: #fff;\n        text-transform: uppercase;\n        letter-spacing: 2px;\n        font-weight: 400;\n    }\n    @media(max-width:480px){\n        display: ', ';\n    }\n    @media(max-width:768px){\n        display: ', ';\n    }\n']),
    _templateObject12 = _taggedTemplateLiteral(['\n    font-size: 295%;\n    display:block;\n    cursor: pointer;\n    margin: 0 0 0 auto;\n'], ['\n    font-size: 295%;\n    display:block;\n    cursor: pointer;\n    margin: 0 0 0 auto;\n']),
    _templateObject13 = _taggedTemplateLiteral(['\n    font-size: 200%;\n    display: none;\n    cursor: pointer;\n    margin: 0 2px 0 auto;\n'], ['\n    font-size: 200%;\n    display: none;\n    cursor: pointer;\n    margin: 0 2px 0 auto;\n']);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SectionGallery = exports.SectionGallery = _styledComponents2.default.section(_templateObject);

var ItemDetailsWrapper = exports.ItemDetailsWrapper = _styledComponents2.default.div(_templateObject2, function (props) {
    return props.accordianToShow;
}, function (props) {
    return props.accordianState ? 'none' : 'block';
}, function (props) {
    return props.accordianToShow;
}, function (props) {
    return props.accordianState ? 'block' : 'none';
});
var CartWrapper = exports.CartWrapper = _styledComponents2.default.div(_templateObject3);

var RestaurantItem = exports.RestaurantItem = _styledComponents2.default.div(_templateObject4);

var ItemWrapper = exports.ItemWrapper = _styledComponents2.default.div(_templateObject5);

var ItemDetails = exports.ItemDetails = _styledComponents2.default.div(_templateObject6);

var ItemImageBlock = exports.ItemImageBlock = _styledComponents2.default.div(_templateObject7);

var ItemDescription = exports.ItemDescription = _styledComponents2.default.div(_templateObject8);

var ItemAddBtn = exports.ItemAddBtn = _styledComponents2.default.div(_templateObject9);

var FoodItemWrapper = exports.FoodItemWrapper = _styledComponents2.default.div(_templateObject10);

var ViewCart = exports.ViewCart = _styledComponents2.default.div(_templateObject11, function (props) {
    if (props.cartButtonDisplay > 0) {
        return 'block';
    } else {
        return 'none';
    }
}, function (props) {
    if (props.cartButtonDisplay > 0) {
        return 'block';
    } else {
        return 'none';
    }
});

var ExpandSpan = exports.ExpandSpan = _styledComponents2.default.span(_templateObject12);

var CollapseSpan = exports.CollapseSpan = _styledComponents2.default.span(_templateObject13);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var FooterData = exports.FooterData = {
    footerLeftSection: {
        img: {
            src: '/assets/img/logo.png',
            alt: 'khana-peena'
        },
        link: {
            href: '/',
            alt: ''
        },
        copyRightText: 'Copyright &copy; 2018 by Omnifood. All rights reserved'
    },
    footerSocialLinks: [{
        image: {
            src: "/assets/img/fb.png",
            alt: "Promote us on Facebook"
        },
        link: {
            href: ""
        }
    }, {
        image: {
            src: "/assets/img/twitter.png",
            alt: "Promote us on Twitter"
        },
        link: {
            href: ""
        }
    }, {
        image: {
            src: "/assets/img/instagram.png",
            alt: "Promote us on Insta"
        },
        link: {
            href: ""
        }
    }]
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CopyRightText = exports.SocialLinks = exports.FooterSocialLinks = exports.FooterLinks = exports.FooterSection = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    background-color: #333;\n    font-size: 80%;\n    padding-bottom: 20px;\n'], ['\n    background-color: #333;\n    font-size: 80%;\n    padding-bottom: 20px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    width: 50%;\n    text-align: left;\n    display: inline-block;\n    >a>figure>img{\n        height: 50px;\n    }\n'], ['\n    width: 50%;\n    text-align: left;\n    display: inline-block;\n    >a>figure>img{\n        height: 50px;\n    }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    display: inline-block;\n    width: 50%;\n    text-align: right;\n    vertical-align: top;\n    margin-top: 10px;\n'], ['\n    display: inline-block;\n    width: 50%;\n    text-align: right;\n    vertical-align: top;\n    margin-top: 10px;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n\n    >li{\n        list-style: none;\n        display: inline-block;\n    }\n'], ['\n\n    >li{\n        list-style: none;\n        display: inline-block;\n    }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n        margin-top: 10px;\n        color: #fff;\n        margin-left: 10px;\n'], ['\n        margin-top: 10px;\n        color: #fff;\n        margin-left: 10px;\n']);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var FooterSection = exports.FooterSection = _styledComponents2.default.footer(_templateObject);

var FooterLinks = exports.FooterLinks = _styledComponents2.default.div(_templateObject2);

var FooterSocialLinks = exports.FooterSocialLinks = _styledComponents2.default.div(_templateObject3);

var SocialLinks = exports.SocialLinks = _styledComponents2.default.ul(_templateObject4);

var CopyRightText = exports.CopyRightText = _styledComponents2.default.p(_templateObject5);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(5);

var _header = __webpack_require__(6);

var _header2 = _interopRequireDefault(_header);

var _cart = __webpack_require__(33);

var _cart2 = _interopRequireDefault(_cart);

var _footer = __webpack_require__(10);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = function (_React$Component) {
    _inherits(Order, _React$Component);

    function Order(props) {
        _classCallCheck(this, Order);

        return _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this, props));
    }

    _createClass(Order, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_header2.default, null),
                _react2.default.createElement(_cart2.default, null),
                _react2.default.createElement(_footer2.default, null)
            );
        }
    }]);

    return Order;
}(_react2.default.Component);

exports.default = Order;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _commonStyles = __webpack_require__(7);

var _cartStyle = __webpack_require__(34);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cart = function (_React$Component) {
    _inherits(Cart, _React$Component);

    function Cart(props) {
        _classCallCheck(this, Cart);

        var _this = _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).call(this, props));

        _this.getSum = function (total, num) {
            return total + num;
        };

        _this.getTaxes = function (allItems) {
            var gst = allItems.map(function (current) {
                if (current.price && current.price.amount && current.gst) {
                    return parseInt(current.price.amount) * parseInt(current.gst) / 100;
                }
            });
            var totalTax = gst.length > 0 ? Math.floor(gst.reduce(_this.getSum)) : 0;
            return totalTax;
        };

        _this.getSubTotal = function (allItems) {
            if (allItems.length > 0) {
                var itemPrice = allItems.map(function (current) {
                    if (current.price && current.price.amount) {
                        return parseInt(current.price.amount) * current.quantity.numericValue;
                    }
                });
                var totalSum = itemPrice.length > 0 ? itemPrice.reduce(_this.getSum) : 0;
                totalSum = totalSum + _this.getTaxes(allItems);
                return totalSum;
            }
        };

        _this.getPrice = function (cartItem) {
            var price = cartItem.price.currency + ' ' + cartItem.price.amount * cartItem.quantity.numericValue;
            return price;
        };

        _this.createCartItems = function (cartItems) {
            var cartHtml = [];
            for (var i = 0; i < cartItems.length; i++) {
                cartHtml.push(_react2.default.createElement(
                    _cartStyle.CartItem,
                    { key: i },
                    _react2.default.createElement(
                        _cartStyle.CartItemContent,
                        null,
                        cartItems[i].subcategory && cartItems[i].subcategory === 'non-veg' ? _react2.default.createElement(
                            _commonStyles.NonVegeterian,
                            null,
                            _react2.default.createElement('div', null)
                        ) : _react2.default.createElement(
                            _commonStyles.Vegeterian,
                            null,
                            _react2.default.createElement('div', null)
                        ),
                        _react2.default.createElement(
                            _cartStyle.CartItemUnorderedList,
                            null,
                            cartItems[i].name && _react2.default.createElement(
                                'li',
                                null,
                                cartItems[i].name
                            ),
                            cartItems[i].description && _react2.default.createElement(
                                'li',
                                null,
                                cartItems[i].description
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _cartStyle.CartItemQuantity,
                        null,
                        cartItems[i].quantity && cartItems[i].quantity.numericValue && _react2.default.createElement(
                            'p',
                            null,
                            cartItems[i].quantity.numericValue
                        )
                    ),
                    _react2.default.createElement(
                        _cartStyle.CartItemPrice,
                        null,
                        cartItems[i].quantity && cartItems[i].quantity.numericValue && _react2.default.createElement(
                            'p',
                            null,
                            _this.getPrice(cartItems[i])
                        )
                    )
                ));
            }
            return cartHtml;
        };

        _this.getCouponDiscount = function (restaurants, subTotal) {
            var couponApplied = _this.refs.couponref.value;
            var matchedValue = restaurants.filter(function (elem) {
                if (elem.coupon.toUpperCase() === couponApplied.toUpperCase()) {
                    return elem;
                }
            });
            if (matchedValue.length > 0) {
                var discount = Math.floor(subTotal * parseInt(matchedValue[0].offers.discount) / 100);
                _this.setState({
                    couponDiscount: discount
                });
            }
        };

        _this.state = {
            couponDiscount: 0
        };
        return _this;
    }

    _createClass(Cart, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var selectedItems = this.props.selectedMenuItems;
            var restaurants = this.props.restaurants;
            return _react2.default.createElement(
                _cartStyle.CartSection,
                null,
                _react2.default.createElement(
                    _cartStyle.CartUnorderedList,
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        selectedItems.length + ' Items'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        'Qty'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        'Price'
                    )
                ),
                _react2.default.createElement(
                    _cartStyle.CartItems,
                    null,
                    this.createCartItems(selectedItems)
                ),
                _react2.default.createElement(
                    _cartStyle.CartCal,
                    null,
                    _react2.default.createElement(
                        _cartStyle.RowCoupon,
                        null,
                        _react2.default.createElement(
                            _cartStyle.PromoText,
                            null,
                            _react2.default.createElement(
                                'label',
                                null,
                                'Enter promotion code ',
                                _react2.default.createElement('br', null),
                                'or gift card'
                            )
                        ),
                        _react2.default.createElement(
                            _cartStyle.PromoCodeBox,
                            null,
                            _react2.default.createElement('input', { ref: 'couponref', type: 'text', name: 'name', id: 'promo-code', placeholder: '' })
                        ),
                        _react2.default.createElement(
                            _cartStyle.BtnBorder,
                            null,
                            _react2.default.createElement('input', { type: 'submit', value: 'Apply', onClick: function onClick() {
                                    return _this2.getCouponDiscount(restaurants, _this2.getSubTotal(selectedItems));
                                } })
                        )
                    ),
                    _react2.default.createElement(
                        _cartStyle.SubTotalUnorderedList,
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'Taxes'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'INR ',
                            this.getTaxes(selectedItems)
                        )
                    ),
                    _react2.default.createElement(
                        _cartStyle.SubTotalUnorderedList,
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'SubTotal'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'INR ',
                            this.getSubTotal(selectedItems)
                        )
                    ),
                    _react2.default.createElement(
                        _cartStyle.DiscountItemUnorderedList,
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'Coupon Discount'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'INR ',
                            this.state.couponDiscount
                        )
                    ),
                    _react2.default.createElement(
                        _cartStyle.DelieveryCharges,
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'Shipping Charges'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'INR 0'
                        )
                    ),
                    _react2.default.createElement(
                        _cartStyle.EstimatedTotal,
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'ESTIMATED TOTAL'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'INR ',
                            this.getSubTotal(selectedItems) - this.state.couponDiscount
                        )
                    ),
                    _react2.default.createElement(
                        _cartStyle.Checkout,
                        null,
                        _react2.default.createElement('input', { type: 'submit', value: 'CHECKOUT' })
                    )
                )
            );
        }
    }]);

    return Cart;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state) {
    return {
        selectedMenuItems: state.selectedItems,
        restaurants: state.restaurants
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(Cart);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checkout = exports.EstimatedTotal = exports.DelieveryCharges = exports.DiscountItemUnorderedList = exports.SubTotalUnorderedList = exports.CartItemPrice = exports.CartItemQuantity = exports.CartItemContent = exports.CartItems = exports.CartItemUnorderedList = exports.CartItem = exports.CartUnorderedList = exports.CartSection = exports.BtnBorder = exports.PromoCodeBox = exports.PromoText = exports.CartCal = exports.RowCoupon = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    &:after{\n        display: block;\n        height: 5px;\n        background-color: gainsboro;\n        content: "";\n        margin-top: 40px;\n    }\n'], ['\n    &:after{\n        display: block;\n        height: 5px;\n        background-color: gainsboro;\n        content: "";\n        margin-top: 40px;\n    }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    width: 70%;\n    margin-left: auto;\n    margin-top: 10px;\n    @media(max-width:480px){\n        width: 100%;\n    };\n'], ['\n    width: 70%;\n    margin-left: auto;\n    margin-top: 10px;\n    @media(max-width:480px){\n        width: 100%;\n    };\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    text-transform: uppercase;\n    text-align: right;\n    width:40%;\n    display: inline-block;\n    vertical-align: middle;\n    @media(max-width:480px){\n        width: 100%;\n        display: block;\n        margin-auto;\n        text-align: center;\n    }\n'], ['\n    text-transform: uppercase;\n    text-align: right;\n    width:40%;\n    display: inline-block;\n    vertical-align: middle;\n    @media(max-width:480px){\n        width: 100%;\n        display: block;\n        margin-auto;\n        text-align: center;\n    }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    text-align: right;\n    width:30%;\n    display: inline-block;\n    >input[type = text]{\n        width: 50%;\n        line-height: 35px;\n        border: 2px solid gainsboro;\n    }\n    @media(max-width: 480px){\n        width: 49%;\n    }\n'], ['\n    text-align: right;\n    width:30%;\n    display: inline-block;\n    >input[type = text]{\n        width: 50%;\n        line-height: 35px;\n        border: 2px solid gainsboro;\n    }\n    @media(max-width: 480px){\n        width: 49%;\n    }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n    text-align: left;\n    text-indent: 30px;\n    width:30%;\n    display: inline-block;\n    >input[type=submit]{\n        background-color: #ffffff;\n        font-weight: 700;\n        width: 50%;\n        border: 2px solid gainsboro;\n        line-height: 35px;\n        font-weight: 200;\n        font-size: 100%;\n        letter-spacing: 2px;\n    }\n    @media(max-width: 480px){\n        width: 49%;\n        margin-top:15px;\n    }\n'], ['\n    text-align: left;\n    text-indent: 30px;\n    width:30%;\n    display: inline-block;\n    >input[type=submit]{\n        background-color: #ffffff;\n        font-weight: 700;\n        width: 50%;\n        border: 2px solid gainsboro;\n        line-height: 35px;\n        font-weight: 200;\n        font-size: 100%;\n        letter-spacing: 2px;\n    }\n    @media(max-width: 480px){\n        width: 49%;\n        margin-top:15px;\n    }\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n    margin: 20px auto;\n    max-width: 1145px;\n    &:before{\n        display: block;\n        height: 1px;\n        background-color: gainsboro;\n        content: "";\n    }\n'], ['\n    margin: 20px auto;\n    max-width: 1145px;\n    &:before{\n        display: block;\n        height: 1px;\n        background-color: gainsboro;\n        content: "";\n    }\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n    margin-left: 10px;\n    &:after{\n        content:"";\n        height: 10px;\n        background-color: gainsboro;\n        display: inline-block;\n    }\n    >li{\n        list-style: none;\n        margin: 15px 0 0 0;\n        text-transform: uppercase;\n        display: inline-block;    \n    }\n    >li+li{\n        width: 15%;\n    }\n    >li:first-child{\n        width: 70%;\n        font-weight: 400;\n\n    }\n'], ['\n    margin-left: 10px;\n    &:after{\n        content:"";\n        height: 10px;\n        background-color: gainsboro;\n        display: inline-block;\n    }\n    >li{\n        list-style: none;\n        margin: 15px 0 0 0;\n        text-transform: uppercase;\n        display: inline-block;    \n    }\n    >li+li{\n        width: 15%;\n    }\n    >li:first-child{\n        width: 70%;\n        font-weight: 400;\n\n    }\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n    width: 100%;\n'], ['\n    width: 100%;\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n    margin: 10px 0 0 15px;\n\n    >li{\n        list-style: none;\n    }\n    >li:last-child{\n        font-size: 75%;\n    }\n    >li:first-child{\n        font-weight: 300;\n        letter-spacing: 2px;\n    }\n'], ['\n    margin: 10px 0 0 15px;\n\n    >li{\n        list-style: none;\n    }\n    >li:last-child{\n        font-size: 75%;\n    }\n    >li:first-child{\n        font-weight: 300;\n        letter-spacing: 2px;\n    }\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n    &:after{\n        display: block;\n        height: 2px;\n        margin-top:5px;\n        background-color: gainsboro;\n        content: "";\n    }\n    &:before{\n        display: block;\n        height: 2px;\n        margin-top:5px;\n        background-color: gainsboro;\n        content: "";\n    }\n    > div + div{\n        &:before{\n            display: block;\n            height: 1px;\n            margin-top:5px;\n            background-color: gainsboro;\n            content: "";\n        }\n    }\n'], ['\n    &:after{\n        display: block;\n        height: 2px;\n        margin-top:5px;\n        background-color: gainsboro;\n        content: "";\n    }\n    &:before{\n        display: block;\n        height: 2px;\n        margin-top:5px;\n        background-color: gainsboro;\n        content: "";\n    }\n    > div + div{\n        &:before{\n            display: block;\n            height: 1px;\n            margin-top:5px;\n            background-color: gainsboro;\n            content: "";\n        }\n    }\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n    display: inline-block;\n    width: 70%;\n    vertical-align: middle;\n    text-align: left;\n    margin-top:10px;\n    >div:first-of-type{\n        margin-left: 15px;\n    }\n'], ['\n    display: inline-block;\n    width: 70%;\n    vertical-align: middle;\n    text-align: left;\n    margin-top:10px;\n    >div:first-of-type{\n        margin-left: 15px;\n    }\n']),
    _templateObject12 = _taggedTemplateLiteral(['\n    display: inline-block;\n    width: 15%;\n    >p{\n        display: inline-block;\n        margin-left: 18px;\n    }\n'], ['\n    display: inline-block;\n    width: 15%;\n    >p{\n        display: inline-block;\n        margin-left: 18px;\n    }\n']),
    _templateObject13 = _taggedTemplateLiteral(['\n    display: inline-block;\n    width: 15%;\n    >p{\n        display: inline-block;\n    }\n'], ['\n    display: inline-block;\n    width: 15%;\n    >p{\n        display: inline-block;\n    }\n']),
    _templateObject14 = _taggedTemplateLiteral(['\n    margin-top: 20px;\n    >li{\n        list-style:none;\n        display: inline-block;\n        text-align: center;\n    }\n    >li:first-child{\n        width: 60%;\n        font-weight: 300;\n    }\n    >li:last-child{\n        width: 40%;\n        text-indent: 45px;\n    }\n'], ['\n    margin-top: 20px;\n    >li{\n        list-style:none;\n        display: inline-block;\n        text-align: center;\n    }\n    >li:first-child{\n        width: 60%;\n        font-weight: 300;\n    }\n    >li:last-child{\n        width: 40%;\n        text-indent: 45px;\n    }\n']),
    _templateObject15 = _taggedTemplateLiteral(['\n    margin-top: 20px;\n    >li{\n        list-style:none;\n        display: inline-block;\n    }\n    >li:first-child{\n        width: 60%;\n        font-weight: 300;\n        text-align: center;\n        text-indent: 15px;\n    }\n    >li:last-child{\n        width: 40%;\n        text-indent: 45px;\n        text-align: center;\n    }\n'], ['\n    margin-top: 20px;\n    >li{\n        list-style:none;\n        display: inline-block;\n    }\n    >li:first-child{\n        width: 60%;\n        font-weight: 300;\n        text-align: center;\n        text-indent: 15px;\n    }\n    >li:last-child{\n        width: 40%;\n        text-indent: 45px;\n        text-align: center;\n    }\n']),
    _templateObject16 = _taggedTemplateLiteral(['\n    margin-top: 20px;\n    &:after{\n        display: block;\n        height: 2px;\n        background-color: gainsboro;\n        content: "";\n        margin-top: 30px;\n    }\n    >li{\n        list-style:none;\n        display: inline-block;\n    }\n    >li:first-child{\n        width: 60%;\n        font-weight: 300;\n        text-align: center;\n        text-indent: 15px;\n    }\n    >li:last-child{\n        width: 40%;\n        text-indent: 45px;\n        text-align: center;\n    }\n'], ['\n    margin-top: 20px;\n    &:after{\n        display: block;\n        height: 2px;\n        background-color: gainsboro;\n        content: "";\n        margin-top: 30px;\n    }\n    >li{\n        list-style:none;\n        display: inline-block;\n    }\n    >li:first-child{\n        width: 60%;\n        font-weight: 300;\n        text-align: center;\n        text-indent: 15px;\n    }\n    >li:last-child{\n        width: 40%;\n        text-indent: 45px;\n        text-align: center;\n    }\n']),
    _templateObject17 = _taggedTemplateLiteral(['\n    margin-top: 20px;\n    &:after{\n        display: block;\n        height: 5px;\n        background-color: gainsboro;\n        content: "";\n        margin-top: 30px;\n    }\n    >li{\n        list-style:none;\n        display: inline-block;\n    }\n    >li:first-child{\n        width: 60%;\n        font-weight: 300;\n        text-align: center;\n        text-indent: 15px;\n    }\n    >li:last-child{\n        width: 40%;\n        text-indent: 45px;\n        text-align: center;\n    }\n'], ['\n    margin-top: 20px;\n    &:after{\n        display: block;\n        height: 5px;\n        background-color: gainsboro;\n        content: "";\n        margin-top: 30px;\n    }\n    >li{\n        list-style:none;\n        display: inline-block;\n    }\n    >li:first-child{\n        width: 60%;\n        font-weight: 300;\n        text-align: center;\n        text-indent: 15px;\n    }\n    >li:last-child{\n        width: 40%;\n        text-indent: 45px;\n        text-align: center;\n    }\n']),
    _templateObject18 = _taggedTemplateLiteral(['\n    margin-top: 20px;\n    width: 30%;\n    margin-left: auto;\n    >input[type=submit]{\n        background-color: #60b246;\n        font-size: 125%;\n        border: 5px solid gainsboro;\n        padding: 5px;\n        color: #fff;\n        margin-left: 20px;\n    }\n    @media(max-width: 480px){\n        width: 100%;\n        text-align:center;\n    }\n'], ['\n    margin-top: 20px;\n    width: 30%;\n    margin-left: auto;\n    >input[type=submit]{\n        background-color: #60b246;\n        font-size: 125%;\n        border: 5px solid gainsboro;\n        padding: 5px;\n        color: #fff;\n        margin-left: 20px;\n    }\n    @media(max-width: 480px){\n        width: 100%;\n        text-align:center;\n    }\n']);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var RowCoupon = exports.RowCoupon = _styledComponents2.default.div(_templateObject);

var CartCal = exports.CartCal = _styledComponents2.default.div(_templateObject2);

var PromoText = exports.PromoText = _styledComponents2.default.div(_templateObject3);

var PromoCodeBox = exports.PromoCodeBox = _styledComponents2.default.div(_templateObject4);

var BtnBorder = exports.BtnBorder = _styledComponents2.default.div(_templateObject5);

var CartSection = exports.CartSection = _styledComponents2.default.section(_templateObject6);

var CartUnorderedList = exports.CartUnorderedList = _styledComponents2.default.ul(_templateObject7);

var CartItem = exports.CartItem = _styledComponents2.default.div(_templateObject8);

var CartItemUnorderedList = exports.CartItemUnorderedList = _styledComponents2.default.ul(_templateObject9);

var CartItems = exports.CartItems = _styledComponents2.default.div(_templateObject10);

var CartItemContent = exports.CartItemContent = _styledComponents2.default.div(_templateObject11);

var CartItemQuantity = exports.CartItemQuantity = _styledComponents2.default.div(_templateObject12);

var CartItemPrice = exports.CartItemPrice = _styledComponents2.default.div(_templateObject13);

var SubTotalUnorderedList = exports.SubTotalUnorderedList = _styledComponents2.default.ul(_templateObject14);

var DiscountItemUnorderedList = exports.DiscountItemUnorderedList = _styledComponents2.default.ul(_templateObject15);

var DelieveryCharges = exports.DelieveryCharges = _styledComponents2.default.ul(_templateObject16);

var EstimatedTotal = exports.EstimatedTotal = _styledComponents2.default.ul(_templateObject17);

var Checkout = exports.Checkout = _styledComponents2.default.div(_templateObject18);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(5);

var _header = __webpack_require__(6);

var _header2 = _interopRequireDefault(_header);

var _miniCart = __webpack_require__(9);

var _miniCart2 = _interopRequireDefault(_miniCart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartPage = function (_React$Component) {
    _inherits(CartPage, _React$Component);

    function CartPage(props) {
        _classCallCheck(this, CartPage);

        return _possibleConstructorReturn(this, (CartPage.__proto__ || Object.getPrototypeOf(CartPage)).call(this, props));
    }

    _createClass(CartPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_header2.default, null),
                _react2.default.createElement(_miniCart2.default, null)
            );
        }
    }]);

    return CartPage;
}(_react2.default.Component);

;

exports.default = CartPage;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(11);

var _restaurantReducer = __webpack_require__(37);

var _restaurantReducer2 = _interopRequireDefault(_restaurantReducer);

var _menuReducer = __webpack_require__(38);

var _menuReducer2 = _interopRequireDefault(_menuReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    restaurants: _restaurantReducer2.default,
    selectedItems: _menuReducer2.default
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = __webpack_require__(3);

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _actions.FETCH_RESTAURANT_DATA:
            return action.payload;
        default:
            return state;
    }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = __webpack_require__(3);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _actions.PUSH_MENU_ITEMS:
            var allSelectedMenu = state;
            var elementIndex = allSelectedMenu.indexOf(allSelectedMenu.find(function (element) {
                return element.name == action.payload.name && element.restaurantId == action.payload.restaurantId;
            }));
            if (elementIndex !== -1) {
                return state.map(function (element, index) {
                    if (index === elementIndex) {
                        element.quantity.numericValue = element.quantity.numericValue + 1;
                    }
                    return element;
                });
            }
            return [].concat(_toConsumableArray(state), [action.payload]);
        case _actions.MODIFY_CART_ITEMS:
            var allMenu = state;
            var lastElementIndex = allMenu.indexOf(allMenu.find(function (element) {
                return element.name == action.payload.item.name && element.restaurantId == action.payload.item.restaurantId && element.quantity.numericValue && element.quantity.numericValue === 1;
            }));
            var menuIndex = allMenu.indexOf(allMenu.find(function (element) {
                return element.name == action.payload.item.name && element.restaurantId == action.payload.item.restaurantId;
            }));
            if (menuIndex !== -1) {
                if (lastElementIndex !== -1 && action.payload.operation == 'remove') {
                    return state.filter(function (element, index) {
                        return index !== lastElementIndex;
                    });
                }
                return state.map(function (element, index) {
                    if (index === menuIndex && action.payload.operation === 'add') {
                        element.quantity.numericValue = element.quantity.numericValue + 1;
                    } else if (lastElementIndex === -1 && index === menuIndex && action.payload.operation == 'remove') {
                        element.quantity.numericValue = element.quantity.numericValue - 1;
                    }
                    return element;
                });
            }

        default:
            return state;
    }
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ })
/******/ ]);