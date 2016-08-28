(function () {
  'use strict';

  angular
    .module('ingredients')
    .controller('IngredientsListController', IngredientsListController);

  IngredientsListController.$inject = ['IngredientsService'];

  function IngredientsListController(IngredientsService) {
    var vm = this;
    vm.remove = remove;
 function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.ingredient.$remove($state.go('ingredients.list'));
      }
    }

    vm.ingredients = IngredientsService.query();
    console.log(vm.ingredients);
  }
})();
