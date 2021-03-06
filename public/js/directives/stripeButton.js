angular.module('capriccio')
  .directive('stripeButton', function ($http, $state, $rootScope) {
    return {
      restrict: 'E',
      template: '<button id="stripePayButton">Pay Now</button>',
      scope: {
        totalPrice: '='
      },
      link: function (scope, element, attrs) {
        var totalOrderPrice = scope.totalPrice;
        var handler = StripeCheckout.configure({
          key: 'pk_test_q7PtsCCbjWU88u3W834D5hSQ',
          image: 'assetts/img/thumb-100.png',
          locale: 'auto',
          token: function(token) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
            $http.post('/api/charge', {
              stripeToken: token.id,
              price: totalOrderPrice,
              email: token.email,
              stripeTokenCard: token.card
            }).then(function (response) {
              $rootScope.userCart = [];
              $state.go('mainProducts');
            })
          }
        })
        $('#stripePayButton').on('click', function(e) {
          // Open Checkout with further options:
          var stripeTotal = scope.totalPrice * 100;

          handler.open({
            name: 'Capriccio',
            description: 'Music purchase',
            amount: stripeTotal
          });
          e.preventDefault();
        });

      // Close Checkout on page navigation:
      // $(window).on('popstate', function() {
      //   handler.close();
      //   $state.go('mainProducts');
      // });
      }
    }
  });
