(function() {
  "use strict";

  var weather = angular.module("weather", ["ngMaterial", "ngRoute",
   "weather.factories", "weather.services", "weather.controllers",
   "weather.directives"]);

angular.module("weather.controllers", []);

weather.constant("CONSTANTS", {
  API_KEY: "292c4426c1db055b4b25eb5f7efed937",
  API_VERSION: "2.5",
  API_UNITS: "metric",
  IMAGES_PATH: "http://openweathermap.org/img/w/"
});

weather.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "../views/weather_view.html",
    controller: "WeatherController"
  });
});

weather.config(function($httpProvider, CONSTANTS) {

  // var apiId = "292c4426c1db055b4b25eb5f7efed937";
  $httpProvider.interceptors.push(function($q) {
    return {
      "request": function(config) {

        if (config.method === "GET") {
          config.params = config.params || {};
          // config.params.appid =  apiId;
          config.params.appid =  CONSTANTS.API_KEY;
          config.params.units = CONSTANTS.API_UNITS;
        }
        // console.log(config);
        return config;
      }
    };
  });
});

}).call();
