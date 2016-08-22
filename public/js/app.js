angular.module('capriccio', ['ui.router']);

angular.module('capriccio')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    var adminResolve = {
        security: (dataService, $state) => {
          return dataService.getAuth()
              .catch((err) => {
                  console.log("Unauthorized: ", err);
                  if (err.status === 401) {
                      $state.go('login');
                  }
              });
            }
          };

          var composerResolve = {
              security: (dataService, $state) => {
                return dataService.getAuth()
                    .catch((err) => {
                        console.log("Unauthorized: ", err);
                        if (err.status === 401) {
                            $state.go('login');
                        }
                    });
                  }
                };


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
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'js/views/checkout.html',
        controller: 'checkoutCtrl',
        resolve: {
            security: (dataService, $state) => {
              return dataService.getAuth()
                  .catch((err) => {
                      console.log("Unauthorized: ", err);
                      if (err.status === 401) {
                          $state.go('login.login');
                      }
                  });
                }
              }
      })
      // .state('checkout.stripe', {
      //   url: '/stripe/:total',
      //   controller: 'stripeCtrl'
      // })
      .state('publish', {
        url: '/publish',
        templateUrl: 'js/views/publish.html',
        controller: 'publishCtrl',
        resolve: {
            security: (dataService, $state) => {
              return dataService.getComp()
                  .catch((err) => {
                      console.log("Unauthorized: ", err);
                      if (err.status === 401) {
                          $state.go('login.login');
                      } else if (err.status === 303) {
                        $state.go('composer');
                      }
                  });
                }
              }
      })
      .state('composer', {
        url: '/publish/composer',
        templateUrl: 'js/views/publish-composer.html',
        controller: 'composerCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'js/views/profile.html',
        controller: 'profileCtrl',
        resolve: {
            security: (dataService, $state) => {
              return dataService.getAuth()
                  .catch((err) => {
                      console.log("Unauthorized: ", err);
                      if (err.status === 401) {
                          $state.go('login.login');
                      }
                  });
                }
              }
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'js/views/admin/admin.html',
        resolve: adminResolve
      })
      .state('admin.home', {
        url: '/home',
        templateUrl: 'js/views/admin/admin-home.html',
        resolve: adminResolve
      })
      .state('admin.inventory', {
        url: '/inventory',
        templateUrl: 'js/views/admin/admin-inventory.html',
        controller: 'adminInventory',
        resolve: adminResolve
      })
      .state('admin.inventory.update', {
        url: '/update',
        templateUrl: 'js/views/admin/admin-inventory-update.html',
        controller: 'adminInventory',
        resolve: adminResolve
      })
      .state('admin.inventory.add', {
        url: '/add',
        templateUrl: 'js/views/admin/admin-inventory-add.html',
        controller: 'adminInventory',
        resolve: adminResolve
      })
      .state('admin.inventory.delete', {
        url: '/delete',
        templateUrl: 'js/views/admin/admin-inventory-delete.html',
        controller: 'adminInventory',
        resolve: adminResolve
      })
      .state('admin.review', {
        url: '/review',
        templateUrl: 'js/views/admin/admin-review.html',
        resolve: adminResolve
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'js/views/admin/admin-users.html',
        resolve: adminResolve
      })
      .state('admin.analysis', {
        url: '/analysis',
        templateUrl: 'js/views/admin/admin-analysis.html',
        resolve: adminResolve
      })


    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/landing');
  })
