'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ingredient = mongoose.model('Ingredient'),
  Dish = mongoose.model('Dish'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ingredient
 */
exports.create = function(req, res) {
  console.log("HERE");
  var ingredient = new Ingredient(req.body);
  ingredient.user = req.user;
  ingredient.updatedBy= req.user;
  ingredient.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ingredient);
    }
  });
};

/**
 * Show the current Ingredient
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var ingredient = req.ingredient ? req.ingredient.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  ingredient.isCurrentUserOwner = req.user && ingredient.user && ingredient.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(ingredient);
};

/**
 * Update a Ingredient
 */
exports.update = function(req, res) {
  var ingredient = req.ingredient ;
// ingredients:[{
//     name:{type:Schema.ObjectId,
//           ref:'Ingredient'
//          },
//     quantity:{
//           type:Number
//          }
//    }]

Dish.find({ 'ingredients.name': { "$in" : [ingredient]} }).populate('ingredients.name').exec(function(err,dishes){

for(var i=0;i<dishes.length;i++)
{
  var totalprice = 0;
  var price = 0;
    for(var j=0;j<dishes[i].ingredients.length;j++)
                { 
                    var vm = dishes[i].ingredients[j];
                    price =price + (vm.name.price*vm.quantity);
                }
 


  totalprice = price+dishes[i].additional_price;
  dishes[i].price = price;
  dishes[i].totalPrice = totalprice;
  dishes[i].save(function(err)



    {});
                
}



});
  ingredient = _.extend(ingredient , req.body);
  ingredient.user = req.user;
  ingredient.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ingredient);
    }
  });
};

/**
 * Delete an Ingredient
 */
exports.delete = function(req, res) {
  var ingredient = req.ingredient ;

  ingredient.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ingredient);
    }
  });
};

/**
 * List of Ingredients
 */
exports.list = function(req, res) { 
  Ingredient.find().sort('-created').populate('user', 'displayName').exec(function(err, ingredients) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ingredients);
    }
  });
};

/**
 * Ingredient middleware
 */
exports.ingredientByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ingredient is invalid'
    });
  }

  Ingredient.findById(id).populate('user', 'displayName').exec(function (err, ingredient) {
    if (err) {
      return next(err);
    } else if (!ingredient) {
      return res.status(404).send({
        message: 'No Ingredient with that identifier has been found'
      });
    }
    req.ingredient = ingredient;
    next();
  });
};


exports.setImageId = function(req,res)
{

var cuisine = req.cuisine;
cuisine.img=req.body.photoId;
  cuisine.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            res.json("SUCCESS");
          }
        });

}
/**
 * Cuisine picture
 */
exports.changeIngredientsPicture = function (req, res) {
  console.log("SHLD WORK");
  var user = req.user;
  var upload = multer(config.uploads.ingredientUpload).single('newIngredientPicture');

  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
 
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  if (user) {
    upload(req, res, function (uploadError) {
     
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        res.json(config.uploads.ingredientUpload.dest + req.file.filename);
        
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};