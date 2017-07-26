(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WiPubSub = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file
 * @copyright
 * @license
 *
 */
/* eslint valid-jsdoc: ["error", {"requireReturnDescription": false}] */

// import User from './User';
// import Project from './Project';
// import Instance from './Instance';
var mqtt = require('mqtt');
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'WiPubSub' });
// var mqttClient

/**
 * WiPubSub encapsulates the functionality to create various API wrapper objects.
 */

var WiPubSub = function () {
   /**
    * Create a new WiPubSub.
    */
   function WiPubSub() {
      var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'whatsit-pubsub';
      var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'mqtt';
      var port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1883';

      _classCallCheck(this, WiPubSub);

      this.__url = protocol + '://' + host;
      this._this = this;
      this.onConnect = this.onConnect.bind(this);
      this.onError = this.onError.bind(this);
   }

   _createClass(WiPubSub, [{
      key: 'connect',
      value: function connect() {
         this.mqttClient = mqtt.connect(this.__url);
         this.mqttClient.on('connect', this.onConnect);
         this.mqttClient.on('error', this.onError);
      }
   }, {
      key: 'isConnected',
      value: function isConnected() {
         return this.mqttClient.connected;
      }
   }, {
      key: 'onConnect',
      value: function onConnect() {
         log.info('onConnect');
         this.mqttClient.publish(this.topic, this.message);
         this.resolve();
      }
   }, {
      key: 'onError',
      value: function onError(error) {
         log.info('onError: ' + error);
         this.reject(error);
      }
   }, {
      key: 'publish',
      value: function publish(topic, message) {
         var _this = this;

         log.info('publish');
         return new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
            _this.topic = topic;
            _this.message = message;
            _this.connect();
         });
      }
   }]);

   return WiPubSub;
}();

module.exports = WiPubSub;

},{"bunyan":undefined,"mqtt":undefined}]},{},[1])(1)
});

//# sourceMappingURL=WiPubSub.js.map
