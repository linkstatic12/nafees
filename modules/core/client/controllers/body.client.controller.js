(function () {
  'use strict';

  angular
    .module('core')
    .controller('BodyController', BodyController);

  BodyController.$inject = ['$scope', '$state', 'Authentication', 'menuService','Socket','toastr','$rootScope'];

  function BodyController($scope, $state, Authentication, menuService,Socket,toastr,$rootScope) {
    var vm = this;
$rootScope.topbarActive = false;
    

     
     
      

      // Remove the event listener when the controller instance is destroyed
     
   

   
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

   

  }
}());
