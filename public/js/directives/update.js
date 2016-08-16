angular.module('capriccio')
  .directive('updateForm', function ($sce) {
    return {
      restrict: "EA",
      templateUrl: 'js/views/directives/update.html',
      scope: {
        work: '=',
        productUrl: '='
      },
      link: function (scope, element, attrs) {
        scope.showTemplates = function () {
          $('#cover-upload').val("");
          $('#cover-upload').addClass('hidden');
          $('#template-box').removeClass('hidden');
        }
        scope.hideTemplates = function () {
          $('input[name=template]').prop('checked',false);
          $('#cover-upload').removeClass('hidden');
          $('#template-box').addClass('hidden');
        }
      }
    }
  })
