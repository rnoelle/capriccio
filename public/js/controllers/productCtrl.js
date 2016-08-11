angular.module('capriccio')
  .controller('productCtrl', function ($scope, dataService, $stateParams, $sce) {
    var thisProduct = $stateParams.id
    $scope.product = dataService.items[thisProduct - 1];
    // $scope.productUrl = $sce.trustAsResourceUrl($scope.product.pdfUrl);
    
  })
