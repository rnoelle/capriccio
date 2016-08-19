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
      },
      controller: function ($scope, $location, dataService) {
        this.getProfile = function () {
          dataService.getProfile().then(function (response) {
            console.log('got this:', response);
            if (response.picture_url) {
              $scope.picture_url = response.picture_url;
            }
          })
        }
        this.getProfile();
        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
          }
      }
    }
  })
