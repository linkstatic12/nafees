(function () {
  'use strict';

  angular
    .module('cuisines')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Cuisines',
      state: 'cuisines',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'cuisines', {
      title: 'List Cuisines',
      state: 'cuisines.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'cuisines', {
      title: 'Create Cuisine',
      state: 'cuisines.create',
      roles: ['admin']
    });
  }
})();
