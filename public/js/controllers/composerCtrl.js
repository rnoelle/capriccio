angular.module('capriccio')
  .controller('composerCtrl', function ($location, $scope, $state, dataService) {
    this.getCountries = function () {
      dataService.getCountries().then(function (response) {
        $scope.countries = response;
        $scope.country_of_origin = 'United States';
      })
    }
    this.getCountries();
    $scope.createComposer = function () {
      if (!Number($scope.year_died)) {
        $scope.year_died = null;
      }
      dataService.createComposer($scope.first_name, $scope.last_name, $scope.year_born,
        $scope.year_died, $scope.country_of_origin, $scope.user_id).then(function (response) {
            $state.go('publish');
          })
        }
  })
