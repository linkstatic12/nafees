(function () {
  'use strict';

  angular
    .module('cuisines')
    .controller('CuisinesListController', CuisinesListController);

  CuisinesListController.$inject = ['CuisinesService'];

  function CuisinesListController(CuisinesService) {
  
    var vm = this;
    vm.first  = "HELLO";

    vm.cuisines = CuisinesService.query();
    console.log(vm.cuisines);
  }
})();
