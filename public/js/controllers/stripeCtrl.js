angular.module('capriccio')
  .controller('stripeCtrl', function ($scope, $stateParams, dataService) {

    var handler = StripeCheckout.configure({
      key: 'pk_test_q7PtsCCbjWU88u3W834D5hSQ',
      image: 'assetts/img/thumb-100.png',
      locale: 'auto',
      token: function(token) {

      }
    });
    var stripeTotal = $stateParams.total;
    handler.open({
      name: 'Capriccio',
      description: 'Music purchase',
      amount: stripeTotal
    });
  })
