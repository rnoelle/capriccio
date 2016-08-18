angular.module('capriccio')
  .directive('landingNav', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/views/directives/landingNav.html',
      link: function (scope, element, attrs) {

      },
      controller: function ($scope, $location) {
        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
          }
      }
    }
  })
