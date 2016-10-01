(function () {
  'use strict';

  angular
    .module('cuisines')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Main Menu',
      state: 'cuisines',
      type: 'dropdown',
      roles: ['manager']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'cuisines', {
      title: 'Manage Main Menu',
      state: 'cuisines.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'cuisines', {
      title: 'Create Main Menu',
      state: 'cuisines.create',
      roles: ['manager']
    });
  }
})();
