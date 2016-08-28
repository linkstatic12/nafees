(function () {
  'use strict';

  angular
    .module('orders')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['$scope','Authentication','OrdersService','Socket','amMoment'];

  function OrdersListController($scope,Authentication,OrdersService,Socket,amMoment) {
  
    var order = {};
    var vm = this;
    
    vm.advancedOrders =[];
        init();
        $scope.TimesUp = function(order)
        {
 var orderTime = order.created;
    var now = new Date();
    var totalTimeRema= moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(orderTime,"DD/MM/YYYY HH:mm:ss"))).format("mm");
   if(totalTimeRema>20)
    return true;
  else
    return false;


        }
  $scope.CheckTime =function (order)
  {
    var orderTime = order.created;
    var now = new Date();
    var totalTimeRema= moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(orderTime,"DD/MM/YYYY HH:mm:ss"))).format("mm");
    if(totalTimeRema>12 && totalTimeRema <=18)
      return true;
  else
      return false;
  }
  function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }
     
      Socket.on('take_the_test_notification', function (message) {
      
          vm.orders.unshift(message.data);
      
      });
      

      
    }


    vm.orders = OrdersService.query();
       
  }
})();
