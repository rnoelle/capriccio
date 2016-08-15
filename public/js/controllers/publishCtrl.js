angular.module('capriccio')
  .controller('publishCtrl', function ($scope, dataService) {
    $scope.currentUser = {
      admin: false,
      country: "United States",
      birth: "1989"
    }
    if ($scope.currentUser.admin = false) {
      $scope.country = $scope.currentUser.country;
      $scope.birth = $scope.currentUser.birth;
    }
  });
