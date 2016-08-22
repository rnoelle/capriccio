angular.module('capriccio')
  .directive('landingNav', function(dataService) {
    return {
      restrict: 'EA',
      templateUrl: 'js/views/directives/landingNav.html',
      link: function (scope, element, attrs) {
        scope.$watch('picture_url', function (value) {
          if (value == undefined) {
            $('#nav-profile-pic').addClass('hidden');
          } else {
            $('#nav-profile-pic').removeClass('hidden');
          }
        })
        scope.$watch('userCart', function (value) {
          if (!value) {
            scope.userCart = [{title: 'Cart empty'}];
          } else if (value[0].id) {
            $('#checkout-link').removeClass('hidden');
          }
        })
      },
      controller: function ($scope, $rootScope, $location, dataService) {
        this.getCart = function () {
          dataService.getCart().then(function (response) {
            if (!response.data) {
                $scope.cartLength = undefined;
                $scope.userCart = [{title: 'Nothing in cart'}]
            } else {
              $scope.cartLength = response.data.length;
            }
            $scope.userCart = response.data;

          })

        }
        this.getCart();

        $rootScope.$watch('picture_url', function (value) {
          $scope.picture_url = value;
        })
        $rootScope.$watch('cart', function (value) {
          if (value) {
            $scope.cartLength = value.length;
            $scope.userCart = value;
          }
        })
        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
          }
      }
    }
  })
