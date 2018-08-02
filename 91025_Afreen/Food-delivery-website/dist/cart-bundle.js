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
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cart.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./js/cart_script */ \"./src/js/cart_script.js\");\n\n//# sourceURL=webpack:///./src/cart.js?");

/***/ }),

/***/ "./src/js/cart_script.js":
/*!*******************************!*\
  !*** ./src/js/cart_script.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar config = {\n  apiKey: \"AIzaSyDMRUCaQJSRKjoIQHD1-gAhxcaI2GpdIBM\",\n  authDomain: \"spice-house-20180.firebaseapp.com\",\n  databaseURL: \"https://spice-house-20180.firebaseio.com\",\n  projectId: \"spice-house-20180\",\n  storageBucket: \"spice-house-20180.appspot.com\",\n  messagingSenderId: \"1641703789\"\n}; // Initialize your Firebase app\n\nfirebase.initializeApp(config); // Reference to your entire Firebase database\n\nvar dbRef = firebase.database();\nvar myFirebase = dbRef.ref();\nvar myCartFirebase = dbRef.ref(\"cartItems\");\nHandlebars.registerHelper('if-equals', function (listItem, type, options) {\n  if (listItem.navtype.includes(type)) {\n    return options.fn(this);\n  }\n});\n$(document).ready(function () {\n  $.ajax(\"./src/views/header.html\").done(function (headerPartialDetails) {\n    $(\".container\").append(headerPartialDetails);\n    Handlebars.registerPartial(\"HeaderPartial\", $(\"#header-partial-template\").html());\n    Handlebars.registerPartial(\"FooterPartial\", $(\"#footer-partial-template\").html());\n  }); //Header\n\n  var templateHeader = Handlebars.compile(document.getElementById(\"header-render-template\").innerHTML); //footer\n\n  var templateFooter = Handlebars.compile(document.getElementById(\"footer-render-template\").innerHTML);\n  myFirebase.once(\"value\").then(function (snapshot) {\n    $(\".header\").html(templateHeader(snapshot.val()));\n    $(\".footer\").html(templateFooter(snapshot.val()));\n  }); //Build Cart\n\n  var srcCart = document.getElementById(\"cart-entry-template\").innerHTML;\n  var templateCart = Handlebars.compile(srcCart);\n  myCartFirebase.once(\"value\").then(function (childSnapshot) {\n    //Bind Cart\n    var htmlCart = templateCart(childSnapshot.val());\n    $('.cart__items').html(htmlCart);\n  }).then(function () {\n    // console.log('hello');\n    recalculateCart();\n    updateSumItems();\n  });\n  /* Bind Actions */\n  // Update quantity   \n\n  $(\".cart__items\").on(\"change\", \".cart__item__quantity input\", function (e) {\n    updateQuantity(this);\n  }); // Remove item\n\n  $(\".cart__items\").on(\"click\", \".remove button\", function (e) {\n    //console.log(\"remove button clicked\");\n    removeItem(this);\n  }); //Promotion code applied\n\n  $(\".cart-module\").on(\"click\", \".promo-code-cta\", function (e) {\n    var promoCode = $(\"#promo-code\").val();\n    validatePromo(promoCode);\n  });\n  $(\".summary\").on(\"click\", \"#btnCheckout\", function (e) {\n    event.preventDefault();\n    window.location.href = '/confirmation.html';\n    return false;\n  });\n  $(\".summary\").on(\"click\", \"#btnCheckout1\", function (e) {\n    event.preventDefault();\n    window.location.href = '/confirmation.html';\n    return false;\n  }); //});\n}); // end of document\n\nvar validationMessages = {\n  invalidCoupon: 'The promotion code %promocode% is invalid. Please enter valid promotion code!!!',\n  emptyCoupon: 'Please enter valid promotion code!!',\n  minimumOrder: 'Order must be more than $100 for Promo code to apply.'\n};\n\nfunction validatePromo(promoCode) {\n  if (promoCode == '') {\n    $(\".validationMessage\").text(validationMessages.emptyCoupon).css('color', 'red');\n  } else {\n    var value;\n    var offers = dbRef.ref(\"offers\"); //console.log(offers);\n\n    offers.on(\"value\").then(function (childSnapshot) {\n      childSnapshot.val().forEach(function (data) {\n        if (data.code.toUpperCase() == promoCode.toUpperCase()) {\n          //console.log(data.code + ' ' + data.cdvalue);\n          value = data.cdvalue;\n          return;\n        }\n      });\n    }).then(function () {\n      if (value == undefined || value == '' || value == null) {\n        $(\".validationMessage\").text(validationMessages.invalidCoupon.replace('%promocode%', promoCode.toUpperCase())).css('color', 'red');\n      } else {\n        $(\".validationMessage\").text('');\n        var subtotal = $('.subtotal_amount').text();\n\n        if (subtotal < 100) {\n          $(\".validationMessage\").text(validationMessages.minimumOrder).css('color', 'red');\n        } else {\n          $(\".validationMessage\").text('');\n          recalculateCart(true, value);\n        }\n      }\n\n      console.log(\"cdValue: \" + value);\n    });\n  }\n}\n\nfunction updateSumItems() {\n  var sumItems = 0; //console.log('inside upadte sum items')\n\n  $('.cart__item__quantity input').each(function () {\n    //console.log($(this).val());\n    sumItems += parseInt($(this).val());\n  });\n  $('.total-items').text(sumItems);\n  $('.header__cart__logo #cart__count').html(sumItems);\n  $('.navigation__item #cart__count_mobile').html(sumItems);\n}\n\nvar fadeTime = 300;\n\nfunction updateQuantity(quantityInput) {\n  /* Calculate line price */\n  var productRow = $(quantityInput).parent().parent();\n  var price = parseFloat(productRow.children('.cart__item__description').children().children('.price').text());\n  var tax = parseFloat(productRow.children('.cart__item__description').children().children('.tax').text());\n  var quantity = $(quantityInput).val(); // console.log('price: '+ price);\n  // console.log('tax: '+ tax);\n\n  var linePrice = calculateItemTotal(price * quantity, tax);\n  /* Update line price display and recalc cart totals */\n\n  productRow.children('.total-price').each(function () {\n    $(this).fadeOut(fadeTime, function () {\n      $(this).text(linePrice);\n      recalculateCart();\n      $(this).fadeIn(fadeTime);\n    });\n  });\n  updateSumItems();\n}\n\nfunction calculateItemTotal(price, tax) {\n  var taxAmt = price * tax / 100;\n  var grossPrice = parseFloat(price) + parseFloat(taxAmt); //console.log (taxAmt + '  '+ grossPrice);\n\n  return grossPrice.toFixed(2);\n}\n\n;\n\nfunction recalculateCart(onlyTotal, promoValue) {\n  var subtotal = 0; // Sum up row totals\n\n  $('.cart__item').each(function () {\n    subtotal += parseFloat($(this).children('.total-price').text());\n  }); //Calculate totals\n\n  var total = subtotal;\n  /*If switch for update only total, update only total display*/\n\n  if (onlyTotal) {\n    var promocode = $(\"#promo-code\").val(); //If promotion code is applied\n\n    total = calculatePromo(subtotal, promoValue);\n    /* Update total display */\n\n    $('.final_amount').fadeOut(fadeTime, function () {\n      $(\".code\").html(promocode);\n      $('.final_amount').html(total.toFixed(2));\n      $('.final_amount').fadeIn(fadeTime);\n    });\n  } else {\n    //Clear promo code \n    $(\".code\").text(\"none\");\n    $(\".promo_amount\").text(\"0\");\n    /* Update summary display. */\n\n    $('.final_amount').fadeOut(fadeTime, function () {\n      $('.subtotal_amount').html(subtotal.toFixed(2));\n      $('.final_amount').html(total.toFixed(2));\n\n      if (total == 0 || total == undefined || total == NaN) {\n        $('.cart_btn').fadeOut(fadeTime);\n      } else {\n        $('.cart_btn').fadeIn(fadeTime);\n      }\n\n      $('.final_amount').fadeIn(fadeTime);\n    });\n  }\n}\n/* Remove item from cart */\n\n\nfunction removeItem(removeButton) {\n  /* Remove row from DOM and recalc cart total */\n  var productRow = $(removeButton).parent().parent();\n  productRow.slideUp(fadeTime, function () {\n    productRow.remove();\n    recalculateCart();\n    updateSumItems();\n  });\n}\n\nfunction calculatePromo(subTotal, value) {\n  // console.log(value);\n  var discountedAmount = 0; // if discount is percantage else number\n\n  if (value.indexOf('%') > -1) {\n    //console.log(value);\n    discountedAmount = parseInt(value) / 100 * subTotal; //discountedAmount = discountedAmount.toFixed(2);\n  } else {\n    discountedAmount = parseInt(value).toFixed(2);\n  }\n\n  var amount = subTotal - discountedAmount;\n  $(\".promo_amount\").text(discountedAmount);\n  return amount;\n}\n\n//# sourceURL=webpack:///./src/js/cart_script.js?");

/***/ })

/******/ });