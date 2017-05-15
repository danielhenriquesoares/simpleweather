(function() {
  "use strict";

  angular.module("weather.directives", [])
  .directive("weatherComp", ["WeatherHelperService", WeatherComp]);

  function WeatherComp(weatherHelperService) {
    return {
      restrict: "E",
      replace: true,
      scope: {
        weatherInfo: "=info",
        isSmall: "="
      },
      templateUrl: "../views/weather_comp_view.html",
      bindToController: true,
      controller: function() {
        var vm = this;
        vm.buildImagePath = weatherHelperService.buildImagePath;
        vm.sunriseSunset = weatherHelperService.getDateFromTimestamp;
      },
      controllerAs: "ctrl"/*,
      link: function(scope, elem, attrs){
        console.log(scope.ctrl);

        scope.ctrl.buildImagePath = function() {
          return weatherHelperService.buildImagePath(scope.ctrl.weatherInfo);
        };


        scope.$watch("scope", function(newValue, oldValue) {
          console.log(newValue);
        });
      }*/
    };
  }
}).call();
