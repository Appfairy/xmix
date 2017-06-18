module.exports =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mixin).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function mixin() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  mixins.forEach(function (mixin) {
    if (typeof mixin != 'function' || mixin.__mixin__ !== true) {
      throw TypeError('Only mixins must be provided');
    }
  });

  var result = function result(Root) {
    if (typeof Root != 'function') {
      throw TypeError('A class must be provided');
    }

    return mixins.reduce(function (Class, mixin) {
      return mixin(Class);
    }, Root);
  };

  result.class = result(function () {});

  return result;
}

mixin.new = function newMixin(factory) {
  var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
    return x;
  };

  if (typeof factory != 'function') {
    throw TypeError('A factory function must be provided');
  }

  if (typeof transform != 'function') {
    throw TypeError('Transformation must be a function');
  }

  var mixin = function mixin(Parent) {
    if (typeof Parent != 'function') {
      throw TypeError('A class must be provided');
    }

    var Child = factory(Parent);
    transform(Child, Parent);
    Child.__mixin__ = mixin;

    if (typeof Child != 'function') {
      throw TypeError('Factory must return a class');
    }

    return Child;
  };

  mixin.__mixin__ = true;
  mixin.class = mixin(function () {});

  return mixin;
};

mixin.of = function ofMixin(instance, mixin) {
  if (!(instance instanceof Object)) {
    throw TypeError('An instance must be provided');
  }

  if (typeof mixin != 'function' || mixin.__mixin__ !== true) {
    throw TypeError('A mixin must be provided');
  }

  for (var candi = instance.constructor; candi.prototype.__proto__ != null; candi = candi.prototype.__proto__.constructor) {
    if (candi.__mixin__ === mixin) {
      return true;
    }
  }

  return false;
};

exports.default = mixin;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);