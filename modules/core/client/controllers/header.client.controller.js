(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService','Socket','toastr','$rootScope'];

  function HeaderController($scope, $state, Authentication, menuService,Socket,toastr,$rootScope) {
    var vm = this;

      init();
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
      
          toastr.success('Order has been placed by Table no.'+message.data.table, 'Order has been placed with '+message.data.Dishes.length+' different dishes!');
      
      });
      

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('take_the_test_notification');
      });
    }

   
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
