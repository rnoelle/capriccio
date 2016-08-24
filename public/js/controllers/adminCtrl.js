angular.module('capriccio')
  .controller('adminCtrl', function ($scope, dataService) {
    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
      }
  })
