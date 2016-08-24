angular.module('capriccio')
  .controller('submissionCtrl', function ($scope, $stateParams, dataService) {
    var getSubmission = function (id) {
      dataService.getSubmission(id).then(function (response) {
        $scope.submission = response;
        console.log(response);
        if (response.cover_url == 'undefined') {
          $scope.cover_url = '/assetts/thumb-100.png';
          $scope.template = response.template;
        } else {
          $scope.cover_url = response.cover_url.slice(10);
          $('#cover').removeClass('hidden');
        }
        $scope.score_url = response.score_url.slice(10);
        $scope.parts_url = response.score_url.slice(10);
      })
    }
    getSubmission($stateParams.id);

  })
