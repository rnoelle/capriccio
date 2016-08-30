angular.module('capriccio')
  .directive('reviewStars', function () {
    return {
      restrict: 'E',
      templateUrl: 'js/views/directives/reviewStars.html',
      scope: {
        disabled: '=',
        value: '='
      },
      link: function (scope, element, attrs) {
        if (scope.disabled === true) {
          $('#review-card').find('input').attr("disabled", true);
        }
      },
      controller: function ($scope) {
      }
    }
  })
