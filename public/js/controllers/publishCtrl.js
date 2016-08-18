angular.module('capriccio')
  .controller('publishCtrl', function ($scope, $location, dataService) {
    this.getProfile = function () {
      
    }
    if ($scope.currentUser.registered_composer == false) {
      $location.path('/publish/composer');
      $location.replace();
    }
    $scope.first_name = $scope.currentUser.composer_first_name;
    $scope.last_name = $scope.currentUser.composer_last_name;
    $scope.country = $scope.currentUser.country;
    $scope.birth = $scope.currentUser.birth;
    $scope.death = null;
  });
