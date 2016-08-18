angular.module('capriccio', ['ui.router']);

angular.module('capriccio')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('home', {
        url: '/landing',
        templateUrl: 'js/views/landing.html'
      })
      .state('login', {
        url:'/login',
        controller: 'loginCtrl'
      })
      .state('login.login', {
        url:'/login',
        templateUrl: 'js/views/login.html',
        controller: 'loginCtrl'
      })
      .state('login.signup', {
        url:'/signup',
        templateUrl: 'js/views/signup.html',
        controller: 'loginCtrl'
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
      .state('composer', {
        url: '/publish/composer',
        templateUrl: 'js/views/publish-composer.html',
        controller: 'publishCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'js/views/profile.html',
        controller: 'profileCtrl'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'js/views/admin/admin.html',
      })
      .state('admin.home', {
        url: '/home',
        templateUrl: 'js/views/admin/admin-home.html',
      })
      .state('admin.inventory', {
        url: '/inventory',
        templateUrl: 'js/views/admin/admin-inventory.html',
        controller: 'adminInventory'
      })
      .state('admin.inventory.update', {
        url: '/update',
        templateUrl: 'js/views/admin/admin-inventory-update.html',
        controller: 'adminInventory'
      })
      .state('admin.inventory.add', {
        url: '/add',
        templateUrl: 'js/views/admin/admin-inventory-add.html',
        controller: 'adminInventory'
      })
      .state('admin.inventory.delete', {
        url: '/delete',
        templateUrl: 'js/views/admin/admin-inventory-delete.html',
        controller: 'adminInventory'
      })
      .state('admin.review', {
        url: '/review',
        templateUrl: 'js/views/admin/admin-review.html'
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'js/views/admin/admin-users.html'
      })
      .state('admin.analysis', {
        url: '/analysis',
        templateUrl: 'js/views/admin/admin-analysis.html'
      })
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/landing');
  })
