(function() {
  "use strict";

  angular.module("weather.services")
  .service("WeatherHelperService", ["CONSTANTS", WeatherHelperService]);

  function WeatherHelperService(constants) {
    return {
      /**
       * [description]
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
      buildImagePath: function(obj) {

        if (typeof(obj) !== "undefined") {
          return constants.IMAGES_PATH + obj.currentPosWeather.icon + ".png";
        }
        return "";
      },

      /**
       * [description]
       * @param  {[type]} obj    [description]
       * @param  {[type]} sunset [description]
       * @return {[type]}        [description]
       */
      getDateFromTimestamp: function(obj, sunset) {
        if (obj !== null && typeof(obj) !== "undefined") {
          var isSunset = sunset || false;
          var timestamp = isSunset ? obj.sunset : obj.sunrise;

          var date = new Date(timestamp);
          console.log(date);

          var h = (isSunset) ? 12 + date.getHours() : date.getHours();

          var hours = "0" + h;
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();

          return hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        }

        return 0;
      }
    };
  }
}).call();
