//Cuisines service used to communicate Cuisines REST endpoints
(function () {
  'use strict';

  angular
    .module('cuisines')
    .factory('CuisinesService', CuisinesService);

  CuisinesService.$inject = ['$resource'];

  function CuisinesService($resource) {
    return $resource('api/cuisines/:cuisineId', {
      cuisineId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
