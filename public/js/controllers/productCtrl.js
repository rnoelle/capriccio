angular.module('capriccio')
  .controller('productCtrl', function ($scope, dataService, $stateParams, $sce) {
    var thisProduct = $stateParams.id
    function getProduct(id) {
      dataService.getProduct(id).then(function (response) {
        $scope.product = response;
      })
    }
    getProduct(thisProduct);
    // $scope.productUrl = $sce.trustAsResourceUrl($scope.product.pdfUrl);

  })
