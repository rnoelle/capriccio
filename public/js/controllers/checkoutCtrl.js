angular.module('capriccio')
  .controller('checkoutCtrl', function ($scope, dataService, $rootScope) {
    var updateTotal = function (order) {
      let total = 0;
      for (var i = 0; i < order.length; i++) {
        let price = order[i].price_mixed.slice(1);
        total += Number(price);
      }
      $scope.orderTotal = total;
      $scope.stripeTotal = total *100;
    }

    var getCart = function () {
      dataService.getCart().then(function (response) {
        $scope.order = response;
        updateTotal(response);
      })
    }
    getCart();

    $scope.removeItem = function (id) {
      console.log(id);
      dataService.removeFromCart(id).then(function (response) {
        $rootScope.cart = response;
        $scope.order = response;
        updateTotal(response);
      })
    }
    $scope.
    // $scope.checkout = function() {
    //   console.log('HIT IT');
    //   var handler = StripeCheckout.configure({
    //     key: 'pk_test_q7PtsCCbjWU88u3W834D5hSQ',
    //     image: 'assetts/img/thumb-100.png',
    //     locale: 'auto',
    //     token: function () {
    //
    //     }
    //   });
    //   var stripeTotal = $scope.orderTotal * 100;
    //   handler.open({
    //     name: 'Capriccio',
    //     description: 'Music purchase',
    //     amount: stripeTotal
    //   });
    // }

  })
