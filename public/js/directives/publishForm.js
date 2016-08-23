angular.module('capriccio')
    .directive('publishForm', function() {
        return {
            templateUrl: "js/views/directives/publishForm.html",
            controller: "publishCtrl",
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

                scope.showTemplates = function() {
                  $('.cover-upload').addClass('hidden');
                  $('#template-box').removeClass('hidden');
                  $("#cover-file-upload").replaceWith($("#cover-file-upload").clone());
                  $("#coverFile").val('');
                  $('#cover-file-upload').change(function () {
                    $('#coverFile').val($('#cover-file-upload')[0].files[0].name);
                  })
                }
                scope.hideTemplates = function() {
                  $('#template-box').addClass('hidden');
                  $('.cover-upload').removeClass('hidden');
                  $('.template-radio').prop('checked', function () {
                    return this.getAttribute('checked') == false;
                  })
                }
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
