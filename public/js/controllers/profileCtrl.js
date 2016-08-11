angular.module('capriccio')
  .controller('profileCtrl', function ($scope, dataService) {
    function getProfile(id) {
      dataService.getProfile(id).then(function (response) {
        $scope.user = response;
      })
    }
    getProfile(1);
  })
