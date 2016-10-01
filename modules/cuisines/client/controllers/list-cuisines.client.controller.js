(function () {
  'use strict';

  angular
    .module('cuisines')
    .controller('CuisinesListController', CuisinesListController);

  CuisinesListController.$inject = ['$rootScope','CuisinesService','$state'];

  function CuisinesListController($rootScope,CuisinesService,$state) {
  $rootScope.topbarActive = true;
    var vm = this;
    
    vm.remove = remove;
 function remove(data) {
      if (confirm('Are you sure you want to delete?')) {
        data.$remove();
        $state.go('ingredients.list');
      }
    }

    vm.cuisines = CuisinesService.query();
    console.log(vm.cuisines);
  }
})();
