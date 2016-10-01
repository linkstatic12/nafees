(function () {



  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
 HomeController.$inject = ['$rootScope','$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator'];

  function HomeController($rootScope,$scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
  	
    var vm = this;
   

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;

    // Get an eventual error defined in the URL query string:
    vm.error = $location.search().err;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    function signup(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      $http.post('/api/auth/signup', vm.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        vm.authentication.user = response;

        // And redirect to the previous or home page
        $state.go('cuisines.list');
      }).error(function (response) {
        vm.error = response.message;
      });
    }

    function signin(isValid) {
      vm.error = null;
  

      $http.post('/api/auth/signin', vm.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        vm.authentication.user = response;
        if(vm.authentication.user.active==false)
        { vm.error = "Administrator hasn't made your account active. Contact Administrator.";}
      else
      { $rootScope.topbarActive = true;
      
        // And redirect to the previous or home page
        $state.go( 'cuisines.list');}
       
      }).error(function (response) {
        vm.error = response.message;
        console.log(vm.error);
      });
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }

  }

}());
