angular.module('capriccio')
  .controller('mainCtrl', function ($scope, dataService) {
    // $scope.test = "me too!"
    // $scope.serviceTest = dataService.test;

    function getProducts() {
      dataService.getProducts().then(function (response) {
        $scope.items = response;
      })
    }
    getProducts();
    $scope.mainFilter = {};

  })
