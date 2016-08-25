angular.module('capriccio')
  .controller('submissionCtrl', function ($scope, $stateParams, $state, dataService) {
    var getSubmission = function (id) {
      dataService.getSubmission(id).then(function (response) {
        $scope.submission = response;
        console.log(response);
        if (response.cover_url == 'undefined') {
          $scope.cover_url = '/assetts/thumb-100.png';
          $scope.template = response.template;
        } else {
          $scope.cover_url = response.cover_url.slice(10);
          console.log($scope.cover_url);
          $('#cover').removeClass('hidden');
        }
        $scope.score_url = response.score_url.slice(10);
        $scope.parts_url = response.parts_url.slice(10);
      })
    }
    getSubmission($stateParams.id);

    $scope.acceptSubmission = function () {
      dataService.acceptOrDenySubmission($stateParams.id, true).then(function (response) {
        $state.go('admin.review');
      })
    }
    $scope.denySubmission = function () {
      dataService.acceptOrDenySubmission($stateParams.id, false).then(function (response) {
        $state.go('admin.review');
      })
    }

  })
