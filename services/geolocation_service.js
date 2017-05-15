(function() {
  "use strict";

  angular.module("weather.services")
  .service("GeolocationService", ["$q", "$window", "Response", GeolocationService]);

  function GeolocationService($q, $window, response) {

    return {

      /**
       * [description]
       * @return {[type]} [description]
       */
      isGeolocationAvailable: function() {

        // return false;

        if ($window.navigator.geolocation) {
          return true;
        } else {
          return false;
        }
      },

      /**
       * [description]
       * @return {[type]} [description]
       */
      getCurrentPosition: function() {
        var deferred = $q.defer();
        var _self = this;

        if (!_self.isGeolocationAvailable()) {
            response.setError("Geolocation not supported.");
            deferred.reject(response.getResponse());
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    response.setData(position);
                    deferred.resolve(response.getResponse());
                },
                showError);
        }

        return deferred.promise;
      },
    };

    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          response.setError("User denied the request for geolocation");
          break;
        case error.POSITION_UNAVAILABLE:
          response.setError("Location information is unavailable");
          break;
        case error.TIMEOUT:
          response.setError("The request to get user location timed out");
          break;
        case error.UNKNOWN_ERROR:
          response.setError("An unknown error occured");
          break;
      }
    }
  }
}).call();
