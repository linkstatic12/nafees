(function () {
  'use strict';

  // Orders controller
  angular
    .module('orders')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$scope', '$state', 'Authentication', 'orderResolve','$http'];

  function OrdersController ($scope, $state, Authentication, order,$http) {
    var vm = this;

    vm.authentication = Authentication;
    vm.order = order;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.OrderComplete = OrderComplete;
    vm.save = save;
   
    $http.get('/api/Detailorders/'+$state.params.orderId).success(function(data){
         vm.order.totalPrice = data.order.totalPrice;
         vm.order.table = data.order.table;
     
      for(var i in data.order.Dishes){
         vm.order.Dishes[i].dish = data.dishes[i];
         vm.order.Dishes[i].noOfPlates = vm.order.Dishes[i].noOfPlates;
}

console.log(vm.order);
    });
    // Remove existing Order
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.order.$remove($state.go('orders.list'));
      }
    }
    function OrderComplete()
    {
       if (confirm('Are you sure the Order is complete?')) {
         $http.get('/api/orders/CompleteOrder/'+$state.params.orderId).success(function(data){

       $state.go('orders.list');

      });
      }
     

    }
    // Save Order
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.orderForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.order._id) {
        vm.order.$update(successCallback, errorCallback);
      } else {
        vm.order.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('orders.view', {
          orderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
