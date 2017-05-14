(function() {
  "use strict";

  angular.module("weather.factories", [])
  .factory("Response", [CustomResponse]);

  function CustomResponse() {
    var customResponse = {
      error: {
        hasError: false,
        message: ""
      },
      data: {}
    };

    return {
      "getResponse": function() {
        return customResponse;
      },

      "setData": function(data) {
        clear();
        customResponse.data = data;
      },

      "setError": function(message) {
        clear();
        customResponse.error.hasError = true;
        customResponse.error.message = message;
      }
    };

    function clear() {
      customResponse.error.hasError = false;
      customResponse.error.message = "";
      customResponse.data = {};
    }
  }
}).call();
