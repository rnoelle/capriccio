angular.module('capriccio')
  .controller('adminReviewCtrl', function ($scope, dataService) {
    var getSubmissions = function () {
      dataService.getSubmissions().then(function (response) {
        console.log(response);
        $scope.submissions = response;
      })
    }
    getSubmissions();
  })
