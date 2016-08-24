angular.module('capriccio')
  .directive('landingNav', function(dataService) {
    return {
      restrict: 'EA',
      templateUrl: 'js/views/directives/landingNav.html',
      link: function (scope, element, attrs) {
        scope.$watch('picture_url', function (value) {
          if (value === undefined) {
            $('#nav-profile-pic').addClass('hidden');
          } else {
            $('#nav-profile-pic').removeClass('hidden');
          }
        })

        scope.$watch('userCart', function (value) {
          if (!value) {
            scope.userCart = [{title: 'Cart empty'}];
          } else if (value[0]) {
            if (value[0].id) {
              $('#checkout-link').removeClass('hidden');
            }
          }
        })

        // Slide animation to dropdown
        $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
          });

      $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
      })
      },
      controller: function ($scope, $rootScope, $location, dataService) {
        if ($rootScope.userCart) {
          $scope.userCart = $rootScope.userCart;
          $scope.cartLength = $rootScope.userCart.length;
        }

        $rootScope.$watch('picture_url', function (value) {
          $scope.picture_url = value;
        })

        $rootScope.$watch('userCart', function (value) {
          if (value) {
            $scope.cartLength = value.length;
            $scope.userCart = value;
          }
        })

        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
          }
        $scope.logout = function () {
          dataService.logout().then(function (response) {
            console.log(response);
            $rootScope.picture_url = undefined;
            $rootScope.userCart = undefined;
            $rootScope.cartLength = undefined;
          })
        }

      }
    }
  })
