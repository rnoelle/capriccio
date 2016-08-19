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
        url: `/product/${id}`,
      }).then(function (response) {
        return response.data[0];
      })
    }
    this.localSignin = function (email, password) {
      return $http({
        method: 'POST',
        url: '/login',
        data: {
          email: email,
          password: password
        }
      }).then(function (response) {
        console.log('yassss');
        return respons;
      })
    }
    this.getAuth = function () {
      console.log('service getting auth');
      return $http({
        method: 'GET',
        url: '/userauth'
      }).then(function (response) {
        console.log(response);
        return response;
      })
    }
    this.getProfile = function () {
      return $http({
        method: 'GET',
        url: '/profiles'
      }).then(function (response) {
        console.log(response);
        return response.data[0];
      });
    }
    this.createUser = function (first_name, last_name, email, password) {
      return $http({
        method: 'POST',
        url: '/users',
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        }
      })
    }
    this.createComposer = function (first_name, last_name,
      year_born, year_died, country_of_origin, user_id) {
        return $http({
          method: 'POST',
          url: '/composers',
          data: {
            first_name: first_name,
            last_name: last_name,
            year_born: year_born,
            country_of_origin: country_of_origin,
            user_id: user_id,
            year_died: year_died
          }
        }).then(function (response) {
          return response;
        })
    }
  })
