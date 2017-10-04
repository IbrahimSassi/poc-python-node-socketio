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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

var _middlewares = __webpack_require__(3);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _socket = __webpack_require__(6);

var _socket2 = _interopRequireDefault(_socket);

var _http = __webpack_require__(7);

var _http2 = _interopRequireDefault(_http);

var _path = __webpack_require__(8);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import db from './config/database';
const app = (0, _express2.default)();
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'html');

(0, _middlewares2.default)(app);

// FOR HTTPS
let server = _http2.default.createServer(app).listen(_constants2.default.PORT, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on : ${_constants2.default.PORT}`);
  }
});

const io = __webpack_require__(9).listen(3001);
(0, _socket2.default)(io);

app.get('/', (req, res) => {

  // res.sendFile("/dist/index.html", {"root": __dirname});
  res.json({ msg: "Hello World" });
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost/backendRestApi'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/backendRestApi'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/backendRestApi'
};

const defaultConfig = {
  PORT: process.env.PORT || 4000
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return defaultConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(4);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(5);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Created by Ibrahim on 16/06/2017.
 */
exports.default = io => {

  io.sockets.on('connection', socket => {
    //connection established
    console.log('Connected ....................');

    io.sockets.emit('this', { will: 'be received by everyone' });

    socket.on('message', message => {
      console.log("message", message);
      io.sockets.emit('messageToVue', message);
    });
  });

  io.on('disconnect', socket => {
    console.log("Disconnect", socket.id);
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })
/******/ ]);