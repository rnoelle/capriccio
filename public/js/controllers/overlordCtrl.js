angular.module('capriccio')
  .controller('overlordCtrl', function ($scope, $rootScope, dataService) {
    this.getProfile = function () {
      dataService.getProfile().then(function (response) {
        $rootScope.picture_url = response.picture_url;
      })
    }
    this.getProfile();

    this.getCart = function () {
      dataService.getCart().then(function (response) {
        $rootScope.userCart = response;
      })
    }
    this.getCart();
  })
