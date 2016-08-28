'use strict';

/**
 * Module dependencies
 */
var ingredientsPolicy = require('../policies/ingredients.server.policy'),
  ingredients = require('../controllers/ingredients.server.controller');

module.exports = function(app) {
  // Ingredients Routes
  app.route('/api/ingredients').all(ingredientsPolicy.isAllowed)
    .get(ingredients.list)
    .post(ingredients.create);

  app.route('/api/ingredients/:ingredientId').all(ingredientsPolicy.isAllowed)
    .get(ingredients.read)
    .put(ingredients.update)
    .delete(ingredients.delete);
  app.route('/api/ingredients/setImageId/:ingredientId').post(ingredients.setImageId);
  app.route('/api/ingredients/picture').post(ingredients.changeIngredientsPicture);
  // Finish by binding the Ingredient middleware
  app.param('ingredientId', ingredients.ingredientByID);
};
