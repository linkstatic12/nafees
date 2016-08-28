(function () {
  'use strict';

  angular
    .module('cuisines')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cuisines', {
        abstract: true,
        url: '/cuisines',
        template: '<ui-view/>'
      })
      .state('cuisines.list', {
        url: '',
        templateUrl: 'modules/cuisines/client/views/list-cuisines.client.view.html',
        controller: 'CuisinesListController',
        controllerAs: 'vm',
        data: {
          roles:['admin'],
          pageTitle: 'Cuisines List'
        }
      })
      .state('cuisines.create', {
        url: '/create',
        templateUrl: 'modules/cuisines/client/views/form-cuisine.client.view.html',
        controller: 'CuisinesController',
        controllerAs: 'vm',
        resolve: {
          cuisineResolve: newCuisine
        },
        data: {
          roles: ['admin'],
          pageTitle : 'Cuisines Create'
        }
      })
      .state('cuisines.edit', {
        url: '/:cuisineId/edit',
        templateUrl: 'modules/cuisines/client/views/form-cuisine.client.view.html',
        controller: 'CuisinesController',
        controllerAs: 'vm',
        resolve: {
          cuisineResolve: getCuisine
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Cuisine {{ cuisineResolve.name }}'
        }
      })
      .state('cuisines.view', {
        url: '/:cuisineId',
        templateUrl: 'modules/cuisines/client/views/view-cuisine.client.view.html',
        controller: 'CuisinesController',
        controllerAs: 'vm',
        resolve: {
           roles: ['admin'],
          cuisineResolve: getCuisine
        },
        data:{
          pageTitle: 'Cuisine {{ articleResolve.name }}'
        }
      });
  }

  getCuisine.$inject = ['$stateParams', 'CuisinesService'];

  function getCuisine($stateParams, CuisinesService) {
    return CuisinesService.get({
      cuisineId: $stateParams.cuisineId
    }).$promise;
  }

  newCuisine.$inject = ['CuisinesService'];

  function newCuisine(CuisinesService) {
    return new CuisinesService();
  }
})();
