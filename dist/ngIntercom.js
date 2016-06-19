(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ngIntercom", [], factory);
	else if(typeof exports === 'object')
		exports["ngIntercom"] = factory();
	else
		root["ngIntercom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by voland on 4/2/16.
	 */
	"use strict";
	var Intercom = (function () {
	    function Intercom() {
	        var _this = this;
	        this._subjects = {};
	        this.$get.$inject = ['$injector'];
	        window.addEventListener('message', function (m) {
	            var message = m.data;
	            _this._applyCallbacks(message);
	        });
	        console.log('Intercom initialized');
	    }
	    // Configuration function
	    Intercom.prototype.config = function (instanceId, targetWindow) {
	        this._instance = instanceId;
	        this._target = targetWindow;
	        console.log("LogzioIntercom instance " + instanceId + " is configured with target " + targetWindow);
	    };
	    Intercom.prototype._getTargetWindow = function () {
	        return this._target === 'parent' ? window.parent : window.frames[this._target].contentWindow;
	    };
	    Intercom.prototype._applyCallbacks = function (message) {
	        if (message.topic) {
	            this._validateTopic(message.topic);
	            this._subjects[message.topic].forEach(function (callback) { return callback(message); });
	        }
	    };
	    Intercom.prototype._validateTopic = function (topic) {
	        if (!this._subjects[topic]) {
	            this._subjects[topic] = [];
	        }
	    };
	    // Provider's factory function
	    Intercom.prototype.$get = function ($injector) {
	        var _this = this;
	        function defaultCallback(message) {
	            var service = $injector.get(message.service);
	            var method = service[message.method];
	            method.apply(service, message.arguments);
	        }
	        return {
	            publish: function (message) {
	                _this._getTargetWindow().postMessage(message, '*');
	                _this._applyCallbacks(message);
	            },
	            subscribe: function (messageTopic, callback) {
	                _this._validateTopic(messageTopic);
	                _this._subjects[messageTopic].push(callback || defaultCallback);
	                console.log(_this._instance, _this._subjects);
	            }
	        };
	    };
	    return Intercom;
	}());
	exports.Intercom = Intercom;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = angular.module('ngIntercom', []).provider('Intercom', Intercom);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ngIntercom.js.map