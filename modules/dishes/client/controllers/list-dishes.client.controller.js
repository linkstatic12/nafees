(function () {
  'use strict';

  angular
    .module('dishes')
    .controller('DishesListController', DishesListController);

  DishesListController.$inject = ['$rootScope','DishesService'];

  function DishesListController($rootScope,DishesService) {
    var vm = this;
 $rootScope.topbarActive = true;
    vm.dishes = DishesService.query();
  }
})();
