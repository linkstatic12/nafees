(function () {
  'use strict';

  angular
    .module('chat')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
<<<<<<< HEAD
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Chat',
      state: 'chat'
    });
=======
    // // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Chat',
    //   state: 'chat'
    // });
>>>>>>> 2f9ebbd1cb28113ea06355b83d945d9bf1bdbc92
  }
}());
