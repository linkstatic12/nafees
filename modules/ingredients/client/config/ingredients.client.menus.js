(function () {
  'use strict';

  angular
    .module('ingredients')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Ingredients',
      state: 'ingredients',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'ingredients', {
      title: 'List Ingredients',
      state: 'ingredients.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'ingredients', {
      title: 'Create Ingredient',
      state: 'ingredients.create',
      roles: ['admin']
    });
  }
})();
