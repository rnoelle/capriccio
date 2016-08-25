angular.module('capriccio')
  .controller('adminReviewCtrl', function ($scope, dataService) {
    var getSubmissions = function () {
      dataService.getSubmissions().then(function (response) {
        $scope.submissions = response;
        $scope.numSubmissions = response.length;
      })
    }
    getSubmissions();

  })
