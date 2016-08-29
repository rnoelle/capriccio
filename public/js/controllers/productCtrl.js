angular.module('capriccio')
  .controller('productCtrl', function ($scope, $rootScope, dataService, $stateParams) {
    var thisProduct = $stateParams.id
    function getProduct(id) {
      dataService.getProduct(id).then(function (response) {
        var item = response;
        $scope.product = response;
        $scope.product.scope_cover_url = item.cover_url.slice(10);
        $scope.product.scope_score_url = item.score_url.slice(10);
      })
    }
    getProduct(thisProduct);

      $scope.addToCart = function () {
        dataService.addToCart(thisProduct, 1).then(function (response) {
          $rootScope.userCart = response.data;
          $rootScope.cartLength = response.data.length;
        });
      }
  })
