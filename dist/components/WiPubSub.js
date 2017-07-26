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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldpUHViU3ViLmpzIl0sIm5hbWVzIjpbIm1xdHQiLCJyZXF1aXJlIiwiYnVueWFuIiwibG9nIiwiY3JlYXRlTG9nZ2VyIiwibmFtZSIsIldpUHViU3ViIiwiaG9zdCIsInByb3RvY29sIiwicG9ydCIsIl9fdXJsIiwiX3RoaXMiLCJvbkNvbm5lY3QiLCJiaW5kIiwib25FcnJvciIsIm1xdHRDbGllbnQiLCJjb25uZWN0Iiwib24iLCJjb25uZWN0ZWQiLCJpbmZvIiwicHVibGlzaCIsInRvcGljIiwibWVzc2FnZSIsInJlc29sdmUiLCJlcnJvciIsInJlamVjdCIsIlByb21pc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBTUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsT0FBT0MsUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFJQyxTQUFTRCxRQUFRLFFBQVIsQ0FBYjs7QUFFQSxJQUFJRSxNQUFNRCxPQUFPRSxZQUFQLENBQW9CLEVBQUNDLE1BQUssVUFBTixFQUFwQixDQUFWO0FBQ0E7O0FBRUE7Ozs7SUFHTUMsUTtBQUNIOzs7QUFHQSx1QkFBdUU7QUFBQSxVQUEzREMsSUFBMkQsdUVBQXBELGdCQUFvRDtBQUFBLFVBQWxDQyxRQUFrQyx1RUFBdkIsTUFBdUI7QUFBQSxVQUFmQyxJQUFlLHVFQUFSLE1BQVE7O0FBQUE7O0FBQ3BFLFdBQUtDLEtBQUwsR0FBZ0JGLFFBQWhCLFdBQThCRCxJQUE5QjtBQUNBLFdBQUtJLEtBQUwsR0FBYSxJQUFiO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixLQUFLQSxTQUFMLENBQWVDLElBQWYsQ0FBb0IsSUFBcEIsQ0FBakI7QUFDQSxXQUFLQyxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhRCxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDRjs7OztnQ0FFVTtBQUNSLGNBQUtFLFVBQUwsR0FBa0JmLEtBQUtnQixPQUFMLENBQWEsS0FBS04sS0FBbEIsQ0FBbEI7QUFDQSxjQUFLSyxVQUFMLENBQWdCRSxFQUFoQixDQUFtQixTQUFuQixFQUE4QixLQUFLTCxTQUFuQztBQUNBLGNBQUtHLFVBQUwsQ0FBZ0JFLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLEtBQUtILE9BQWpDO0FBQ0Y7OztvQ0FFYztBQUNaLGdCQUFPLEtBQUtDLFVBQUwsQ0FBZ0JHLFNBQXZCO0FBQ0Y7OztrQ0FFWTtBQUNWZixhQUFJZ0IsSUFBSixDQUFTLFdBQVQ7QUFDQSxjQUFLSixVQUFMLENBQWdCSyxPQUFoQixDQUF3QixLQUFLQyxLQUE3QixFQUFvQyxLQUFLQyxPQUF6QztBQUNBLGNBQUtDLE9BQUw7QUFDRjs7OzhCQUVRQyxLLEVBQU87QUFDYnJCLGFBQUlnQixJQUFKLGVBQXFCSyxLQUFyQjtBQUNBLGNBQUtDLE1BQUwsQ0FBWUQsS0FBWjtBQUNGOzs7OEJBRVFILEssRUFBT0MsTyxFQUFTO0FBQUE7O0FBQ3RCbkIsYUFBSWdCLElBQUosQ0FBUyxTQUFUO0FBQ0EsZ0JBQU8sSUFBSU8sT0FBSixDQUFZLFVBQUNILE9BQUQsRUFBVUUsTUFBVixFQUFxQjtBQUNyQyxrQkFBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0Esa0JBQUtFLE1BQUwsR0FBYUEsTUFBYjtBQUNBLGtCQUFLSixLQUFMLEdBQWFBLEtBQWI7QUFDQSxrQkFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Esa0JBQUtOLE9BQUw7QUFDRixVQU5NLENBQVA7QUFPRjs7Ozs7O0FBR0pXLE9BQU9DLE9BQVAsR0FBaUJ0QixRQUFqQiIsImZpbGUiOiJXaVB1YlN1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHRcbiAqIEBsaWNlbnNlXG4gKlxuICovXG4vKiBlc2xpbnQgdmFsaWQtanNkb2M6IFtcImVycm9yXCIsIHtcInJlcXVpcmVSZXR1cm5EZXNjcmlwdGlvblwiOiBmYWxzZX1dICovXG5cbi8vIGltcG9ydCBVc2VyIGZyb20gJy4vVXNlcic7XG4vLyBpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuLy8gaW1wb3J0IEluc3RhbmNlIGZyb20gJy4vSW5zdGFuY2UnO1xudmFyIG1xdHQgPSByZXF1aXJlKCdtcXR0JylcbnZhciBidW55YW4gPSByZXF1aXJlKCdidW55YW4nKVxuXG52YXIgbG9nID0gYnVueWFuLmNyZWF0ZUxvZ2dlcih7bmFtZTonV2lQdWJTdWInfSlcbi8vIHZhciBtcXR0Q2xpZW50XG5cbi8qKlxuICogV2lQdWJTdWIgZW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSB2YXJpb3VzIEFQSSB3cmFwcGVyIG9iamVjdHMuXG4gKi9cbmNsYXNzIFdpUHViU3ViIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IFdpUHViU3ViLlxuICAgICovXG4gICBjb25zdHJ1Y3Rvcihob3N0ID0gJ3doYXRzaXQtcHVic3ViJywgcHJvdG9jb2wgPSAnbXF0dCcsIHBvcnQgPSAnMTg4MycpIHtcbiAgICAgIHRoaXMuX191cmwgPSBgJHtwcm90b2NvbH06Ly8ke2hvc3R9YFxuICAgICAgdGhpcy5fdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMub25Db25uZWN0ID0gdGhpcy5vbkNvbm5lY3QuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMub25FcnJvciA9IHRoaXMub25FcnJvci5iaW5kKHRoaXMpO1xuICAgfVxuXG4gICBjb25uZWN0ICgpIHtcbiAgICAgIHRoaXMubXF0dENsaWVudCA9IG1xdHQuY29ubmVjdCh0aGlzLl9fdXJsKVxuICAgICAgdGhpcy5tcXR0Q2xpZW50Lm9uKCdjb25uZWN0JywgdGhpcy5vbkNvbm5lY3QpO1xuICAgICAgdGhpcy5tcXR0Q2xpZW50Lm9uKCdlcnJvcicsIHRoaXMub25FcnJvcik7XG4gICB9XG5cbiAgIGlzQ29ubmVjdGVkICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1xdHRDbGllbnQuY29ubmVjdGVkO1xuICAgfVxuXG4gICBvbkNvbm5lY3QgKCkge1xuICAgICAgbG9nLmluZm8oJ29uQ29ubmVjdCcpXG4gICAgICB0aGlzLm1xdHRDbGllbnQucHVibGlzaCh0aGlzLnRvcGljLCB0aGlzLm1lc3NhZ2UpXG4gICAgICB0aGlzLnJlc29sdmUoKVxuICAgfVxuXG4gICBvbkVycm9yIChlcnJvcikge1xuICAgICAgbG9nLmluZm8oYG9uRXJyb3I6ICR7ZXJyb3J9YClcbiAgICAgIHRoaXMucmVqZWN0KGVycm9yKVxuICAgfVxuXG4gICBwdWJsaXNoICh0b3BpYywgbWVzc2FnZSkge1xuICAgICAgbG9nLmluZm8oJ3B1Ymxpc2gnKVxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmVcbiAgICAgICAgIHRoaXMucmVqZWN0PSByZWplY3RcbiAgICAgICAgIHRoaXMudG9waWMgPSB0b3BpY1xuICAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgICAgICAgdGhpcy5jb25uZWN0KClcbiAgICAgIH0pXG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2lQdWJTdWI7XG4iXX0=
//# sourceMappingURL=WiPubSub.js.map
