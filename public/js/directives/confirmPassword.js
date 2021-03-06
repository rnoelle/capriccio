angular.module('capriccio')
  .directive('compareTo', function () {
    return {
      require: "ngModel",
      scope: {
        otherValue: "=compareTo"
      },
      link: function (scope, element, attrs, ngModel) {
        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue == scope.otherValue;
        };
        scope.$watch("otherValue", function () {
          ngModel.$validate();
        })
      }
    }
  });
