angular.module('capriccio')
  .controller('productCtrl', function ($scope, $rootScope, dataService, $stateParams) {
    var thisProduct = $stateParams.id
    function getProduct(id) {
      dataService.getProduct(id).then(function (response) {
        $scope.product = response;
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
