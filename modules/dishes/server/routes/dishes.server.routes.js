'use strict';

/**
 * Module dependencies
 */
var dishesPolicy = require('../policies/dishes.server.policy'),
  dishes = require('../controllers/dishes.server.controller');

module.exports = function(app) {
  // Dishes Routes
  app.route('/api/dishes/').get(dishes.list).post(dishes.create);

  app.route('/api/dishes/:dishId')
    .get(dishes.read)
    .put(dishes.update)
    .delete(dishes.delete);
  app.route('/api/dish/Likedishes/:dishId').get(dishes.LikeDish);
  app.route('/api/dish/picture').post(dishes.SavePicture);
  // Finish by binding the Dish middleware
  app.route('/api/dishes/setImageId/:dishId').post(dishes.setImageId);
  app.param('dishId', dishes.dishByID);
  app.route('/api/DishesThroughCuisineId').post(dishes.DishesThroughCuisineId);
};
