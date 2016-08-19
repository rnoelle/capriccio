angular.module('capriccio')
  .directive('localAuth', function () {
    return {
      restrict: 'EA',
      templateUrl: 'js/views/directives/localAuth.html',
      link: function (scope, element, attrs) {

      },
      controller: function ($scope, dataService) {
        $scope.localSignin = function () {
          dataService.localSignin($scope.email, $scope.password);
        }
      }
    }
  })
