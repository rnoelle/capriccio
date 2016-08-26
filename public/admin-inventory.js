angular.module('capriccio')
  .controller('adminInventory', function ($scope, $sce, dataService) {
    $scope.getProduct = function (id) {
      dataService.getProduct(id).then(function (response) {
        $('.work-card').removeClass('hidden');
        console.log(response);
        $scope.work = response;
        $scope.productUrl = $sce.trustAsResourceUrl($scope.work.score_url);
      })
    }

    $scope.removeWork = function () {
      dataService.removeWork($scope.deleteId).then(function (response) {
        $('.delete-after').removeClass('hidden');
      })
    }
  })
