angular.module('capriccio')
  .directive('adminUpload', function () {
    return {
        templateUrl: "js/views/directives/admin-upload.html",
        controller: "adminInventory",
        restrict: 'EA',
        link: function(scope, element, attrs) {
            $('#score-file-upload').change(function () {
              $('#scoreFile').val($('#score-file-upload')[0].files[0].name);
            })

            $('#parts-file-upload').change(function () {
              $('#partsFile').val($('#parts-file-upload')[0].files[0].name);
            })

            $('#cover-file-upload').change(function () {
              $('#coverFile').val($('#cover-file-upload')[0].files[0].name);
            })

            scope.pdfOnly = function() {
              $('#price-pdf').removeClass('hidden-left');
              $('#price-print').addClass('hidden-left');
              $('#price-mixed').addClass('hidden-left');
            }
            scope.printOnly = function() {
              $('#price-print').removeClass('hidden-left');
              $('#price-pdf').addClass('hidden-left');
              $('#price-mixed').addClass('hidden-left');
            }
            scope.mixedPackage = function() {
              $('#price-mixed').removeClass('hidden-left');
              $('#price-pdf').removeClass('hidden-left');
              $('#price-print').removeClass('hidden-left');
            }
        }
    }
  })
