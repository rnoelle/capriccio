angular.module('capriccio')
    .directive('addReview', function($stateParams, $state, dataService) {
        return {
            restrict: 'E',
            templateUrl: 'js/views/directives/addReview.html',
            link: function(scope, element, attrs) {
                $('#add-review-button').click(function() {
                    $('.add-review-form').removeClass('hidden');
                })

            },
            controller: function($scope, $stateParams, $state, dataService) {
                $scope.review = {};
                $scope.review.rating;

                $scope.addReview = function() {
                    dataService.getAuth().catch((err) => {
                        console.log("Unauthorized: ", err);
                        if (err.status === 401) {
                            $state.go('login.login')
                        } else {
                            dataService.addReview($stateParams.id, $scope.review).then(function(response) {
                                $('.review-box').prepend(`<div class="review-card">
                                  <review-stars disabled="true" value="${$scope.review.rating}"></review-stars>
                                  <h4>You said:</h4>
                                  <p>
                                    ${response.review}
                                  </p>
                                </div>`);
                            });
                        }
                    })
                }

            }
        }

    })
