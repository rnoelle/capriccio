angular.module('capriccio')
  .controller('publishCtrl', function ($scope, dataService) {
    $scope.currentUser = {
      admin: false,
      first_name: "Bob",
      last_name: "Zales",
      country: "United States",
      birth: "1989"
    }
    if ($scope.currentUser.admin = false) {
      $scope.first_name = $scope.currentUser.first_name;
      $scope.first_name = $scope.currentUser.last_name;
      $scope.country = $scope.currentUser.country;
      $scope.birth = $scope.currentUser.birth;
      $scope.death = null;

    }
  });
