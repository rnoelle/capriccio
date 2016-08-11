angular.module('capriccio', ['ui.router']);

angular.module('capriccio')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/'
      })
      .state('mainProducts', {
        url:'/main',
        templateUrl: 'js/views/main.html',
        controller: 'mainCtrl'
      })
      .state('productDetail', {
        url: '/product/:id',
        templateUrl: 'js/views/product.html',
        controller: 'productCtrl'
      })
      .state('publish', {
        url: '/publish',
        templateUrl: 'js/views/publish.html',
        controller: 'publishCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'js/views/profile.html',
        controller: 'profileCtrl'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'js/views/admin.html',
      })
      .state('admin.review', {
        url: '/admin',
        templateUrl: 'js/views/admin.html'
      })

    $urlRouterProvider.otherwise('/');
  })
