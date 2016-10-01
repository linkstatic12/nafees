(function () {
  'use strict';

  angular
    .module('orders')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Sales',
      state: 'orders',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'orders', {
      title: 'List Sales',
      state: 'orders.list'
    });
     menuService.addSubMenuItem('topbar', 'orders', {
      title: 'Billing',
      state: 'orders.billing',
      roles: ['manager','admin']
    });

    // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'orders', {
    //   title: 'Create Order',
    //   state: 'orders.create',
    //   roles: ['user']
    // });
  }
})();
