(function() {
  "use strict";

  angular.module("weather.controllers")
  .controller("MainController", ["$scope", MainController]);

  function MainController($scope) {
    $scope.title = "Weather";
  }
}).call();
