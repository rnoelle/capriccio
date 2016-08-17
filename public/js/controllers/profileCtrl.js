angular.module('capriccio')
  .controller('profileCtrl', function ($scope, dataService) {
    function getProfile() {
      dataService.getProfile().then(function (response) {
        console.log(response);
        $scope.user = response;
      })
    }
    getProfile();
  })
