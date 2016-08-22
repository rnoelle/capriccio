angular.module('capriccio')
  .controller('mainCtrl', function ($scope, dataService) {

    $scope.mainFilter = {};
    function getProducts() {
      dataService.getProducts().then(function (response) {
        $scope.items = response;
      })
    }
    getProducts();

  })
