angular.module('capriccio')
  .controller('mainCtrl', function ($scope, dataService) {
  
    function getProducts() {
      dataService.getProducts().then(function (response) {
        $scope.items = response;
      })
    }
    getProducts();
    $scope.mainFilter = {};

  })
