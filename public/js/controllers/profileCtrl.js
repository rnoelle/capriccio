angular.module('capriccio')
  .controller('profileCtrl', function ($scope, dataService) {

    function getPurchases() {
      dataService.getPurchasesByUser().then(function (response) {
        if (response.length < 1) {
          $scope.purchases = [{title: "Sorry, you haven't made any purchases."}]
        } else {
          var items = response;
          for (var i = 0; i < items.length; i++) {
            items[i].scope_cover_url = items[i].cover_url.slice(10);
          }
          $scope.purchases = items;
        }
      })
    }
    function getWorksByComposer() {
      var id = $scope.user.id
      dataService.getWorksByComposer(id).then(function (response) {
        if (response.length < 1) {
          $scope.workHeader = '';
        } else {
          $scope.workHeader = 'Works Composed'
          $scope.composed_works = response;
        }
      })
    }
    function getProfile() {
      dataService.getProfile().then(function (response) {
        $scope.user = response;
        getPurchases();
        getWorksByComposer();
      })
    }
    getProfile();
  })
