angular.module('capriccio')
  .controller('productCtrl', function ($scope, $rootScope, dataService, $stateParams) {
    var thisProduct = $stateParams.id
    function getProduct(id) {
      dataService.getProduct(id).then(function (response) {
        var item = response;
        $scope.product = response;
        $scope.product.scope_cover_url = item.cover_url.slice(10);
        $scope.product.scope_preview_url = item.preview_url.slice(10);
        $scope.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        dataService.getReviews(id).then(function (response) {
          $scope.reviews = response;
        })
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
