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
    this.getCart = function () {
      return $http({
        method: 'GET',
        url: '/cart'
      }).then(function (response) {
        console.log(response);
        return response.data;
      })
    }

    this.addToCart = function (product_id, quantity) {
      return $http({
        method: 'POST',
        url: '/cart',
        data: {
          product_id: product_id,
          quantity: quantity
        }
      }).then(function (response) {
        return response;
      })
    }
    this.removeFromCart = function (id) {
      return $http({
        method: 'DELETE',
        url: `/cart/${id}`,
      }).then(function (response) {
        return response.data;
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
        console.log(response, 'is the response');
        return response;
      })
    }
    this.getAuth = function () {
      console.log('service getting auth');
      return $http({
        method: 'GET',
        url: '/userauth'
      }).then(function (response) {
        return response;
      })
    }
    this.getComp = function () {
      console.log('service getting comp');
      return $http({
        method: 'GET',
        url: '/usercomp'
      }).then(function (response) {
        return response;
      })
    }
    this.getProfile = function () {
      return $http({
        method: 'GET',
        url: '/profiles'
      }).then(function (response) {
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
      year_born, year_died, country_of_origin) {
        return $http({
          method: 'POST',
          url: '/composers',
          data: {
            first_name: first_name,
            last_name: last_name,
            year_born: year_born,
            country_of_origin: country_of_origin,
            year_died: year_died
          }
        }).then(function (response) {
          return response;
        })
    }
    this.getCountries = function () {
      return $http({
        method: 'GET',
        url: 'https://restcountries.eu/rest/v1/all'
      }).then(function (response) {
        var countries = [];
        countries.push('United States');
        for(var country of response.data) {
          countries.push(country.name);
        }
        return countries;
      })
    }
    this.getSubmissions = function () {
      return $http({
        method: 'GET',
        url: '/submissions'
      }).then(function (response) {
        return response.data;
      })
    }
  })
