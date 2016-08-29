angular.module('capriccio')
  .directive('addReview', function ($stateParams) {
    return {
      restrict: 'E',
      templateUrl: 'js/views/directives/addReview.html',
      link: function (scope, element, attrs) {
        $('#add-review-button').click(function () {
          $('star-rating').removeClass('hidden');
          $('textarea').removeClass('hidden');
        })

      },
      controller: function ($scope) {
        $scope.review = {};
        function addReview() {
          dataService.addReview($stateParams.id, $scope.review);
        }
      }
    }
  })
