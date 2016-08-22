angular.module('capriccio')
  .controller('composerCtrl', function ($location, $scope, dataService) {
    this.getCountries = function () {
      dataService.getCountries().then(function (response) {
        $scope.countries = response;
        $scope.country_of_origin = 'United States';
      })
    }
    this.getCountries();
    $scope.createComposer = function () {
      if (!$scope.year_died) {
        $scope.year_died = null;
      }
      dataService.createComposer($scope.first_name, $scope.last_name, $scope.year_born,
        $scope.year_died, $scope.country_of_origin, $scope.user_id).then(function (response) {
          console.log(response);
          $location.path('/publish');
          $location.replace();
        })
    }
  })
