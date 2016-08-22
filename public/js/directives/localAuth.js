angular.module('capriccio')
  .directive('localAuth', function () {
    return {
      restrict: 'EA',
      templateUrl: 'js/views/directives/localAuth.html',
      link: function (scope, element, attrs) {

      },
      controller: function ($scope, $state, $location, $rootScope, dataService) {
        $scope.localSignin = function () {
          dataService.localSignin($scope.email, $scope.password).then(function (response) {
            if (response.status == 200) {
              $location.path('/');
              $location.replace();
            }
            dataService.getProfile().then(function (resp) {
              if (resp.picture_url) {
                $rootScope.picture_url = resp.picture_url;
              }
            })
          });
        }
      }
    }
  })
