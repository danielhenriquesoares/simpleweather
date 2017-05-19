(function() {
  "use strict";

  angular.module("weather.controllers")
  .controller("WeatherController", ["WeatherService",
  "GeolocationService", "WeatherHelperService", WeatherController]);

  function WeatherController(weatherService, geolocationService,
    weatherHelperService) {

    var vm = this;
    vm.message = "Weather forecast";
    vm.testArray = ["a","b"];

    vm.listener = function() {
      /*console.log("listener");
      vm.testArray.push(weatherHelperService.getRandomChar());*/
      vm.testArray[0] = weatherHelperService.getRandomChar();
      vm.testArray[1] = weatherHelperService.getRandomChar();
    };

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

          vm.forecast = forecastData;
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
          vm.data = {};
          vm.data.name = viewData.name;
          vm.data.currentTemp = viewData.main.temp;
          vm.data.currentTempMax = viewData.main.temp_max;
          vm.data.currentTempMin = viewData.main.temp_min;
          vm.data.sunrise = viewData.sys.sunrise;
          vm.data.sunset = viewData.sys.sunset;
          vm.data.currentPosWeather = viewData.weather[0];
        });
      }

    });
  }
}).call();
