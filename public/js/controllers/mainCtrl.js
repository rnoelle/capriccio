angular.module('capriccio')
  .controller('mainCtrl', function ($scope, dataService) {

    $scope.mainFilter = {};
    function getProducts() {
      dataService.getProducts().then(function (response) {
        var items = response;
        for (var = 0; i < items.length; i++) {
          items[i].scope_cover_url = items[i].cover_url.slice(10);
        }
        $scope.items = items;
      })
    }
    getProducts();

  })
