angular.module('capriccio')
  .directive('publishForm', function () {
    return {
      templateUrl: "js/views/directives/publishForm.html",
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
        scope.pdfOnly = function () {
          $('#price-pdf').removeClass('hidden');
          $('#price-print').addClass('hidden');
          $('#price-mixed').addClass('hidden');
        }
        scope.printOnly = function () {
          $('#price-print').removeClass('hidden');
          $('#price-pdf').addClass('hidden');
          $('#price-mixed').addClass('hidden');
        }
        scope.mixedPackage = function () {
          $('#price-mixed').removeClass('hidden');
          $('#price-pdf').removeClass('hidden');
          $('#price-print').removeClass('hidden');
        }
      }
    }
  })
