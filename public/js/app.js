angular.module('capriccio', ['ui.router']);

angular.module('capriccio')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    var adminResolve = {
        security: (dataService, $state) => {
          return dataService.getAuth()
              .catch((err) => {
                  console.log("Unauthorized: ", err);
                  if (err.status === 401) {
                      $state.go('login.login');
                  }
              });
            }
          };


    $stateProvider
      .state('home', {
        url: '/landing',
        templateUrl: 'js/views/landing.html',
        controller: 'landingCtrl',
        link: function (scope, element, attrs) {

        }
      })
      .state('login', {
        url:'/login',
        controller: 'loginCtrl',
        template: '<ui-view></ui-view>'
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
        resolve: adminResolve,
        link: function (scope, element, attrs) {
          scope.pdfOnly = function() {
            $('#price-pdf').removeClass('hidden-left');
            $('#price-print').addClass('hidden-left');
            $('#price-mixed').addClass('hidden-left');
          }
          scope.printOnly = function() {
            $('#price-print').removeClass('hidden-left');
            $('#price-pdf').addClass('hidden-left');
            $('#price-mixed').addClass('hidden-left');
          }
          scope.mixedPackage = function() {
            $('#price-mixed').removeClass('hidden-left');
            $('#price-pdf').removeClass('hidden-left');
            $('#price-print').removeClass('hidden-left');
          }
          $('#score-file-upload').change(function () {
            $('#adminScoreFile').val($('#admin-score-file-upload')[0].files[0].name);
          })
          $('#parts-file-upload').change(function () {
            $('#adminPartsFile').val($('#admin-parts-file-upload')[0].files[0].name);
          })
          $('#cover-file-upload').change(function () {
            $('#adminCoverFile').val($('#admin-cover-file-upload')[0].files[0].name);
          })
          $('#preview-file-upload').change(function () {
            $('#adminPreviewFile').val($('#admin-preview-file-upload')[0].files[0].name);
          })
        }
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
        controller: 'adminReviewCtrl',
        resolve: adminResolve
      })
      .state('admin.submission', {
        url: '/submission/:id',
        templateUrl: 'js/views/admin/admin-submission.html',
        controller: 'submissionCtrl',
        link: function (scope, element, attr) {
          scope.$watch('cover_url', function (value) {
            console.log(value);
            if (value) {
              $('#cover').removeClass('hidden');
            }
          })
        },
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
