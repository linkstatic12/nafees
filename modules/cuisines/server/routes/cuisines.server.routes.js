'use strict';

/**
 * Module dependencies
 */
var cuisinesPolicy = require('../policies/cuisines.server.policy'),
  cuisines = require('../controllers/cuisines.server.controller');

module.exports = function(app) {
  // Cuisines Routes
  app.route('/api/cuisines').all(cuisinesPolicy.isAllowed)
    .get(cuisines.list)
    .post(cuisines.create);

  app.route('/api/cuisines/:cuisineId').all(cuisinesPolicy.isAllowed)
    .get(cuisines.read)
    .put(cuisines.update)
    .delete(cuisines.delete);
app.route('/api/cuisines/setImageId/:cuisineId').post(cuisines.setImageId);
app.route('/api/cuisine/picture').post(cuisines.changeCuisinePicture);
  // Finish by binding the Cuisine middleware
  app.param('cuisineId', cuisines.cuisineByID);
};
