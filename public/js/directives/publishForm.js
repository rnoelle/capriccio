angular.module('capriccio')
  .directive('publishForm', function () {
    return {
      templateUrl: "js/views/publishForm.html",
      controller: "publishCtrl",
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.showTemplates = function () {
          $('#cover-upload').addClass('hidden');
          $('#template-box').removeClass('hidden');
        }
        scope.hideTemplates = function () {
          element.find('#template-box').addClass('hidden');
          element.find('#cover-upload').removeClass('hidden');
        }
      }
    }
  })
