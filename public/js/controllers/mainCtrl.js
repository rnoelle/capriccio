angular.module('capriccio')
  .controller('mainCtrl', function ($scope, dataService) {
    $scope.random = function() {
        return 0.5 - Math.random();
    }

    $scope.mainFilter = {};
    function getProducts() {
      dataService.getProducts().then(function (response) {
        var items = response;
        console.dir(items)
        for (var i = 0; i < items.length; i++) {
          items[i].scope_cover_url = items[i].cover_url.slice(10);
        }
        console.dir(items)
        $scope.items = items;
      })
    }
    getProducts();

  })
