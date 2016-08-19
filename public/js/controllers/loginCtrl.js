angular.module('capriccio')
  .controller('loginCtrl', function ($scope, $location, dataService) {

    $scope.test = 'You cool';

    $scope.register = function (isValid) {
      if(isValid) {
        dataService.createUser($scope.first_name, $scope.last_name,
          $scope.email, $scope.password).then(function (response) {
            $location.path('/profile');
            $location.replace();
          })
      } else {
        console.log('not valid');
      }
    }

  })
