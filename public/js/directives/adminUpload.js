angular.module('capriccio')
  .directive('adminUpload', function () {
    return {
        templateUrl: "js/views/directives/admin-upload.html",
        controller: "adminInventory",
        restrict: 'EA',
        link: function(scope, element, attrs) {
          $('#admin-score-file-upload').change(function () {
            $('#adminScoreFile').val($('#admin-score-file-upload')[0].files[0].name);
          })
          $('#admin-parts-file-upload').change(function () {
            $('#adminPartsFile').val($('#admin-parts-file-upload')[0].files[0].name);
          })
          $('#admin-cover-file-upload').change(function () {
            $('#adminCoverFile').val($('#admin-cover-file-upload')[0].files[0].name);
          })
          $('#admin-preview-file-upload').change(function () {
            $('#adminPreviewFile').val($('#admin-preview-file-upload')[0].files[0].name);
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
