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
          $('#rating5').attr("disabled", true);
          $('#rating4').attr("disabled", true);
          $('#rating3').attr("disabled", true);
          $('#rating2').attr("disabled", true);
          $('#rating1').attr("disabled", true);
        }
      },
      controller: function ($scope) {
      }
    }
  })
