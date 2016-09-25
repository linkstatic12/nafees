(function () {
  'use strict';

  angular
    .module('core')
    .controller('DashBoardController', DashBoardController);
 DashBoardController.$inject = ['$rootScope','$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator'];

  function DashBoardController($rootScope,$scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
  	

      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }
      
   $rootScope.topbarActive = true;
var vm =  this;
   
 vm.authentication = Authentication;
  

  }
}());
