(function() {
  "use strict";

  angular.module("weather.controllers")
  .controller("WeatherController", ["$scope", "WeatherService",
  "GeolocationService", WeatherController]);

  function WeatherController($scope, weatherService, geolocationService) {
    $scope.message = "Weather forecast";

    var resp;
    geolocationService.getCurrentPosition()
    .then(function(r) {
      resp = r;
    })
    .catch(function(errorObj) {
      console.error("error", errorObj.error.message);
    }).finally(function() {
      //console.log(resp);
      if (typeof(resp) !== "undefined" && !resp.error.hasError) {

        var forecastData = [];
        var forecastResp;
        weatherService.getCurrentLocationForecast(resp.data.coords, 5)
        .then(function(resp) {
          forecastResp = resp.data.data;
        }).finally(function() {
          angular.forEach(forecastResp.list, function(value, key) {
            var data = {};
            data.name = forecastResp.city.name;
            data.subtitle = value.dt_txt;
            data.currentPosWeather = value.weather[0];
            forecastData.push(data);
          });

          $scope.forecast = forecastData;
        });

        var viewData;
        weatherService.getCurrentLocationWeatherByCoords(resp.data.coords)
        .then(function(resp) {
          // console.log("api response",resp);
          viewData = resp.data.data;

        }).catch(function(error) {
          console.error("Error: ", error);
        }).finally(function() {
          // Prepare data to send to directive
          // Test git linux machine
          $scope.data = {};
          $scope.data.name = viewData.name;
          $scope.data.currentTemp = viewData.main.temp;
          $scope.data.currentTempMax = viewData.main.temp_max;
          $scope.data.currentTempMin = viewData.main.temp_min;
          $scope.data.sunrise = viewData.sys.sunrise;
          $scope.data.sunset = viewData.sys.sunset;
          $scope.data.currentPosWeather = viewData.weather[0];
        });
      }

    });
  }
}).call();
