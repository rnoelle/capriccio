angular.module('capriccio')
  .service('dataService', function ($http) {
    this.test = "At your service, sir.";
    this.getProducts = function () {
      return $http({
        method: 'GET',
        url: '/products'
      }).then(function (response) {
        return response.data;
      });
    }
    this.getProduct = function (id) {
      return $http({
        method: 'GET',
        url: '/product/' + id
      }).then(function (response) {
        return response.data[0];
      })
    }
    this.getProfile = function (id) {
      return $http({
        method: 'GET',
        url: '/profile/' + id
      }).then(function (response) {
        return response.data[0];
      })
    }
  })
