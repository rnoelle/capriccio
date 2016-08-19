angular.module('capriccio')
  .directive('localAuth', function () {
    return {
      restrict: 'EA',
      templateUrl: 'js/views/directives/localAuth.html',
      link: function (scope, element, attrs) {

      },
      controller: function ($scope, $state, dataService) {
        $scope.localSignin = function () {
          dataService.localSignin($scope.email, $scope.password).then(function (response) {
            if (response.status == 200) {
              $state.go('mainProducts');
            }
          });
        }
      }
    }
  })
