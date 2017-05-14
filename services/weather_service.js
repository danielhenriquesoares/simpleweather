(function () {
  "use strict";
  angular.module("weather.services", [])
  .service("WeatherService",["$http", "$q", "Response", "CONSTANTS",
  WeatherService]);

  function WeatherService ($http, $q, response, constants) {

    var endpoint = "http://api.openweathermap.org";

    return {
      /**
       * [description]
       * @param  {[type]} coords [description]
       * @return {[type]}        [description]
       */
      getCurrentLocationWeatherByCoords: function(coords) {
        var deferred = $q.defer();
        if (coords === null || typeof(coords) === "undefined") {
          response.setError("Invalid parameter 'coords' provided");
          deferred.reject(response.getResponse());
          return deferred.promise;
        }

        var params = [
          "lat=" + coords.latitude,
          "lon=" + coords.longitude
        ];

        var url = endpoint + "/data/"+ constants.API_VERSION + "/weather?" + params.join("&");

        $http.get(url, {cache: true})
        .then(function(resp) {
          response.setData(resp);
          deferred.resolve(response.getResponse());
        })
        .catch(function() {
          response.setError("Error occur while fetching current location weather");
          deferred.reject(response.getResponse());
        });

        return deferred.promise;
      },

      /**
       * [description]
       * @param  {[type]} city    [description]
       * @param  {[type]} country [description]
       * @return {[type]}         [description]
       */
      getCurrentLocationWeather: function (city,country) {

        var deferred = $q.defer();

        if (city === null || typeof(city) === "undefined" || city === "") {
          deferred.reject("Invalid city provided");
          return deferred.promise;
        }

        if (country === null || typeof(country) === "undefined" || country === "") {
          deferred.reject("Invalid country provided");
          return deferred.promise;
        }

        var url = endpoint + "/data/" + constants.API_VERSION + "/weather?q=" + city + "," + country;

        $http.get(url, {cache: true})
        .then(function(resp) {
            response.setData(resp);
            deferred.resolve(response.getResponse());
        })
        .catch(function() {
          response.setError("Error occured while getting city data");
          deferred.reject(response.getResponse());
        });

        return deferred.promise;
      }
    };
  }
}).call();
