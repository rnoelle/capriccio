angular.module('capriccio')
  .service('dataService', function ($http) {
    this.test = "At your service, sir.";
    this.getProducts = function () {
      return $http({
        method: 'GET',
        url: '/products'
      }).then(function (response) {
        console.log(response);
        return response.data;
      });
    }
  })
